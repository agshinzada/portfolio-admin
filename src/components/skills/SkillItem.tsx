import { SkillData } from "@/types/skill";
import { supabase } from "@/utils/supabase";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const SkillItem = ({ data }: { data: SkillData }) => {
  const handleRemove = async () => {
    if (confirm("Are you sure you want to delete this skill?")) {
      const { error } = await supabase
        .from(import.meta.env.VITE_SKILL_TABLE)
        .delete()
        .eq("id", data.id);
      if (error) {
        toast.error("Error deleting skill");
      } else {
        toast.success("Skill deleted successfully");
      }
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 border border-slate-200 rounded-lg p-2">
      <div className="flex items-center gap-3">
        <img src={data.url} alt="icon" className="w-9" />
        <span>{data.title}</span>
      </div>
      <Trash2
        className="text-red-600 cursor-pointer"
        size={16}
        onClick={handleRemove}
      />
    </div>
  );
};

export default SkillItem;
