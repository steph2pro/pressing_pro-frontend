import { Depot } from "./Depot";

export interface Facture {
  id_facture: number;
  date_facturation: string;
  depot: Depot;
}
