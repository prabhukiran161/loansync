import { Field } from "@/components/Field";
import { MobileShell } from "@/components/MobileShell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { FooterLink } from "@/components/FooterLink";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "@/lib/apiClient";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("mobileNumber") as string;
    const password = formData.get("password") as string;

    try {
      const response = await apiClient.post("/auth/login", {
        userName,
        password,
      });

      setAuth(response.data.accessToken, response.data.user);

      navigate({ to: "/" });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to login. Please try again.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            name="mobileNumber"
            label="Mobile Number"
            type="tel"
            placeholder="+91 98765 43210"
          />
          <Field
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
          />
          <div className="flex justify-end mt-1">
            <span className="text-[13px] font-medium text-primary cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full rounded-[16px] h-14 text-[16px] font-semibold mt-4 shadow-sm active:scale-[0.98] transition-all"
          >
            {isLoading ? "Logging in..." : "Login"}
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
