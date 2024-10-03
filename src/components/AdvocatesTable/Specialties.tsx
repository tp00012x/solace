import { Button } from "@/components/ui/button";

interface ISpecialties {
  popularSpecialties: string[];
  isSelected: (specialty: string) => boolean;
  toggleOption: (specialty: string) => void;
}

export default function Specialties({
  popularSpecialties,
  isSelected,
  toggleOption,
}: ISpecialties) {
  return (
    <div className="flex flex-wrap gap-2">
      {popularSpecialties.map((specialty) => (
        <Button
          key={specialty}
          className={`rounded-full ${
            isSelected(specialty)
              ? "bg-gold text-primary-foreground hover:bg-gold"
              : "bg-bright-blue text-dark-green hover:bg-hover-green hover:text-white"
          }`}
          onClick={() => toggleOption(specialty)}
          aria-pressed={isSelected(specialty)}
        >
          {specialty}
        </Button>
      ))}
    </div>
  );
}
