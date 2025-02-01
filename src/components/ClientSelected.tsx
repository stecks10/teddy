import { useClient } from "@/context/ClientContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus } from "lucide-react";
import { Header } from "@/components/Header";
import { useClients } from "@/hooks/useClients";

// Função para formatar números em BRL
const formatToBRL = (value: string | number) => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value; // Converte a string para número, se necessário
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
};

export function ClientSelected() {
  const { removeCustomer } = useClient();
  const { clientes, loading, handleClearFavorites, handleToggleFavorite } =
    useClients();
  const favoriteCustomers = clientes.filter((cliente) => cliente.selected);

  if (favoriteCustomers.length === 0 && !loading) {
    return (
      <>
        <Header />
        <div className="p-6">
          <p className="text-center text-gray-500">
            Nenhum cliente selecionado.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Clientes Selecionados:</h2>
          <span className="text-gray-700 text-lg font-medium">
            {favoriteCustomers.length} clientes encontrados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteCustomers.map((cliente, index) => (
            <Card key={index} className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-black">
                  {cliente.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Salário: {formatToBRL(cliente.salary)}
                </p>
                <p className="text-gray-600">
                  Empresa: {formatToBRL(cliente.companyValue)}
                </p>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"
                    onClick={() => {
                      removeCustomer(cliente.id);
                      handleToggleFavorite(cliente);
                    }}
                  >
                    <Minus size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {favoriteCustomers.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button
              className="border-orange-500 text-white hover:bg-orange-400 hover:text-white hover:border-orange-600 transition-colors duration-200 w-full bg-orange-600"
              onClick={handleClearFavorites}
            >
              Limpar clientes selecionados
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
