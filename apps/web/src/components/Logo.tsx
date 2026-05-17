export const Logo = ({
  imgSrc,
  imgAlt,
  title,
  tagline,
  paddingTop = "pt-20",
}: {
  imgSrc: string;
  imgAlt: string;
  title?: string;
  tagline?: string;
  paddingTop?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center text-center px-6 ${paddingTop}`}
    >
      {/* Logo */}
      <div className="w-32 h-32 mb-4 drop-shadow-sm">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-contain"
        />
      </div>
      {title && (
        <h1 className="text-3xl font-semibold tracking-tight text-primary">
          {title}
        </h1>
      )}
      {tagline && (
        <p className="mt-2 max-w-60 text-muted-foreground text-sm">{tagline}</p>
      )}
    </div>
  );
};
