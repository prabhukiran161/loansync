import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div>
      <h1>My App</h1>
      <Outlet />
    </div>
  ),
});
