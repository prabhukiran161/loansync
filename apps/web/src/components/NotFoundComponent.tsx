import { MobileShell } from "./MobileShell";
import { FileQuestion } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const NotFoundComponent = () => {
  return (
    <MobileShell hideNav={true}>
      <div className="flex flex-col justify-center items-center h-full px-6 text-center">
        <div className="w-24 h-24 flex justify-center items-center bg-primary/10 rounded-[2rem] mb-4 shadow-inner">
          <FileQuestion size={48} className="text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground mb-6 max-w-70">
          We couldn't find the page you were looking for. It might have been
          moved or deleted.
        </p>
        <Link
          to="/"
          className="w-full bg-primary text-base text-primary-foreground px-6 py-4 rounded-xl font-semibold shadow-md active:scale-95 transition flex justify-center"
        >
          Return to Home
        </Link>
      </div>
    </MobileShell>
  );
};
