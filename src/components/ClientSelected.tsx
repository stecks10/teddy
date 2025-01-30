import { useEffect } from "react";
import { Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClientes } from "@/context/ClientContext";

export function ClientesSelecionados() {
  const navigate = useNavigate();
  const { clientesSelecionados, removeCliente, clearClientes } = useClientes();

  // 🔹 Redireciona para a home se não houver clientes
  useEffect(() => {
    if (clientesSelecionados.length === 0) {
      navigate("/home");
    }
  }, [clientesSelecionados, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Clientes selecionados:</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {clientesSelecionados.map((cliente, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-bold">{cliente.nome}</h3>
            <p>Salário: {cliente.salario}</p>
            <p>Empresa: {cliente.empresa}</p>
            <button
              className="text-red-500 text-lg mt-2"
              onClick={() => removeCliente(index)}
            >
              <Minus size={20} />
            </button>
          </div>
        ))}
      </div>

      {clientesSelecionados.length > 0 && (
        <button
          onClick={clearClientes}
          className="mt-6 w-full border p-2 text-orange-600"
        >
          Limpar clientes selecionados
        </button>
      )}
    </div>
  );
}
