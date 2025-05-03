import { ImageData } from "@/types/image";

const ImageItem = ({ data }: { data: ImageData }) => {
  return (
    <div className="relative rounded-lg">
      <img src={data.url} alt="image" className="w-full h-full rounded-lg" />
      <span className="absolute bottom-5 p-2 rounded-r-lg left-0 bg-white">
        {data.title}
      </span>
    </div>
  );
};

export default ImageItem;
