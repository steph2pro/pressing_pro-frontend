import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../../services/useNotification";
import UserRepositoryImpl from "../../../data/repositories/UserRepositoryImpl";

export const useDeleteUser = (
  UserId: number,
  repository: UserRepositoryImpl
) => {
  const notify = useNotification();

  return useMutation(
    async () => await repository.deleteUser(UserId),
    {
      onSuccess: () => {
        notify.success(`User deleted successfully!`);
      },
      onError: () => {
        notify.error("Failed to delete User.");
      },
    }
  );
};
