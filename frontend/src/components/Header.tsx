import { Gem, Plus } from "lucide-react";

interface HeaderProps {
  isLoading: boolean;
  setIsFormVisible: (isVisible: boolean) => void;
}

export function Header({ isLoading, setIsFormVisible }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Gem className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Anéis Místicos</h1>
        </div>
        <button
          disabled={isLoading}
          onClick={() => setIsFormVisible(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50"
        >
          <Plus className="w-5 h-5" />
          Novo Anel
        </button>
      </div>
    </header>
  );
}
