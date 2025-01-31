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

    const novoCliente = {
      id: uuidv4(),
      nome,
      salario,
      empresa,
    };

    onCreateCliente(novoCliente);

    setNome("");
    setSalario("");
    setEmpresa("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-[#ec6724] hover:bg-orange-500 w-52 mt-8 min-w-full">
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
            className="bg-orange-500 w-full"
            onClick={handleCreateClient}
          >
            Criar Cliente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
