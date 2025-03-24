import { useState } from "react";
import { Ring } from "../types/ring";
import { Edit2, Trash2 } from "lucide-react";

interface RingCardProps {
  ring: Ring;
  onEdit: (ring: Ring, ringId: string) => void;
  onDelete: (id: string) => void;
}

export function RingCard({ ring, onEdit, onDelete }: RingCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(ring.id);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={ring.imageUri}
        alt={ring.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{ring.name}</h3>
        <p className="text-gray-600 mb-4">{ring.power}</p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Portador:</span> {ring.bearer}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Forjado por:</span> {ring.forger}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(ring, ring.id)}
            className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Confirmar exclusão
            </h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o anel <strong>{ring.name}</strong>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
