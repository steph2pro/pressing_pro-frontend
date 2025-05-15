
import { Utilisateur } from "./Utilisateur ";
export interface Retrait {
  id_retrait: number;
  date_retrait: string;
  statut: string;
  utilisateur: Utilisateur;
}