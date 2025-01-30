import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function ClienteModal({ isOpen, onClose, onSave }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-left">Criar Cliente</h2>

        <Input type="text" placeholder="Digite o nome" className="mb-2" />
        <Input type="text" placeholder="Digite o salário" className="mb-2" />
        <Input
          type="text"
          placeholder="Digite o valor da empresa"
          className="mb-4"
        />

        <Button onClick={onSave} className="bg-orange-500 w-full">
          Criar Cliente
        </Button>
      </div>
    </div>
  );
}
