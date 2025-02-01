import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Link, useLocation } from "react-router-dom"; // Importar useLocation

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const location = useLocation(); // Hook para pegar a localização atual

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
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="text-xl font-bold text-orange-600">
            <span className="text-black">Teddy</span> Open Finance
          </div>
        </div>

        <nav className="hidden lg:flex gap-6 text-gray-600 flex-1 justify-center">
          <Link
            to="/home"
            className={`font-medium ${
              location.pathname === "/home"
                ? "text-orange-600 underline"
                : "text-gray-600"
            }`} // Rota 'home' recebe cor laranja e underline
          >
            Clientes
          </Link>
          <Link
            to="/clientes-selecionados"
            className={`font-medium ${
              location.pathname === "/clientes-selecionados"
                ? "text-orange-600 underline"
                : "text-gray-600"
            }`} // Rota 'clientes-selecionados' recebe cor laranja e underline
          >
            Clientes selecionados
          </Link>
          <Link
            to="/"
            className={`font-medium ${
              location.pathname === "/"
                ? "text-orange-600 underline"
                : "text-gray-600"
            }`} // Rota 'Sair' recebe cor laranja e underline
          >
            Sair
          </Link>
        </nav>

        <div className="text-gray-700 font-medium mr-8 hidden lg:block">
          Olá, {username || "Visitante"}
        </div>

        <div className="text-gray-700 font-medium mr-8 lg:hidden">
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
