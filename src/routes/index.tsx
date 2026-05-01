import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RootComponent,
});

function RootComponent() {
  return <h2>Home</h2>;
}
