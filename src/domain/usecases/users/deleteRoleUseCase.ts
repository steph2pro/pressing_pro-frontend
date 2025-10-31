import UserApi from '../../../data/datasources/UserApi';

export const deleteRoleUseCase = async (
  userApi: UserApi,
  id: number
): Promise<void> => {
  try {
    await userApi.deleteRole(id);
  } catch (error: any) {
    console.error("Erreur lors de la suppression du rôle :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};