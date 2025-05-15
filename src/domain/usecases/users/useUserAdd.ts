import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../../services/useNotification";
import UserRequest from "../../../data/models/UserRequest";
import UserRepositoryImpl from "../../../data/repositories/UserRepositoryImpl";



export const useAddUser = (repository:UserRepositoryImpl) => {
  const notify = useNotification();

  return useMutation(
    async (user:UserRequest) => {
      // Appelle la méthode pour créer une User via le repository
      return await repository.createUser(user);
    },
    {
      onSuccess: () => {
        // Affiche une notification de succès
        notify.success("User créée avec succès !");
      },
      onError: (error: Error) => {
        // Affiche une notification d'erreur avec les détails
        notify.error(`La création a échoué : ${error.message}`);
      },
    }
  );
};
