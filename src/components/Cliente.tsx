import { useState } from "react";
import { CreateClient } from "./CreateClient";
import { Pagination } from "./Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClients } from "@/hooks/useClients";
import { DeleteClientModal } from "./DeleteClient";
import { Plus, Minus } from "lucide-react";
import { EditClient } from "./EditClient";

export function Cliente() {
  const {
    clientes,
    loading,
    handleCreateCliente,
    handleDeleteCliente,
    handleToggleFavorite,
    handleEditCliente,
  } = useClients();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentClientes = clientes.slice(indexOfFirstItem, indexOfLastItem);

  const formatToBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="p-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4 sm:mb-0">
          <span className="text-black font-semibold">{clientes.length}</span>{" "}
          clientes encontrados:
        </h2>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Clientes por página:</label>
          <Select onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-[70px] border rounded-md p-2">
              <SelectValue placeholder={itemsPerPage.toString()} />
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

      {loading ? (
        <p>Carregando clientes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentClientes.length > 0 ? (
            currentClientes.map((cliente, index) => (
              <div
                key={cliente.id ?? `temp-${index}`}
                data-testid={`cliente-${cliente.id ?? `temp-${index}`}`}
                className="border rounded-lg p-4 shadow-sm bg-white cliente-card"
              >
                <h3 className="font-bold">{cliente.name}</h3>
                <p>Salário: {formatToBRL(Number(cliente.salary))}</p>
                <p>Empresa: {formatToBRL(Number(cliente.companyValue))}</p>
                <div className="flex justify-between mt-2">
                  <button
                    className="text-lg"
                    onClick={() => handleToggleFavorite(cliente)}
                  >
                    {cliente.selected ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </button>

                  <EditClient
                    client={cliente}
                    onEditCliente={handleEditCliente}
                  />

                  <DeleteClientModal
                    nome={cliente.name}
                    onDelete={() => handleDeleteCliente(cliente.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhum cliente cadastrado.</p>
          )}
        </div>
      )}

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
