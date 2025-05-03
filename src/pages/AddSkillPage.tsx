import AddImageToForm from "@/components/modal/AddImageToForm";
import { useAuthStore } from "@/components/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import { ImageData } from "@/types/image";
import { supabase } from "@/utils/supabase";
import { CircleChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddSkillPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    if (selectedImages.length === 0) {
      toast.error("Please select images");
      return;
    }
    const { error } = await supabase
      .from(import.meta.env.VITE_SKILL_TABLE)
      .insert({
        title: name,
        image_id: selectedImages[0].id,
        email: user?.email,
      })
      .single();
    if (error) {
      toast.error("Error creating skill");
      setLoading(false);
      return;
    }
    toast.success("Skill created");
    setLoading(false);
  };
  return (
    <Container>
      <CircleChevronLeft
        size={30}
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <PageTitle title="Add skill" />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Skill name</Label>
          <Input
            type="text"
            placeholder=""
            id="name"
            className="w-full"
            name="name"
            required
          />
        </div>
        <div className="relative flex items-center justify-center w-xs min-h-52 rounded-lg">
          {selectedImages.length === 0 && (
            <div
              className="absolute flex items-center justify-center w-full h-full text-gray-500 border border-slate-200 rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              No image selected
            </div>
          )}
          {selectedImages.length > 0 && (
            <img
              src={selectedImages[0].url}
              alt="image"
              className="object-cover absolute w-full h-full rounded-lg"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
        <Button
          className="bg-blue-600 cursor-pointer w-fit"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex gap-1 items-center">
              <Loader2 className="animate-spin" />
              Loading
            </div>
          ) : (
            "Send"
          )}
        </Button>
      </form>
      <AddImageToForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelected={setSelectedImages}
        selected={selectedImages}
        imageType={1}
      />
    </Container>
  );
};

export default AddSkillPage;
