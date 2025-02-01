import { useForm } from "react-hook-form";
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

interface FormData {
  nome: string;
  salario: string;
  empresa: string;
}

export function EditClient({ client, onEditCliente }: EditClientProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      nome: client.name,
      salario: client.salary,
      empresa: client.companyValue,
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data.nome || !data.salario || !data.empresa) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const editedClient: Customer = {
      ...client,
      name: data.nome,
      salary: data.salario,
      companyValue: data.empresa,
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Input
              type="text"
              placeholder="Digite o nome"
              className="mb-2"
              {...register("nome", { required: "Nome é obrigatório" })}
            />
            {errors.nome && (
              <span className="text-red-500">{errors.nome.message}</span>
            )}
          </div>

          <div className="mb-2">
            <Input
              type="text"
              placeholder="Digite o salário"
              className="mb-2"
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
              type="text"
              placeholder="Digite o valor da empresa"
              className="mb-4"
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
              className="border-orange-500 bg-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white w-full bg-transparent"
              type="submit"
              disabled={!isDirty || !isValid}
            >
              Editar Cliente
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
