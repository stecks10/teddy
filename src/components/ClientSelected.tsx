import { useClient } from "@/context/ClientContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus } from "lucide-react";
import { Header } from "@/components/Header";
import { useClients } from "@/hooks/useClients";

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
      <div className="p-6">
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
                <p className="text-gray-600">Salário: {cliente.salary}</p>
                <p className="text-gray-600">Empresa: {cliente.companyValue}</p>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
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
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white w-full sm:w-auto"
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
