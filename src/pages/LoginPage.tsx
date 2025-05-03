import LoginForm from "@/components/form/LoginForm";
import logo from "@/assets/logo-black.svg";
import { Toaster } from "react-hot-toast";
const LoginPage = () => {
  return (
    <div className="bg-slate-100 flex items-center justify-center min-h-dvh">
      <div className="flex flex-col p-10 max-w-md w-full bg-white rounded-lg">
        <img src={logo} alt="logo" className="w-32 self-center mb-5" />
        <LoginForm />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default LoginPage;
