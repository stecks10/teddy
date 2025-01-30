import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { ClienteModal } from "./ClientModal";

export function Clientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          <span className="text-black font-semibold">16</span> clientes
          encontrados:
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">Clientes por página:</span>
          <select className="border rounded px-2 py-1">
            <option>16</option>
            <option>32</option>
            <option>48</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-bold">Eduardo</h3>
            <p>Salário: R$3.500,00</p>
            <p>Empresa: R$120.000,00</p>
            <div className="flex justify-between mt-2">
              <button className="text-lg">
                <Plus size={20} />
              </button>
              <button className="text-lg">
                <Edit size={20} />
              </button>
              <button className="text-lg text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="bg-[#ec6724] hover:bg-orange-500 w-52 mt-8 min-w-full"
        onClick={() => setIsModalOpen(true)}
      >
        Criar Cliente
      </Button>

      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {
          console.log("Cliente salvo!");
          setIsModalOpen(false);
        }}
      />

      <div className="flex justify-center mt-4 space-x-2">
        <button className="px-3 py-1 border rounded">1</button>
        <span>...</span>
        <button className="px-3 py-1 border rounded">3</button>
        <button className="px-3 py-1 border rounded bg-orange-500 text-white">
          4
        </button>
        <button className="px-3 py-1 border rounded">5</button>
        <span>...</span>
        <button className="px-3 py-1 border rounded">12</button>
      </div>
    </div>
  );
}
