import { MobileShell } from "@/components/MobileShell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Coins } from "lucide-react";
import { Field } from "@/components/Field";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/" });
  };
  return (
    <MobileShell hideNav={true}>
      {/* Header Section */}
      <div className="pt-16 px-6 flex flex-col items-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
          <Coins size={28} />
        </div>
        <h1 className="text-2xl font-bold mt-5">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to track your Loans
        </p>
      </div>
      {/* Form Section */}
      <form onSubmit={handleLogin} className="mt-10 px-6 space-y-4">
        <Field label="Mobile Number" type="tel" placeholder="+91 98765 43210" />
        <Field label="Password" type="password" placeholder="**********" />
        <Button
          type="submit"
          className="w-full rounded-xl h-12 text-md mt-2 shadow-sm"
        >
          Login
        </Button>
      </form>
    </MobileShell>
  );
}
