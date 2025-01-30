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

export function ClienteModal() {
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

        <Input type="text" placeholder="Digite o nome" className="mb-2" />
        <Input type="text" placeholder="Digite o salário" className="mb-2" />
        <Input
          type="text"
          placeholder="Digite o valor da empresa"
          className="mb-4"
        />

        <AlertDialogFooter>
          <AlertDialogAction className="bg-orange-500 w-full">
            Criar Cliente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
