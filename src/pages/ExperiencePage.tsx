import ExperienceTable from "@/components/table/ExperienceTable";
import { Button } from "@/components/ui/button";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import { ExperienceData } from "@/types/experience";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ExperiencePage = () => {
  const [experience, setExperience] = useState<ExperienceData[]>([]);
  const navigate = useNavigate();

  const getData = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_EXPERIENCE_VIEW)
      .select("*");
    if (error) {
      toast.error("Error fetching skills");
    }
    setExperience(data!);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <PageTitle title="Experience" />
      <Button
        className="bg-blue-600 mb-5 cursor-pointer"
        onClick={() => navigate("add")}
      >
        Add experience
      </Button>
      <ExperienceTable data={experience} />
    </Container>
  );
};

export default ExperiencePage;
