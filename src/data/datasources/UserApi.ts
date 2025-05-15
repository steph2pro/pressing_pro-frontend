import axios from "axios";
import UserResponse from "../models/userResponse";

const BASE_URL = "https://react-admin-ui-v1-api.vercel.app/users";

export default class UserApi {
  /**
   * Récupère la liste complète des utilisateurs.
   */
  async fetchUsers(): Promise<UserResponse[]> {
    try {
      const response = await axios.get<UserResponse[]>(BASE_URL);
      console.log("axios get all users:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      throw error;
    }
  }

  /**
   * Récupère un utilisateur par son ID.
   * @param id L'identifiant de l'utilisateur
   */
  async fetchSingleUser(id: string): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      console.log("axios get single user:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id} :`, error);
      throw error;
    }
  }
}
