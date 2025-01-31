import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useClient } from "@/context/ClientContext";
import { Customer } from "@/context/ClientContext";
import { CreateClient } from "./CreateClient";
import { ClientCard } from "./ClientCard";
import { Pagination } from "./Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Cliente() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedCustomers, addCustomer } = useClient();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

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

  const handleEditCliente = (updatedCliente: Customer) => {
    setClientes((prevClientes) =>
      prevClientes.map((cliente) =>
        cliente.id === updatedCliente.id ? updatedCliente : cliente
      )
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClientes = clientes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          <span className="text-black font-semibold">{clientes.length}</span>{" "}
          clientes encontrados:
        </h2>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Clientes por página:</label>
          <Select onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-[70px] border rounded-md p-2">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              {[2, 4, 6, 16, 20].map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {currentClientes.length > 0 ? (
          currentClientes.map((cliente) => (
            <ClientCard
              key={cliente.id}
              cliente={cliente}
              onAddCliente={handleAddCliente}
              onDeleteCliente={handleDeleteCliente}
              onEditCliente={handleEditCliente}
            />
          ))
        ) : (
          <p className="text-gray-500">Nenhum cliente cadastrado.</p>
        )}
      </div>

      <Pagination
        totalItems={clientes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <div className="flex justify-center mt-6">
        <CreateClient onCreateCliente={handleCreateCliente} />
      </div>
    </div>
  );
}
