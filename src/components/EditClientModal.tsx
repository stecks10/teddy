import { useState, useEffect } from "react";
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
import { Edit, X } from "lucide-react";
import { Customer } from "@/context/ClientContext";

interface EditClientModalProps {
  cliente: Customer;
  onSave: (updatedCliente: Customer) => void;
}

export function EditClientModal({ cliente, onSave }: EditClientModalProps) {
  const [nomeCliente, setNomeCliente] = useState(cliente?.nome || "");
  const [salarioCliente, setSalarioCliente] = useState(cliente?.salario || "");
  const [empresaCliente, setEmpresaCliente] = useState(cliente?.empresa || "");

  useEffect(() => {
    setNomeCliente(cliente.nome);
    setSalarioCliente(cliente.salario);
    setEmpresaCliente(cliente.empresa);
  }, [cliente]);

  // Função chamada ao salvar as edições
  const handleSaveCliente = () => {
    if (typeof onSave === "function") {
      const updatedCliente = {
        ...cliente,
        nome: nomeCliente,
        salario: salarioCliente,
        empresa: empresaCliente,
      };

      onSave(updatedCliente);
    } else {
      console.error("Erro: onSave não é uma função válida!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-lg">
          <Edit size={20} />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-96" aria-describedby="edit-dialog">
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
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          value={salarioCliente}
          onChange={(e) => setSalarioCliente(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          value={empresaCliente}
          onChange={(e) => setEmpresaCliente(e.target.value)}
          className="mb-4"
        />

        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-orange-500 w-full"
            onClick={handleSaveCliente}
          >
            Salvar Edição
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
