import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      localStorage.setItem("username", username);
      navigate("/home");
    } else {
      alert("Digite o seu nome");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-2xl mb-4">Olá, seja bem-vindo!</h1>
      <Input
        type="text"
        placeholder="Digite o seu nome"
        className="mb-4 w-52"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        onClick={handleLogin}
        className="bg-[#ec6724] hover:bg-orange-500 w-52"
      >
        Entrar
      </Button>
    </div>
  );
}
