import { useForm } from "react-hook-form";
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

interface FormData {
  nome: string;
  salario: string;
  empresa: string;
}

export function CreateClient({ onCreateCliente }: CreateClientProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { nome, salario, empresa } = data;

    if (!nome || !salario || !empresa) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const salarioNum = parseFloat(salario.replace(/[^\d.-]/g, ""));
    const empresaNum = parseFloat(empresa.replace(/[^\d.-]/g, ""));

    if (isNaN(salarioNum) || isNaN(empresaNum)) {
      alert(
        "Por favor, insira valores válidos para o salário e o valor da empresa."
      );
      return;
    }

    const novoCliente: Customer = {
      id: uuidv4(),
      name: nome,
      salary: salarioNum.toString(),
      companyValue: empresaNum.toString(),
      isFavorite: false,
    };

    onCreateCliente(novoCliente);
    reset();
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Input
              type="text"
              placeholder="Digite o nome"
              {...register("nome", { required: "Nome é obrigatório" })}
            />
            {errors.nome && (
              <span className="text-red-500">{errors.nome.message}</span>
            )}
          </div>

          <div className="mb-2">
            <Input
              type="number"
              placeholder="Digite o salário"
              {...register("salario", {
                required: "Salário é obrigatório",
              })}
            />
            {errors.salario && (
              <span className="text-red-500">{errors.salario.message}</span>
            )}
          </div>

          <div className="mb-4">
            <Input
              type="number"
              placeholder="Digite o valor da empresa"
              {...register("empresa", {
                required: "Valor da empresa é obrigatório",
              })}
            />
            {errors.empresa && (
              <span className="text-red-500">{errors.empresa.message}</span>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogAction
              className="border-orange-500 bg-orange-500 hover:bg-orange-500 hover:text-white w-full text-white"
              type="submit"
            >
              Criar Cliente
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
