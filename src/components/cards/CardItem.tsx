import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectData } from "@/types/project";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ExternalLink, Pencil } from "lucide-react";
import { Badge } from "../ui/badge";
import { FaGithub } from "react-icons/fa";

const CardItem = ({ data }: { data: ProjectData }) => {
  const cover = data.images.find((image) => image.type === 2)?.url;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {data.title}
          <Badge variant="outline" className="bg-green-600 text-white">
            {data.status_title}
          </Badge>
        </CardTitle>
        <CardDescription>
          {data.description.slice(0, 90).concat("...")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img src={cover} alt="cover" className="rounded-xs" />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          <a href={data.link} target="_blank">
            <Button variant="link">
              <ExternalLink /> View project
            </Button>
          </a>
          <Link to={"/"}>
            <Button variant="link">
              <Pencil />
              Edit
            </Button>
          </Link>
        </div>
        <a href={data.repo} target="_blank" className="cursor-pointer">
          <FaGithub size={20} />
        </a>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
