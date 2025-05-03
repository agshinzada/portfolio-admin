import { ImageData } from "@/types/image";
import { supabase } from "@/utils/supabase";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { Button } from "../ui/button";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const AddImageToForm = ({
  isOpen,
  setIsOpen,
  setSelected,
  selected,
  imageType,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setSelected: (value: ImageData[]) => void;
  selected: ImageData[];
  imageType: number;
}) => {
  const [images, setImages] = useState<ImageData[]>([]);

  const handleSelect = (image: ImageData) => {
    if (selected.some((item) => item.id === image.id)) {
      setSelected(
        selected.filter((item) => item.id !== image.id) as ImageData[]
      );
    } else {
      setSelected([...selected, image]);
    }
  };

  const getImages = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_IMAGE_VIEW)
      .select("*")
      .eq("type", imageType)
      .order("id", { ascending: false });
    if (error) {
      toast.error("Error fetching images");
    }
    setImages(data!);
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      getImages();
    }
  }, [isOpen]);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <div className="flex justify-between items-center mb-7">
          <h2 className="font-bold">Images</h2>
          <CircleX size={25} onClick={closeModal} className="cursor-pointer" />
        </div>
        <Button className="bg-blue-600 cursor-pointer w-fit mb-3" type="button">
          Upload
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 overflow-scroll max-h-64">
          {images.map((item) => (
            <div className="relative group">
              <img
                src={item.url}
                alt=""
                key={item.id}
                className="w-full md:w-40 rounded-sm"
              />
              <div className="absolute inset-0 bg-slate-900/50 group-hover:opacity-100 opacity-0 rounded-sm transition-opacity"></div>
              <div className="absolute w-full h-full top-0 left-0 mx-auto z-10 flex justify-center items-center group-hover:opacity-100 opacity-0 transition-opacity">
                <Button
                  variant="link"
                  className="text-white cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default AddImageToForm;
