import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { EditClientModal } from "./EditClientModal";
import { DeleteClientModal } from "./DeleteClient";
import { ClienteModal } from "./ClientModal";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useClientes } from "@/context/ClientContext"; // Importando o contexto

// Definição do tipo Cliente
interface Cliente {
  nome: string;
  salario: string;
  empresa: string;
}

export function Clientes() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addCliente } = useClientes(); // Usando o contexto para adicionar clientes

  const clientes: Cliente[] = [
    { nome: "Eduardo", salario: "R$ 3.500,00", empresa: "R$ 120.000,00" },
    { nome: "Mariana", salario: "R$ 4.200,00", empresa: "R$ 200.000,00" },
  ];

  // Função para adicionar cliente à lista de selecionados
  const handleAddCliente = (cliente: Cliente) => {
    addCliente(cliente);

    toast({
      title: "Cliente adicionado!",
      description: `${cliente.nome} foi adicionado à lista de selecionados.`,
      action: (
        <ToastAction
          altText="Ver lista"
          onClick={() => navigate("/clientes-selecionados")}
        >
          Ver lista
        </ToastAction>
      ),
    });

    setTimeout(() => {
      navigate("/clientes-selecionados");
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          <span className="text-black font-semibold">{clientes.length}</span>{" "}
          clientes encontrados:
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {clientes.map((cliente, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-bold">{cliente.nome}</h3>
            <p>Salário: {cliente.salario}</p>
            <p>Empresa: {cliente.empresa}</p>
            <div className="flex justify-between mt-2">
              <button
                className="text-lg"
                onClick={() => handleAddCliente(cliente)}
              >
                <Plus size={20} />
              </button>

              <EditClientModal
                nome={cliente.nome}
                salario={cliente.salario}
                empresa={cliente.empresa}
              />
              <DeleteClientModal
                nome={cliente.nome}
                onDelete={() => console.log("Excluir cliente:", cliente.nome)}
              />
            </div>
          </div>
        ))}
      </div>

      <ClienteModal />
    </div>
  );
}
