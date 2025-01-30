import { useEffect } from "react";
import { Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClient } from "@/context/ClientContext";

export function ClientSelected() {
  const navigate = useNavigate();
  const { selectedCustomers, removeCustomer, clearCustomers } = useClient();

  useEffect(() => {
    if (selectedCustomers.length === 0) {
      navigate("/home");
    }
  }, [selectedCustomers, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Clientes selecionados:</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {selectedCustomers.map((cliente, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-bold">{cliente.nome}</h3>
            <p>Salário: {cliente.salario}</p>
            <p>Empresa: {cliente.empresa}</p>
            <button
              className="text-red-500 text-lg mt-2"
              onClick={() => removeCustomer(index)}
            >
              <Minus size={20} />
            </button>
          </div>
        ))}
      </div>

      {selectedCustomers.length > 0 && (
        <button
          onClick={clearCustomers}
          className="mt-6 w-full border p-2 text-orange-600"
        >
          Limpar clientes selecionados
        </button>
      )}
    </div>
  );
}
