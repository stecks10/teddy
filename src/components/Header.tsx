import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-mb hover:bg-gray-100">
          <Menu size={24} />
        </button>
        <div className="text-xl font-bold text-orange-600">
          <span className="text-black">Teddy</span>
        </div>
      </div>
      <nav className="flex gap-6 text-gray-600">
        <a href="#" className="text-orange-600 font-medium underline">
          Clientes
        </a>
        <a href="#" className="text-orange-600 font-medium underline">
          Produtos
        </a>
        <a href="#" className="text-orange-600 font-medium underline">
          Vendas
        </a>
      </nav>
      <div className="text-gray-700 font-medium mr-8"> Ola, Fulano</div>
    </header>
  );
}
