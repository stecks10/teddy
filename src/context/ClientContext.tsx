import { createContext, useContext, useState, ReactNode } from "react";

interface Customer {
  nome: string;
  salario: string;
  empresa: string;
}

interface ClientContextType {
  selectedCustomers: Customer[];
  addCustomer: (customer: Customer) => void;
  removeCustomer: (index: number) => void;
  clearCustomers: () => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

  const addCustomer = (customer: Customer) => {
    setSelectedCustomers((prevCustomers) => [...prevCustomers, customer]);
  };

  const removeCustomer = (index: number) => {
    setSelectedCustomers((prevCustomers) =>
      prevCustomers.filter((_, i) => i !== index)
    );
  };

  const clearCustomers = () => {
    setSelectedCustomers([]);
  };

  return (
    <ClientContext.Provider
      value={{ selectedCustomers, addCustomer, removeCustomer, clearCustomers }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient deve ser usado dentro de ClientProvider");
  }
  return context;
}
