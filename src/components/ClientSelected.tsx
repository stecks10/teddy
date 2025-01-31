import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClient } from "@/context/ClientContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Header } from "@/components/Header";

export function ClientSelected() {
  const { selectedCustomers, removeCustomer, clearCustomers } = useClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCustomers.length === 0) {
      navigate("/home");
    }
  }, [selectedCustomers, navigate]);

  return (
    <>
      <Header />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Clientes Selecionados:</h2>
          <span className="text-gray-700 text-lg font-medium">
            {selectedCustomers.length} clientes encontrados
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {selectedCustomers.map((cliente, index) => (
            <Card key={index} className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-black">
                  {cliente.nome}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Salário: {cliente.salario}</p>
                <p className="text-gray-600">Empresa: {cliente.empresa}</p>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => removeCustomer(cliente.id)}
                  >
                    <Trash size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botão de limpar todos os clientes */}
        {selectedCustomers.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white w-full"
              onClick={clearCustomers}
            >
              Limpar clientes selecionados
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
