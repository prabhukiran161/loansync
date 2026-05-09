import { Field } from "@/components/Field";
import { MobileShell } from "@/components/MobileShell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { FooterLink } from "@/components/FooterLink";

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
    <MobileShell hideNav>
      <div className="flex flex-col min-h-full">
        {/* Header Section */}
        <Logo
          imgSrc="/logo.png"
          imgAlt="LoanSync Logo"
          title="Welcome Back"
          tagline="Sign in to track and manage your shared loans securely."
        />
        {/* Form Section */}
        <form onSubmit={handleLogin} className="mt-12 px-6 space-y-5">
          <Field
            label="Mobile Number"
            type="tel"
            placeholder="+91 98765 43210"
          />
          <Field label="Password" type="password" placeholder="••••••••" />
          <div className="flex justify-end mt-1">
            <span className="text-[13px] font-medium text-primary cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>
          <Button
            type="submit"
            className="w-full rounded-[16px] h-14 text-[16px] font-semibold mt-4 shadow-sm active:scale-[0.98] transition-all"
          >
            Login
          </Button>
        </form>
        <FooterLink
          to="/register"
          preText="Don't have an account?"
          postText="Register here"
        />
      </div>
    </MobileShell>
  );
}
