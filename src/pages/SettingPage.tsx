import StatusTable from "@/components/table/StatusTable";
import { Button } from "@/components/ui/button";
import Container from "@/components/utils/Container";
import PageTitle from "@/components/utils/PageTitle";
import { StatusData } from "@/types/status";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SettingPage = () => {
  const [statuslist, setStatusList] = useState<StatusData[]>([]);

  const getData = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_STATUS_VIEW)
      .select("*");
    if (error) {
      toast.error("Error fetching skills");
    }
    setStatusList(data!);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <PageTitle title="Settings" />
      <Button className="bg-blue-600">Add status</Button>
      <StatusTable data={statuslist} />
    </Container>
  );
};

export default SettingPage;
