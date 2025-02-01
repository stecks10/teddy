import { useState } from "react";
import { Edit, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Customer } from "@/context/ClientContext";

interface EditClientProps {
  client: Customer;
  onEditCliente: (cliente: Customer) => void;
}

export function EditClient({ client, onEditCliente }: EditClientProps) {
  const [nome, setNome] = useState(client.name);
  const [salario, setSalario] = useState(client.salary);
  const [empresa, setEmpresa] = useState(client.companyValue);

  const handleEditClient = () => {
    if (!nome || !salario || !empresa) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const editedClient: Customer = {
      ...client,
      name: nome,
      salary: salario,
      companyValue: empresa,
    };

    onEditCliente(editedClient);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Edit size={20} />
      </AlertDialogTrigger>

      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Editar Cliente</AlertDialogTitle>
            <AlertDialogCancel asChild>
              <button className="transition border-transparent">
                <X size={20} />
              </button>
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        <Input
          type="text"
          placeholder="Digite o nome"
          className="mb-2"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o salário"
          className="mb-2"
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o valor da empresa"
          className="mb-4"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />

        <AlertDialogFooter>
          <AlertDialogAction
            className="border-orange-500 bg-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white w-full bg-transparent"
            onClick={handleEditClient}
          >
            Editar Cliente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
