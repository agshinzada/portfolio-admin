import SkillGrid from "@/components/skills/SkillGrid";
import SkillItem from "@/components/skills/SkillItem";
import { Button } from "@/components/ui/button";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import { SkillData } from "@/types/skill";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SkillsPage = () => {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const navigate = useNavigate();

  const getData = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_SKILL_VIEW)
      .select("*");
    if (error) {
      toast.error("Error fetching skills");
    }
    setSkills(data!);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <PageTitle title="Skills" />
      <Button className="bg-blue-600 mb-5" onClick={() => navigate("add")}>
        Add skill
      </Button>
      <SkillGrid>
        {skills.map((item) => (
          <SkillItem data={item} key={item.id} />
        ))}
      </SkillGrid>
    </Container>
  );
};

export default SkillsPage;
