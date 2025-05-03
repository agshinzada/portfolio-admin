import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      await login(email, password);
      navigate("/");
    } catch (err) {
      toast.error("Email or password is incorrect");
      console.error(err);
    }
  };

  return (
    <form
      name="loginForm"
      className="flex gap-4 flex-col w-full"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email address:</Label>
          <Input placeholder="" id="email" name="email" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Password:</Label>
          <Input type="password" placeholder="" id="password" name="password" />
        </div>
      </div>
      <Button type="submit" variant="outline" className="cursor-pointer">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
