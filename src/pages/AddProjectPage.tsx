import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase";
import { StatusData } from "@/types/status";
import { Button } from "@/components/ui/button";
import { CircleChevronLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImageData } from "@/types/image";
import { useAuthStore } from "@/components/stores/useAuthStore";
import AddImageToForm from "@/components/modal/AddImageToForm";

const AddProjectPage = () => {
  const [statuslist, setStatusList] = useState<StatusData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const getData = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_STATUS_VIEW)
      .select("*");
    if (error) {
      toast.error("Error fetching skills");
    }
    setStatusList(data!);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const description = formData.get("description");
    const link = formData.get("link");
    const repo = formData.get("repo");
    const slug = formData.get("slug");
    const sort = formData.get("sort");
    const status = formData.get("status");
    if (selectedImages.length === 0) {
      toast.error("Please select images");
      return;
    }
    const { data, error } = await supabase
      .from(import.meta.env.VITE_PROJECT_TABLE)
      .insert({
        title: name,
        description,
        link,
        repo,
        slug_url: slug,
        sort,
        status_id: status,
        email: user?.email,
      })
      .select()
      .single();
    if (error) {
      toast.error("Error adding project");
      return;
    }
    const { error: imgError } = await supabase
      .from(import.meta.env.VITE_PR_IMAGE_TABLE)
      .insert([
        ...selectedImages.map((item) => ({
          project_id: data.id,
          image_id: item.id,
          email: user?.email,
        })),
      ]);

    if (imgError) {
      toast.error("Error adding images");
      return;
    }
    toast.success("Project added successfully");
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <CircleChevronLeft
        size={30}
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <PageTitle title="Add project" />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Project name</Label>
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
          <Label htmlFor="description">Project description</Label>
          <Textarea id="description" name="description" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="link">Project link</Label>
          <Input
            type="text"
            placeholder=""
            id="link"
            name="link"
            className="w-full"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="repo">Project repo</Label>
          <Input
            type="text"
            placeholder=""
            id="repo"
            name="repo"
            className="w-full"
            required
          />
        </div>
        <div className="flex gap-4 md:flex-row flex-col">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slug">Slug url</Label>
            <Input
              type="text"
              placeholder=""
              id="slug"
              name="slug"
              className="w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sort">Sort</Label>
            <Input
              type="text"
              placeholder=""
              id="sort"
              name="sort"
              className="w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="status">Status</Label>
            <Select name="status" required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuslist.map((item) => (
                  <SelectItem value={item.id.toString()} key={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          className="bg-blue-600 cursor-pointer w-fit"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Add images
        </Button>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 flex-wrap">
            {selectedImages.length > 0 &&
              selectedImages.map((item) => (
                <div
                  className="relative flex items-center justify-center w-xs min-h-52 rounded-lg"
                  key={item.id}
                >
                  <img
                    src={item.url}
                    alt="image"
                    className="object-cover absolute w-full h-full rounded-lg"
                  />
                </div>
              ))}
          </div>
          {selectedImages.length > 0 && (
            <Button
              variant={"destructive"}
              className="w-fit cursor-pointer"
              onClick={() => setSelectedImages([])}
            >
              clear
            </Button>
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
        imageType={2}
      />
    </Container>
  );
};

export default AddProjectPage;
