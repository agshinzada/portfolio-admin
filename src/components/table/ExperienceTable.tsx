import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExperienceData } from "@/types/experience";
import { supabase } from "@/utils/supabase";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ExperienceTable = ({ data }: { data: ExperienceData[] }) => {
  const handleRemove = async (id: number) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      const { error } = await supabase
        .from(import.meta.env.VITE_EXPERIENCE_VIEW)
        .delete()
        .eq("id", id);
      if (error) {
        toast.error("Error deleting experience");
        return;
      }
      toast.success("Experience deleted");
    }
  };
  return (
    <Table>
      <TableCaption>A list of recent jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.company}</TableCell>
            <TableCell>{item.start_year + " - " + item.end_year}</TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                <Pencil size={18} className="text-blue-600 cursor-pointer" />
                <Trash2
                  className="text-red-600 cursor-pointer"
                  size={18}
                  onClick={() => handleRemove(item.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExperienceTable;
