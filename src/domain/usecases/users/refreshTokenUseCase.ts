import toast from "react-hot-toast";
import UserApi from "../../../data/datasources/UserApi";

export const refreshTokenUseCase = async (
  refreshToken: string,
  userApi: UserApi
): Promise<{ accessToken: string }> => {
  try {
    return await userApi.refreshToken(refreshToken);
  } catch (error: any) {
    console.error("Erreur lors du rafraîchissement du token :", error);
    const message = error?.response?.data?.error || "Session expirée, veuillez vous reconnecter";
    toast.error(message);
    throw error;
  }
};