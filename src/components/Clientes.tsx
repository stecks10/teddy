import { Plus } from "lucide-react";
import { ClienteModal } from "./ClientModal";
import { EditClientModal } from "./EditClientModal";
import { DeleteClientModal } from "./DeleteClient";

export function Clientes() {
  const clientes = [
    { nome: "Eduardo", salario: "R$ 3.500,00", empresa: "R$ 120.000,00" },
    { nome: "Mariana", salario: "R$ 4.200,00", empresa: "R$ 200.000,00" },
    { nome: "Mariana", salario: "R$ 4.200,00", empresa: "R$ 200.000,00" },
    { nome: "Mariana", salario: "R$ 4.200,00", empresa: "R$ 200.000,00" },
    { nome: "Mariana", salario: "R$ 4.200,00", empresa: "R$ 200.000,00" },
  ];

  const handleDelete = (nome: string) => {
    console.log("Excluir o cliente: ", nome);
  };

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
        {clientes.map((cliente, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-bold">{cliente.nome}</h3>
            <p>Salário: {cliente.salario}</p>
            <p>Empresa: {cliente.empresa}</p>
            <div className="flex justify-between mt-2">
              <button className="text-lg">
                <Plus size={20} />
              </button>

              <EditClientModal
                nome={cliente.nome}
                salario={cliente.salario}
                empresa={cliente.empresa}
              />

              <DeleteClientModal
                nome={cliente.nome}
                onDelete={() => handleDelete(cliente.nome)}
              />
            </div>
          </div>
        ))}
      </div>

      <ClienteModal />

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
