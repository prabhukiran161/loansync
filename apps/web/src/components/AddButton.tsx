import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const AddButton = ({ to }: { to: string }) => {
  return (
    <Link
      to={to}
      className="bg-primary rounded-full text-primary-foreground w-10 h-10 flex justify-center items-center shadow-md hover:scale-105 transition-transform"
    >
      <Plus size={22} />
    </Link>
  );
};
