import { useState, useEffect } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../service/api";
import { Customer, useClient } from "@/context/ClientContext"; // Importando o hook useClient
import { toast } from "./use-toast";

export function useClients() {
  const { addCustomer } = useClient(); // Obtendo a função addCustomer do contexto
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
      setClientes((prev) => [...prev, newCliente]); // Adiciona o cliente ao estado imediatamente após a criação
      const updatedClientes = await getClients();
      setClientes(updatedClientes);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  const handleEditCliente = async (updatedCliente: Customer) => {
    try {
      // Atualiza o cliente na API
      const updated = await updateClient(updatedCliente.id, updatedCliente);

      // Atualiza o cliente no estado local imediatamente após a edição
      setClientes((prev) =>
        prev.map((cliente) =>
          cliente.id === updated.id ? { ...cliente, ...updated } : cliente
        )
      );

      // Atualiza o estado global (Contexto) através da função addCustomer
      addCustomer(updated);

      // Exibe um toast de sucesso
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
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const handleToggleFavorite = async (client: Customer) => {
    const updatedCliente = { ...client, isFavorite: !client.isFavorite };

    try {
      // Atualizando a API
      await updateClient(updatedCliente.id, updatedCliente);

      // Atualizando o estado local
      setClientes((prev) =>
        prev.map((c) => (c.id === client.id ? updatedCliente : c))
      );

      if (updatedCliente.isFavorite) {
        toast({
          className: "bg-green-500 text-white",
          title: "Cliente Favorito",
          description: `${updatedCliente.name} agora é favorito.`,
        });
      } else {
        toast({
          className: "bg-yellow-500 text-white",
          title: "Cliente não é mais favorito",
          description: `${updatedCliente.name} não é mais favorito.`,
        });
      }
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
