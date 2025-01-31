import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Link } from "react-router-dom";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b shadow-sm bg-white">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-mb hover:bg-gray-100"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="text-xl font-bold text-orange-600">
            <span className="text-black">Teddy</span>
          </div>
        </div>
        <nav className="flex gap-6 text-gray-600">
          <Link to="/home" className="text-orange-600 font-medium underline">
            Clientes
          </Link>
          <Link
            to="/clientes-selecionados"
            className="text-orange-600 font-medium underline"
          >
            Clientes selecionados
          </Link>
          <Link to="/" className="text-orange-600 font-medium underline">
            Sair
          </Link>
        </nav>
        <div className="text-gray-700 font-medium mr-8">
          Olá, {username || "Visitante"}
        </div>
      </header>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
