import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClient } from "@/context/ClientContext";

export function ClientSelected() {
  const { selectedCustomers, removeCustomer } = useClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCustomers.length === 0) {
      navigate("/home");
    }
  }, [selectedCustomers, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Clientes Selecionados</h2>

      <div className="grid grid-cols-4 gap-4">
        {selectedCustomers.map((cliente, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-bold">{cliente.nome}</h3>
            <p>Salário: {cliente.salario}</p>
            <p>Empresa: {cliente.empresa}</p>
            <button
              onClick={() => removeCustomer(cliente.id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Remover Cliente
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
