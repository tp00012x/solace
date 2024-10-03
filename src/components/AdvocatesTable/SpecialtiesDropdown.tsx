"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface IDropdownMenuCheckboxes {
  allSpecialties: string[];
  onCheckedChange: (specialty: string) => (checked: Checked) => void;
  selectedSpecialties: string[];
}

export default function DropdownMenuCheckboxes({
  allSpecialties,
  onCheckedChange,
  selectedSpecialties,
}: IDropdownMenuCheckboxes) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredSpecialties = allSpecialties.filter((specialty) =>
    specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-64 justify-between bg-opal border-bright-blue"
        >
          Specialties
          {open ? (
            <ChevronUp className="h-4 w-4 opacity-50" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-50" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <div className="p-2">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 opacity-50" />
            <Input
              type="text"
              placeholder="Search specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              className="h-8"
            />
          </div>
        </div>
        <ScrollArea className="h-96 overflow-y-auto">
          {filteredSpecialties.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            filteredSpecialties.map((specialty) => {
              const isSelected = selectedSpecialties.includes(specialty);
              return (
                <DropdownMenuCheckboxItem
                  key={specialty}
                  checked={isSelected}
                  onCheckedChange={onCheckedChange(specialty)}
                  onSelect={(event) => event.preventDefault()}
                >
                  {specialty}
                </DropdownMenuCheckboxItem>
              );
            })
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
