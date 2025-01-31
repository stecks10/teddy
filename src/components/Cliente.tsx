import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useClient } from "@/context/ClientContext";
import { Customer } from "@/context/ClientContext";
import { CreateClient } from "./CreateClient";
import { ClientCard } from "./ClientCard";

export function Cliente() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedCustomers, addCustomer } = useClient();
  const [clientes, setClientes] = useState<Customer[]>([]);

  useEffect(() => {
    const storedClientes = localStorage.getItem("clientes");
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
    }
  }, []);

  useEffect(() => {
    if (clientes.length > 0) {
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }
  }, [clientes]);

  const handleCreateCliente = (cliente: Customer) => {
    setClientes((prevClientes) => {
      const clienteJaExiste = prevClientes.some((c) => c.id === cliente.id);
      return clienteJaExiste ? prevClientes : [...prevClientes, cliente];
    });
  };

  const handleDeleteCliente = (id: string) => {
    setClientes((prevClientes) =>
      prevClientes.filter((cliente) => cliente.id !== id)
    );
  };

  const handleAddCliente = (cliente: Customer) => {
    if (
      !selectedCustomers.some(
        (selectedCliente) => selectedCliente.id === cliente.id
      )
    ) {
      addCustomer(cliente);
      toast({
        className: "bg-green-500 text-white",
        title: "Cliente adicionado!",
        description: `${cliente.nome} foi adicionado à lista de selecionados.`,
        action: (
          <ToastAction
            altText="Ver lista"
            onClick={(e) => {
              e.preventDefault();
              navigate("/clientes-selecionados");
            }}
          >
            Ver lista
          </ToastAction>
        ),
      });
    } else {
      toast({
        className: "bg-yellow-500 text-white",
        title: "Cliente já adicionado",
        description: `${cliente.nome} já está na lista.`,
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          <span className="text-black font-semibold">{clientes.length}</span>{" "}
          clientes cadastrados
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <ClientCard
              key={cliente.id}
              cliente={cliente}
              onAddCliente={handleAddCliente}
              onDeleteCliente={handleDeleteCliente}
            />
          ))
        ) : (
          <p className="text-gray-500">Nenhum cliente cadastrado.</p>
        )}
      </div>

      <CreateClient onCreateCliente={handleCreateCliente} />
    </div>
  );
}
