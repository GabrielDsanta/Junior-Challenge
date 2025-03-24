import { useMutation, useQuery } from "react-query";
import { RingService } from "../services/RingService";
import { Ring, RingCreateSchema } from "../types/ring";

export const useRing = () => {
  const createRing = useMutation(
    async ({ ring }: { ring: RingCreateSchema }) => {
      const { data, success, error } = await RingService.createRing(ring);

      return { data, success, error };
    }
  );

  const updateRing = useMutation(
    async ({ ring, ringId }: { ring: RingCreateSchema, ringId: string }) => {
      const { data, success, error } = await RingService.updateRing(ring, ringId);

      return { data, success, error };
    }
  );

  const deleteRing = useMutation(
    async ({ ringId }: { ringId: string }) => {
      const { data, success, error } = await RingService.deleteRing(ringId);

      return { data, success, error };
    }
  );

  const getRings = useQuery<Ring[]>(["getRings"], async () => {
    const { success, data, error } = await RingService.getRings();

    if (success) {
      return data;
    }

    throw error;
  });

  return {
    createRing,
    getRings,
    deleteRing,
    updateRing
  };
};
