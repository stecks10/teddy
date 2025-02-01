import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Customer } from "@/context/ClientContext";

interface CreateClientProps {
  onCreateCliente: (cliente: Customer) => void;
}

export function CreateClient({ onCreateCliente }: CreateClientProps) {
  const [nome, setNome] = useState("");
  const [salario, setSalario] = useState("");
  const [empresa, setEmpresa] = useState("");

  const handleCreateClient = () => {
    if (!nome || !salario || !empresa) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novoCliente: Customer = {
      id: uuidv4(),
      name: nome,
      salary: salario,
      companyValue: empresa,
      isFavorite: false,
    };

    onCreateCliente(novoCliente);

    setNome("");
    setSalario("");
    setEmpresa("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="border-2 border-orange-600 bg-white text-orange-600 hover:bg-orange-600 hover:text-white w-full">
          Criar Cliente
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Criar Cliente</AlertDialogTitle>
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
            className="border-orange-500 bg-orange-500 hover:bg-orange-500 hover:text-white w-full text-white"
            onClick={handleCreateClient}
          >
            Criar Cliente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
