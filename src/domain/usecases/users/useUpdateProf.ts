import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../../../services/useNotification";
import ProfessionRepositoryImpl from "../../../data/repositories/ProfessionRepositoryImpl";
import ProfessionRequest from "../../../data/models/ProfessionRequest";

export const useUpdateProfession = (repository: ProfessionRepositoryImpl) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation(
    async (profession: ProfessionRequest) =>
      await repository.updateProfession(
        profession
      ),
    {
      onSuccess: (updatedProfession) => {
        notify.success(`Profession "${updatedProfession.name}" updated successfully!`);
        // Invalidate queries related to professions to refresh data
        queryClient.invalidateQueries(["profession", updatedProfession.id]);
      },
      onError: () => {
        notify.error("Failed to update profession.");
      },
    }
  );
};
