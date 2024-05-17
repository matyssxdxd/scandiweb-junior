import { NavLink } from "react-router-dom";

export default function NavButton({ url, text }) {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        (isActive
          ? "text-green-400 border-b-2 border-green-400"
          : "text-gray-600 border-b-2 border-transparent") +
        " pl-4 pr-4 text-s font-semibold leading-5 h-full hover:text-green-400 hover:border-green-400"
      }
    >
      <span className="flex items-center justify-center h-full">{text}</span>
    </NavLink>
  );
}
