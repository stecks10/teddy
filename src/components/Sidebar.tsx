import { X, Home, Users, Grid } from "lucide-react";
import { useLocation } from "react-router-dom";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold text-orange-600">
          <span className="text-black">Teddy</span> Open Finance
        </h2>
        <button onClick={onClose} className="p-2 rounded hover:bg-gray-200">
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col p-4 space-y-4">
        <a className="flex items-center gap-3" href="/">
          <Home size={20} /> Home
        </a>
        <a
          href="home"
          className={`flex items-center gap-3 ${
            location.pathname === "/home"
              ? "text-orange-600 font-semibold"
              : "text-gray-700 hover:text-orange-600"
          }`}
        >
          <Users size={20} /> Clientes
        </a>
        <a
          href="/clientes-selecionados"
          className={`flex items-center gap-3 ${
            location.pathname === "/clientes-selecionados"
              ? "text-orange-600 font-semibold"
              : "text-gray-700 hover:text-orange-600"
          }`}
        >
          <Grid size={20} /> Clientes selecionados
        </a>
      </nav>
    </div>
  );
}
