import toast from "react-hot-toast";
import UserApi from "../../../data/datasources/UserApi";

export const logoutUseCase = async (userApi: UserApi): Promise<void> => {
  try {
    await userApi.logout();
    toast.success("👋 Déconnexion réussie !");
  } catch (error: any) {
    console.error("Erreur lors de la déconnexion :", error);
    const message = error?.response?.data?.error || "Erreur lors de la déconnexion";
    toast.error(message);
    throw error;
  }
};