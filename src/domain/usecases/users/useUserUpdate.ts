import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../../../services/useNotification";
import UserRepositoryImpl from "../../../data/repositories/UserRepositoryImpl";
import UserRequest from "../../../data/models/UserRequest";

export const useUpdateUser = (repository: UserRepositoryImpl) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation(
    async (user: UserRequest) =>
      await repository.updateUser(
        user
      ),
    {
      onSuccess: (updatedUser) => {
        notify.success(`User updated successfully!`);
        // Invalidate queries related to User to refresh data
        queryClient.invalidateQueries(["user", updatedUser.id]);
      },
      onError: () => {
        notify.error("Failed to update User.");
      },
    }
  );
};
