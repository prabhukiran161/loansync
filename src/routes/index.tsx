import { MobileShell } from "@/components/MobileShell";
import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/ScreenHeader";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <MobileShell>
      <h2>Home</h2>
    </MobileShell>
  );
}
