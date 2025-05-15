import {useMutation} from "@tanstack/react-query";
import UserRepositoryImpl from "../../../data/repositories/UserRepositoryImpl";
import UserPorps from "../../../data/models/User";
import {useNotification} from "../../../services/useNotification";

export const useLogin = (repository: UserRepositoryImpl) => {
    const notify = useNotification()
    // return useMutation(async () => {
    //     return await repository.login();
    // }, {
    //     onSuccess: () => {
    //         notify.success("Created Correctly!");
    //     },
    //     onError: () => {
    //         notify.error("Something goes wrong..");
    //     },
    return useMutation<UserPorps, Error, { identifier: string; password: string }>(
        async ({ identifier, password }) => {
          // Appelle la méthode login du repository avec les paramètres nécessaires
          const response = await repository.login(identifier, password);
          return response;
        },
        {
          onSuccess: (data) => {
              // Sauvegarder les informations utilisateur et token d'accès dans localStorage (ou dans votre gestion de session préférée)
            localStorage.setItem("user", JSON.stringify(data)); // Sauvegarde de l'utilisateur
            // console.log(data)
            // Sauvegarde du token d'accès dans localStorage (assurez-vous de l'ajouter dans la réponse du backend)
            if (data.access_token) {
              localStorage.setItem("access_token", data.access_token);
            }
            console.log(data)
            // Notification en cas de succès
            notify.success("Logged in successfully!");
          },
          onError: (error) => {
            // Notification en cas d'erreur avec le détail
            notify.error(`Login failed: information incorect`);
          },
    });

};
