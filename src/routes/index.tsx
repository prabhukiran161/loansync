import { MobileShell } from "@/components/MobileShell";
import { createFileRoute } from "@tanstack/react-router";

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
