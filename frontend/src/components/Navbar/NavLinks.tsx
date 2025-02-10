import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  FaSignOutAlt,
  FaSignInAlt,
  FaUserCircle,
  FaUser,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { useAuth } from "@/app/context/AuthContext";

const links = {
  public: [
    { name: "Página Principal", href: "/", icon: FaHome },
    { name: "Productos", href: "/Product", icon: AiFillProduct },
  ],
  personal: [
    { name: "Inicio", href: "/home", icon: FaHome },
    { name: "Productos", href: "/Product", icon: AiFillProduct },
    { name: "Dashboard", href: "/dashboard", icon: FaUserCircle },
    { name: "Favorites", href: "/favorites", icon: MdFavorite },
    { name: "Cart", href: "/cart", icon: FaShoppingCart },
  ],
};

export default function NavLinks({ isLoggedIn }) {
  const pathname = usePathname();
  const { logout } = useAuth(); // Obtén la función logout del contexto
  const currentLinks = isLoggedIn ? links.personal : links.public;

  const handleLogout = () => {
    logout(); // Llama a la función logout
    window.location.href = "/"; // Redirige a la página principal
  };

  return (
    <div className="flex justify-between items-center mx-auto w-full">
      {/* Enlaces centrados */}
      <div className="flex space-x-4 mx-auto">
        {currentLinks
          .filter(
            link =>
              link.name === "Página Principal" ||
              link.name === "Productos" ||
              (isLoggedIn && link.name === "Inicio")
          )
          .map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-white hover:text-blue-500 flex items-center space-x-2",
                { "text-blue-500": pathname === link.href }
              )}>
              {link.icon && <link.icon className="w-8 h-8" />}
              <span className="hidden md:block">{link.name}</span>
            </Link>
          ))}
      </div>

      {/* Enlaces a la derecha */}
      <div className="flex items-center space-x-4">
        {/* Si el usuario está logueado, muestra las opciones de usuario y el botón de Logout */}
        {isLoggedIn && (
          <>
            <Link
              href="/dashboard"
              className="text-white hover:text-blue-500 flex items-center space-x-2">
              <FaUserCircle className="w-8 h-8" /> {/* Icono de dashboard */}
              {/* <span>dashboard</span> */}
            </Link>
            <Link
              href="/favorites"
              className="text-white hover:text-blue-500 flex items-center space-x-2">
              <MdFavorite className="w-8 h-8" /> {/* Icono de favoritos */}
              {/* <span>Favoritos</span> */}
            </Link>
            <Link
              href="/cart"
              className="text-white hover:text-blue-500 flex items-center space-x-2">
              <FaShoppingCart className="w-8 h-8" /> {/* Icono de carrito */}
              {/* <span>Carrito</span> */}
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-blue-500 flex items-center space-x-2">
              <FaSignOutAlt className="w-8 h-8" />{" "}
              {/* Icono de cerrar sesión */}
              {/* <span>Cerrar Sesión</span> */}
            </button>
          </>
        )}
        {/* Si el usuario no está logueado, muestra los enlaces de inicio de sesión y registro */}
        {!isLoggedIn && (
          <>
            <Link
              href="/SignIn"
              className="text-white hover:text-gray-300 flex items-center space-x-2">
              <FaSignInAlt className="w-8 h-8" />{" "}
              {/* Icono de iniciar sesión */}
              <span>Iniciar Sesión</span>
            </Link>
            <Link
              href="/SignUp"
              className="text-white hover:text-gray-300 flex items-center space-x-2">
              <FaUser className="w-8 h-8" /> {/* Icono de registrarse */}
              <span>Registrarse</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
