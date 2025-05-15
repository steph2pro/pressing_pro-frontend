import { Client } from "./Client";
import { Utilisateur } from "./Utilisateur ";
import { Vetement } from "./Vetement";

export interface Depot {
  id_depot: number;
  date_depot: string;
  client: Client;
  utilisateur: Utilisateur;
  vetements: Vetement[];
  
}
