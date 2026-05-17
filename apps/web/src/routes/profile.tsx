import { MobileShell } from "@/components/MobileShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { createFileRoute, Link } from "@tanstack/react-router";
import { currentUser } from "@/lib/mockData";
import { ProfileLink } from "@/components/ui/ProfileLink";
import { PROFILE_LINKS } from "@/constants/profileLinks";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  return (
    <MobileShell>
      <div className="min-h-full flex flex-col">
        <ScreenHeader title="Profile" />
        <div className="px-5 mt-2">
          {/* Identity Section */}
          <div className="flex gap-4 items-center mb-6 bg-card px-6 py-4 shadow-sm rounded-xl border border-border/50">
            <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex justify-center items-center font-semibold text-xl shrink-0 shadow-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-[15px] text-foreground font-semibold ">
                {currentUser.name}
              </h2>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                {currentUser.mobile}
              </p>
            </div>
          </div>
          {/* Group Section */}
          <div className="bg-card rounded-[20px] shadow-sm border border-border/50 flex flex-col mb-6 overflow-hidden">
            {PROFILE_LINKS.map((link, index) => (
              <div key={index}>
                <ProfileLink to={link.to} label={link.label} icon={link.icon} />
                {index !== PROFILE_LINKS.length - 1 && (
                  <div className="h-px bg-border/40 ml-14" />
                )}
              </div>
            ))}
          </div>
          {/* Logout Section */}
          <Link to="/login" className="mb-6 block">
            <div className="bg-card rounded-[20px] p-4 shadow-sm border border-border/50 flex items-center justify-center gap-2 text-destructive hover:bg-red-50/50 transition-colors active:scale-[0.98]">
              <LogOut size={18} />
              <span className="font-semibold text-[15px]">Logout</span>
            </div>
          </Link>
          {/* Version Section */}
          <div className="text-center text-xs text-muted-foreground">
            LoanSync - v1.0
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
