import { useAuthStore } from "@/components/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import { supabase } from "@/utils/supabase";
import { CircleChevronLeft, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddImagePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const type = formData.get("type");
    const bucket =
      type === "1"
        ? import.meta.env.VITE_SKILL_BUCKET
        : import.meta.env.VITE_PROJECT_BUCKET;
    const fileName = `${name}-${Date.now()}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, image as File);
    if (error) {
      toast.error("Error uploading image");
      setLoading(false);
      return;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    const { error: insertError } = await supabase
      .from(import.meta.env.VITE_IMAGE_VIEW)
      .insert({
        title: name,
        url: data.publicUrl,
        type,
        email: user?.email,
      })
      .single();
    if (insertError) {
      toast.error("Error creating image");
      setLoading(false);
      return;
    }
    toast.success("Image uploaded");
    setLoading(false);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file as File);
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
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder=""
            id="name"
            className="w-full"
            name="name"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="type">Status</Label>
          <Select name="type" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"1"} key={1}>
                Skill
              </SelectItem>
              <SelectItem value={"2"} key={2}>
                Project
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative flex items-center justify-center w-xs min-h-52 rounded-lg">
          {!image && (
            <div className="absolute w-full h-full">
              <label
                htmlFor="image"
                className="flex items-center justify-center w-full h-full text-gray-500 border border-slate-200 rounded-lg"
              >
                No image selected
              </label>
              <Input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          )}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              className="object-cover absolute w-full h-full rounded-lg"
            />
          )}
        </div>
        {image && (
          <Trash2
            className="text-red-600 cursor-pointer"
            size={18}
            onClick={() => setImage(null)}
          />
        )}
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
    </Container>
  );
};

export default AddImagePage;
