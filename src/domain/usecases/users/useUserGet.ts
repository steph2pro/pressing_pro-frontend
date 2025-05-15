import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../../services/useNotification";
import UserRepositoryImpl from "../../../data/repositories/UserRepositoryImpl";

export const useGetUserById = (
UserId: number,
  repository: UserRepositoryImpl
) => {
  const notify = useNotification();

  return useQuery(
    ["User", UserId], // Clé unique avec professionId
    async () => await repository.getUserById(UserId),
    {
      onSuccess: () => {
        notify.success(`User  fetched successfully!`);
      },
      onError: () => {
        notify.error("Failed to fetch User.");
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};
