import "./index.css";
import { Button } from "./components/ui/button";

export function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello
      <Button className="bg-slate-800 text-white" />
    </h1>
  );
}
