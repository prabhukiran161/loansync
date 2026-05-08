import { MobileShell } from "@/components/MobileShell";
import { createFileRoute } from "@tanstack/react-router";
import { loans, currentUser, fmt, notifications } from "@/lib/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { QUICK_ACTIONS } from "@/constants/quickActions";
import { QuickAction } from "@/components/QuickAction";
import { YourLoans } from "@/components/YourLoans";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const total = loans.reduce((s, l) => s + l.total, 0);
  const remaining = loans.reduce((s, l) => s + l.remaining, 0);
  const paid = total - remaining;
  const pct = Math.round((paid / total) * 100);
  const unread = notifications?.length || 0;

  return (
    <MobileShell>
      {/* Header Section */}
      <div className="flex justify-between items-center px-5 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {currentUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Hello,</p>
            <h1 className="text-lg font-bold leading-tight">
              {currentUser.name} 👋
            </h1>
          </div>
        </div>
        <Link
          to="/"
          className="relative w-10 h-10 rounded-full bg-card shadow-sm  flex items-center justify-center cursor-pointer"
        >
          <Bell size={20} className="text-foreground" />
          {unread > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          )}
        </Link>
      </div>
      {/* Total Outstanding Section */}
      <div className="px-5 mt-4">
        <div
          className="rounded-xl p-5 text-primary-foreground shadow-lg shadow-primary/20"
          style={{
            background: "linear-gradient(135deg, #00B9F1 0%, #0891D1 100%)",
          }}
        >
          <p className="text-xs opacity-90">Total Outstanding</p>
          <p className="text-3xl font-bold mt-1">{fmt(remaining)}</p>
          <div className="mt-4 flex justify-between text-xs opacity-90">
            <span>Paid {fmt(paid)}</span>
            <span>Total {fmt(total)}</span>
          </div>
          <div className="mt-2 h-2 bg-white/25 rounded-full overflow-hidden">
            <div
              className="h-full bg-white  rounded-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs opacity-90">{pct}% repaid</p>
        </div>
      </div>
      {/* Quick Action Section */}
      <div className="grid grid-cols-3 gap-3 px-5 mt-5">
        {QUICK_ACTIONS.map((action, index) => (
          <QuickAction
            key={index}
            to={action.to}
            label={action.label}
            icon={action.icon}
          />
        ))}
      </div>
      {/* Next Due Section */}
      <div className="px-5 mt-6">
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold">Next Due</p>
          <p className="text-xs text-muted-foreground">Est. May 15</p>
        </div>
        <Card className="rounded-xl p-4 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Estimated payment</p>
              <p className="font-bold text-xl mt-1">{fmt(28500)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Loans Active</p>
              <p className="font-bold text-xl mt-1">{loans.length}</p>
            </div>
          </div>
        </Card>
      </div>
      {/* Your Loans Section */}
      <div className="px-5 mt-6">
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold">Your Loans</p>
          <p className="text-xs text-primary">View all</p>
        </div>
        {loans.map((loan, index) => (
          <YourLoans
            key={index}
            name={loan.name}
            remaining={loan.remaining}
            participantCount={loan.participants.length}
          />
        ))}
      </div>
    </MobileShell>
  );
}
