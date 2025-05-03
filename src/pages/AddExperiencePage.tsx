import { useAuthStore } from "@/components/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import { supabase } from "@/utils/supabase";
import { CircleChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddExperiencePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const company = formData.get("company");
    const start_year = formData.get("start_date");
    const end_year = formData.get("end_date");

    const { error } = await supabase
      .from(import.meta.env.VITE_EXPERIENCE_VIEW)
      .insert({
        name,
        company,
        start_year,
        end_year,
        email: user?.email,
      })
      .single();
    if (error) {
      toast.error("Error creating experience");
      setLoading(false);
      return;
    }
    toast.success("Experience created");
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
          <Label htmlFor="company">Company</Label>
          <Input
            type="text"
            placeholder=""
            id="company"
            className="w-full"
            name="company"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="start_date">Start date</Label>
          <Input
            type="text"
            placeholder=""
            id="start_date"
            className="w-full"
            name="start_date"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="end_date">End date</Label>
          <Input
            type="text"
            placeholder=""
            id="end_date"
            className="w-full"
            name="end_date"
            required
          />
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
    </Container>
  );
};

export default AddExperiencePage;
