import { createContext, useContext, useState, ReactNode } from "react";

export interface Customer {
  id: string;
  name: string;
  salary: string;
  companyValue: string;
  isFavorite: boolean;
}

interface ClientContextType {
  selectedCustomers: Customer[];
  addCustomer: (customer: Customer) => void;
  removeCustomer: (id: string) => void;
  clearCustomers: () => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>(() => {
    const storedCustomers = localStorage.getItem("selectedCustomers");
    return storedCustomers ? JSON.parse(storedCustomers) : [];
  });

  const addCustomer = (customer: Customer) => {
    setSelectedCustomers((prevCustomers) => {
      const clienteJaExiste = prevCustomers.some((c) => c.id === customer.id);
      if (!clienteJaExiste) {
        const updatedCustomers = [...prevCustomers, customer];
        localStorage.setItem(
          "selectedCustomers",
          JSON.stringify(updatedCustomers)
        );
        return updatedCustomers;
      }
      return prevCustomers;
    });
  };

  const removeCustomer = (id: string) => {
    setSelectedCustomers((prevCustomers) => {
      const updatedCustomers = prevCustomers.filter(
        (customer) => customer.id !== id
      );
      localStorage.setItem(
        "selectedCustomers",
        JSON.stringify(updatedCustomers)
      );
      return updatedCustomers;
    });
  };

  const clearCustomers = () => {
    setSelectedCustomers([]);
    localStorage.removeItem("selectedCustomers");
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
