import { Plus } from "lucide-react";
import { EditClientModal } from "./EditClientModal";
import { DeleteClientModal } from "./DeleteClient";
import { Customer } from "@/context/ClientContext";

interface ClientCardProps {
  cliente: Customer;
  onAddCliente: (cliente: Customer) => void;
  onDeleteCliente: (id: string) => void;
}

export function ClientCard({
  cliente,
  onAddCliente,
  onDeleteCliente,
}: ClientCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="font-bold">{cliente.nome}</h3>
      <p>Salário: {cliente.salario}</p>
      <p>Empresa: {cliente.empresa}</p>
      <div className="flex justify-between mt-2">
        <button className="text-lg" onClick={() => onAddCliente(cliente)}>
          <Plus size={20} />
        </button>
        <EditClientModal
          nome={cliente.nome}
          salario={cliente.salario}
          empresa={cliente.empresa}
        />
        <DeleteClientModal
          nome={cliente.nome}
          onDelete={() => onDeleteCliente(cliente.id)}
        />
      </div>
    </div>
  );
}
