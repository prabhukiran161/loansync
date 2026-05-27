import { MobileShell } from "@/components/MobileShell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Field } from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { FooterLink } from "@/components/FooterLink";
import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("mobileNumber") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    setIsLoading(true);

    try {
      const registerRes = await apiClient.post("/auth/register", {
        userName,
        password,
      });

      const loginRes = await apiClient.post("/auth/login", {
        userName,
        password,
      });

      setAuth(loginRes.data.accessToken, loginRes.data.user);
      navigate({ to: "/" });
    } catch (err: any) {
      setError(err.message || "Registration failed. Try a different number.");
    } finally {
      setIsLoading(false);
    }
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
            name="mobileNumber"
            type="tel"
            placeholder="+91 98765 43210"
          />
          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <Field
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
          />
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full rounded-[16px] h-14 text-[16px] font-semibold mt-6 shadow-md active:scale-[0.98] transition-all"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
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
