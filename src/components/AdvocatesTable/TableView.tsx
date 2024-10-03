import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Advocate } from "@/app/api/advocates/route";

function EmptyState() {
  return (
    <div className="text-center py-10">
      <p className="text-xl text-bright-blue font-semibold">No results found</p>
      <p className="text-light-bright-blue">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
}

export default function TableView({ advocates }: { advocates: Advocate[] }) {
  if (advocates.length === 0) {
    return <EmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-bright-blue">First Name</TableHead>
          <TableHead className="text-bright-blue">Last Name</TableHead>
          <TableHead className="text-bright-blue">City</TableHead>
          <TableHead className="text-bright-blue">Degree</TableHead>
          <TableHead className="text-bright-blue">Experience</TableHead>
          <TableHead className="text-bright-blue">Specialties</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advocates.map((advocate) => (
          <TableRow
            key={advocate.id}
            className="hover:bg-white text-light-bright-blue"
          >
            <TableCell className="font-medium">{advocate.firstName}</TableCell>
            <TableCell className="font-medium">{advocate.lastName}</TableCell>
            <TableCell>{advocate.city}</TableCell>
            <TableCell>{advocate.degree}</TableCell>
            <TableCell>{advocate.yearsOfExperience} years</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {((advocate.specialties as string[]) || []).map(
                  (specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ),
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
