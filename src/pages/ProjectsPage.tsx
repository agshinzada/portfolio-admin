import CardGrid from "@/components/cards/CardGrid";
import CardItem from "@/components/cards/CardItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import { ProjectData } from "@/types/project";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const navigate = useNavigate();
  const getData = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_PROJECT_VIEW)
      .select("*")
      .order("sort", { ascending: false });
    if (error) {
      toast.error("Error fetching projects");
    }
    setProjects(data!);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <PageTitle title="Projects" />
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="search">Search</Label>
          <Input
            type="search"
            placeholder="Title..."
            id="search"
            className="w-fit"
          />
        </div>
        <Button
          className="bg-blue-600 cursor-pointer"
          type="button"
          onClick={() => navigate("add")}
        >
          Add project
        </Button>
      </div>

      <CardGrid>
        {projects.map((project) => (
          <CardItem key={project.id} data={project} />
        ))}
      </CardGrid>
    </Container>
  );
};

export default ProjectsPage;
