import { useEffect } from "react";
import { useAuthStore } from "./components/stores/useAuthStore";
import { supabase } from "./utils/supabase";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const syncUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
      if (error) {
        setUser(null);
      }
    };
    syncUser();
  }, []);

  return (
    <>
      <Outlet />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
