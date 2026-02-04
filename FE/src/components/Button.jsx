export default function Button({
  className = "w-full h-10 bg-blue-600 text-white border-none",
  children,
  onClick,
  type,
}) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`
        ${className}
        rounded-lg
        px-4 py-2
        hover:opacity-90
        transition cursor-pointer hover:border hover:border-2 hover:border-blue-600 hover:ring-2 hover:ring-blue-500
      `}
    >
      {children}
    </button>
  );
}
