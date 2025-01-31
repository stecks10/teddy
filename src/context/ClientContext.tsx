import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Customer {
  id: string;
  nome: string;
  salario: string;
  empresa: string;
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
    const savedCustomers = localStorage.getItem("selectedCustomers");
    return savedCustomers ? JSON.parse(savedCustomers) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "selectedCustomers",
      JSON.stringify(selectedCustomers)
    );
  }, [selectedCustomers]);

  const addCustomer = (customer: Customer) => {
    setSelectedCustomers((prevCustomers) => {
      const clienteJaExiste = prevCustomers.some((c) => c.id === customer.id);
      if (!clienteJaExiste) {
        return [...prevCustomers, customer];
      }
      return prevCustomers;
    });
  };

  const removeCustomer = (id: string) => {
    setSelectedCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== id)
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
