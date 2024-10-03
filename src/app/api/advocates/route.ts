import db from "../../../db";
import { advocates } from "@/db/schema";
import { NextResponse } from "next/server";
import { type InferSelectModel, sql } from "drizzle-orm";
import { and, gte, ilike, or } from "drizzle-orm/expressions";
import { z } from "zod";

export type Advocate = InferSelectModel<typeof advocates>;

const paramsSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => parseInt(val, 10)),
  pageSize: z
    .string()
    .optional()
    .default("10")
    .transform((val) => parseInt(val, 10)),
  city: z.string().optional().default(""),
  degree: z.string().optional().default(""),
  minExperience: z
    .string()
    .optional()
    .default("0")
    .transform((val) => parseInt(val, 10)),
  specialties: z.string().optional().default(""),
  search: z.string().optional().default(""),
});

function getAllSpecialties(advocates: Advocate[]): string[] {
  const specialtyCounts = advocates
    .map((advocate) => advocate.specialties)
    .flat()
    .filter(
      (specialty): specialty is string =>
        specialty !== undefined && specialty !== null,
    )
    .reduce((counts, specialty: string) => {
      counts.set(specialty, (counts.get(specialty) || 0) + 1);
      return counts;
    }, new Map<string, number>());

  return Array.from(specialtyCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([specialty]) => specialty);
}

function addCityCondition(city: string) {
  return city ? ilike(advocates.city, `%${city}%`) : undefined;
}

function addDegreeCondition(degree: string) {
  return degree ? ilike(advocates.degree, `%${degree}%`) : undefined;
}

function addMinExperienceCondition(minExperience: number) {
  return minExperience
    ? gte(advocates.yearsOfExperience, minExperience)
    : undefined;
}

function addSpecialtiesCondition(specialties: string) {
  if (!specialties) return undefined;

  const specialtiesArray = specialties.split(",");
  return or(
    ...specialtiesArray.map(
      (specialty) =>
        sql`${advocates.specialties}::text ILIKE ${"%" + specialty + "%"}`,
    ),
  );
}

function addSearchCondition(search: string) {
  if (!search) return undefined;

  const searchFields = [
    advocates.firstName,
    advocates.lastName,
    advocates.city,
    advocates.degree,
  ];

  const searchConditions = searchFields.map((field) =>
    ilike(field, `%${search}%`),
  );

  return or(...searchConditions);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const parsedParams = paramsSchema.parse(
    Object.fromEntries(searchParams.entries()),
  );

  const conditions = [
    addCityCondition(parsedParams.city),
    addDegreeCondition(parsedParams.degree),
    addMinExperienceCondition(parsedParams.minExperience),
    addSpecialtiesCondition(parsedParams.specialties),
    addSearchCondition(parsedParams.search),
  ].filter(Boolean);

  let query = db.select().from(advocates);

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  query = query
    .limit(parsedParams.pageSize)
    .offset((parsedParams.page - 1) * parsedParams.pageSize);

  const data = (await query.execute()) as Advocate[];

  const allData = await db.select().from(advocates).execute();
  const allSpecialties = getAllSpecialties(allData);

  let countQuery = db.select({ count: sql<number>`COUNT(*)` }).from(advocates);

  if (conditions.length > 0) {
    countQuery = countQuery.where(and(...conditions));
  }

  const totalItemsResult = await countQuery.execute();
  const totalItems = totalItemsResult[0]?.count ?? 0;
  const totalPages = Math.ceil(totalItems / parsedParams.pageSize);

  return NextResponse.json({
    data,
    totalItems,
    totalPages,
    currentPage: parsedParams.page,
    allSpecialties,
  });
}
