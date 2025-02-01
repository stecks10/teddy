// hooks/useClients.ts
import { useState, useEffect } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../service/api";
import { Customer } from "@/context/ClientContext";

export function useClients() {
  const [clientes, setClientes] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        const data = await getClients();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  const handleCreateCliente = async (cliente: Customer) => {
    try {
      const newCliente = await createClient(cliente);
      setClientes((prevClientes) => [...prevClientes, newCliente]);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  const handleEditCliente = async (updatedCliente: Customer) => {
    try {
      const updated = await updateClient(updatedCliente.id, updatedCliente);
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === updated.id ? updated : cliente
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  const handleDeleteCliente = async (id: string) => {
    try {
      await deleteClient(id);
      setClientes((prevClientes) =>
        prevClientes.filter((cliente) => cliente.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  return {
    clientes,
    loading,
    handleCreateCliente,
    handleEditCliente,
    handleDeleteCliente,
  };
}
