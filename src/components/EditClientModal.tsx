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

interface EditClientModalProps {
  nome: string;
  salario: string;
  empresa: string;
}

export function EditClientModal({
  nome,
  salario,
  empresa,
}: EditClientModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-lg">
          <Edit size={20} />
        </button>
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

        <Input type="text" defaultValue={nome} className="mb-2" />
        <Input type="text" defaultValue={salario} className="mb-2" />
        <Input type="text" defaultValue={empresa} className="mb-4" />

        <AlertDialogFooter>
          <AlertDialogAction className="bg-orange-500 w-full">
            Editar Cliente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
