import { Link } from "@tanstack/react-router";
export const FooterLink = ({
  to,
  preText,
  postText,
  paddingBottom = "pb-10",
}: {
  to: string;
  preText: string;
  postText: string;
  paddingBottom?: string;
}) => {
  return (
    <div
      className={`flex justify-center items-center gap-1.5 text-[14px] mt-auto ${paddingBottom}`}
    >
      <span className="text-muted-foreground">{preText}</span>
      <Link to={to} className="font-semibold text-primary hover:underline">
        {postText}
      </Link>
    </div>
  );
};
