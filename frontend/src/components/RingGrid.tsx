import { Ring } from '../types/ring';
import { RingCard } from './RingCard';

interface RingGridProps {
  rings: Ring[];
  onEdit: (ring: Ring, ringId: string) => void;
  onDelete: (id: string) => void;
}

export function RingGrid({ rings, onEdit, onDelete }: RingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rings.map((ring) => (
        <RingCard
          key={ring.id}
          ring={ring}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}