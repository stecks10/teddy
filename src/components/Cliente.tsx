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
import { Plus } from "lucide-react";
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

      {loading ? (
        <p>Carregando clientes...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {currentClientes.length > 0 ? (
            currentClientes.map((cliente) => (
              <div
                key={cliente.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="font-bold">{cliente.name}</h3>
                <p>Salário: {cliente.salary}</p>
                <p>Empresa: {cliente.companyValue}</p>
                <div className="flex justify-between mt-2">
                  <button
                    className="text-lg"
                    onClick={() => handleToggleFavorite(cliente)}
                  >
                    <Plus size={20} />
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
