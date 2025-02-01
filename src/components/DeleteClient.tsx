import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2, X } from "lucide-react";

interface DeleteClientModalProps {
  nome: string;
  onDelete: () => void;
}

export function DeleteClientModal({ nome, onDelete }: DeleteClientModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-lg text-red-500">
          <Trash2 size={20} />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-full sm:w-96">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Excluir Cliente</AlertDialogTitle>
            <AlertDialogCancel asChild>
              <button className="transition border-transparent">
                <X size={20} />
              </button>
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription>
          Você está prestes a excluir o cliente: <strong>{nome}</strong>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-red-500 text-white w-full sm:w-auto"
            onClick={onDelete}
          >
            Excluir Cliente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
