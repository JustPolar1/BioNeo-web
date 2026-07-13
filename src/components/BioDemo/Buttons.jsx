import { BsPlus } from "react-icons/bs";
import { GiPlantRoots } from "react-icons/gi";

export default function DemoFab({
  children,
  className = "",
  type = "button",
  onClick,
  title,
  ariaLabel,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      className=
      {`rounded-full p-3
        bg-gradient-to-br from-green-500 to-emerald-600  
        text-white shadow-lg 
        transition hover:scale-105 hover:shadow-xl hover:cursor-pointer ${className}`.trim()}
      {...props}
    >
      {children ?? <BsPlus size={32} />}
    </button>
  );
}