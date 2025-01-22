// Navbar.tsx
import NavLinks from "./NavLinks";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <a href="/" className="text-2xl font-bold text-white">
          DonnaTech
        </a>
      </div>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
