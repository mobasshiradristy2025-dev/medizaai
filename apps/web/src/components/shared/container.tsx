export function Container({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-[1920px] px-5 md:px-10 xl:px-[120px] ${className}`}
      {...props}
    />
  );
}