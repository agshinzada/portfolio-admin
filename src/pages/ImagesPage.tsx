import { Button } from "@/components/ui/button";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageGrid from "@/components/images/ImageGrid";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";
import ImageItem from "@/components/images/ImageItem";
import { ImageData } from "@/types/image";
import { useNavigate } from "react-router-dom";

const ImagesPage = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const navigate = useNavigate();

  const getData = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_IMAGE_VIEW)
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      toast.error("Error fetching skills");
    }
    setImages(data!);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <PageTitle title="Images" />
      <div className="flex justify-between items-center mb-5">
        <Button
          className="bg-blue-600 cursor-pointer"
          onClick={() => navigate("add")}
        >
          Add image
        </Button>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Projects</SelectItem>
            <SelectItem value="dark">Skills</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ImageGrid>
        {images.map(
          (item) => item.type === 2 && <ImageItem key={item.id} data={item} />
        )}
      </ImageGrid>
    </Container>
  );
};

export default ImagesPage;
