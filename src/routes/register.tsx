import { MobileShell } from "@/components/MobileShell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Field } from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { FooterLink } from "@/components/FooterLink";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/" });
  };

  return (
    <MobileShell hideNav={true}>
      <div className="flex flex-col min-h-full">
        <Logo
          imgSrc="/logo.png"
          imgAlt="LoanSync Logo"
          title="Create Account"
          tagline="Join LoanSync to effortlessly manage shared finances with your family."
        />
        <form onSubmit={handleRegister} className="mt-6 px-6 space-y-4">
          <Field label="Full Name" type="text" placeholder="Prabhu Kiran" />
          <Field
            label="Mobile Number"
            type="tel"
            placeholder="+91 98765 43210"
          />
          <Field label="Password" type="password" placeholder="••••••••" />
          <Field
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
          />
          <Button
            type="submit"
            className="w-full rounded-[16px] h-14 text-[16px] font-semibold mt-6 shadow-md active:scale-[0.98] transition-all"
          >
            Create Account
          </Button>
        </form>
        <FooterLink
          to="/login"
          preText="Already have an account?"
          postText="Login here"
        />
      </div>
    </MobileShell>
  );
}
