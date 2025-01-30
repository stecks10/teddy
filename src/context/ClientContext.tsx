import { createContext, useContext, useState, ReactNode } from "react";

// Definição do tipo Cliente
interface Cliente {
  nome: string;
  salario: string;
  empresa: string;
}

interface ClientesContextType {
  clientesSelecionados: Cliente[];
  addCliente: (cliente: Cliente) => void;
  removeCliente: (index: number) => void;
  clearClientes: () => void;
}

// Criando o contexto
const ClientesContext = createContext<ClientesContextType | undefined>(
  undefined
);

// Provedor do contexto
export function ClientesProvider({ children }: { children: ReactNode }) {
  const [clientesSelecionados, setClientesSelecionados] = useState<Cliente[]>(
    []
  );

  const addCliente = (cliente: Cliente) => {
    setClientesSelecionados((prevClientes) => [...prevClientes, cliente]);
  };

  const removeCliente = (index: number) => {
    setClientesSelecionados((prevClientes) =>
      prevClientes.filter((_, i) => i !== index)
    );
  };

  const clearClientes = () => {
    setClientesSelecionados([]);
  };

  return (
    <ClientesContext.Provider
      value={{ clientesSelecionados, addCliente, removeCliente, clearClientes }}
    >
      {children}
    </ClientesContext.Provider>
  );
}

// Hook para acessar o contexto corretamente
export function useClientes() {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error("useClientes deve ser usado dentro de ClientesProvider");
  }
  return context;
}
