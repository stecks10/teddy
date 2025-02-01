import { useState, useEffect } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../service/api";
import { Customer, useClient } from "@/context/ClientContext";
import { toast } from "./use-toast";

export function useClients() {
  const { addCustomer, removeCustomer } = useClient();
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
      setClientes((prev) => [...prev, newCliente]);
      const updatedClientes = await getClients();
      setClientes(updatedClientes);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  const handleEditCliente = async (updatedCliente: Customer) => {
    try {
      const { client: updated } = await updateClient(
        updatedCliente.id,
        updatedCliente
      );
      setClientes((prev) =>
        prev.map((cliente) =>
          cliente.id === updated.id ? { ...cliente, ...updated } : cliente
        )
      );
      addCustomer(updated);
      toast({
        className: "bg-green-500 text-white",
        title: "Cliente Atualizado",
        description: `${updated.name} foi atualizado com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast({
        className: "bg-red-500 text-white",
        title: "Erro ao atualizar cliente",
        description: "Não foi possível atualizar as informações do cliente.",
      });
    }
  };

  const handleDeleteCliente = async (id: string) => {
    try {
      await deleteClient(id);
      setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
      removeCustomer(id);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const handleToggleFavorite = async (client: Customer) => {
    const updatedCliente = { ...client, isFavorite: !client.isFavorite };
    try {
      const response = await updateClient(updatedCliente.id, updatedCliente);
      const updatedClient = response.client;
      addCustomer(updatedClient);
      setClientes((prev) =>
        prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
      );
      toast({
        className: updatedClient.isFavorite
          ? "bg-green-500 text-white"
          : "bg-yellow-500 text-white",
        title: updatedClient.isFavorite
          ? "Cliente Favorito"
          : "Cliente não é mais favorito",
        description: `${updatedClient.name} agora é favorito.`,
      });
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      toast({
        className: "bg-red-500 text-white",
        title: "Erro ao atualizar favorito",
        description: "Não foi possível atualizar o status de favorito.",
      });
    }
  };

  return {
    clientes,
    loading,
    handleCreateCliente,
    handleEditCliente,
    handleDeleteCliente,
    handleToggleFavorite,
  };
}
