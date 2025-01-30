import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Login } from "./screens/Login";
import { Clientes } from "./screens/Clientes";
import { Toaster } from "@/components/ui/toaster";
import { ClientProvider } from "./context/ClientContext";
import { ClientSelected } from "./components/ClientSelected";

export function App() {
  return (
    <ClientProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Clientes />} />
          <Route path="/clientes-selecionados" element={<ClientSelected />} />
        </Routes>
      </Router>
    </ClientProvider>
  );
}
