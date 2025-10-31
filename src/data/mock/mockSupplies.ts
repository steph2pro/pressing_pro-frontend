import { Approvisionnement, LigneApprovisionnement, Fournisseur } from '../models/supplies';
import { mockProducts } from './mockProducts';

export const mockFournisseurs: Fournisseur[] = [
  {
    id: 1,
    nom: "Cameroon Airlines",
    contact: "M. Jean Ndongo",
    telephone: "+237 233 401 000",
    email: "contact@cameroon-airlines.cm",
    adresse: "Aéroport International de Douala",
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 2,
    nom: "Air France",
    contact: "Mme. Sophie Martin",
    telephone: "+237 233 421 000",
    email: "reservations.dla@airfrance.fr",
    adresse: "Aéroport International de Douala",
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 3,
    nom: "Hilton Hotels",
    contact: "M. Paul Johnson",
    telephone: "+237 222 231 000",
    email: "reservations@hilton-yaounde.cm",
    adresse: "Boulevard du 20 Mai, Yaoundé",
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 4,
    nom: "Ambassade de France",
    contact: "Service des Visas",
    telephone: "+237 222 201 000",
    email: "visas.yaounde-amba@diplomatie.gouv.fr",
    adresse: "Immeuble Rose, Yaoundé",
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 5,
    nom: "AXA Cameroun",
    contact: "M. David Mbarga",
    telephone: "+237 233 441 000",
    email: "assurances@axa.cm",
    adresse: "Bonanjo, Douala",
    dateCreation: new Date('2024-01-01T08:00:00')
  }
];

const createSupplyLines = (productIds: number[], quantities: number[], prixAchat: number[], prixVente: number[]): LigneApprovisionnement[] => {
  return productIds.map((productId, index) => ({
    id: index + 1,
    produitId: productId,
    produit: mockProducts.find(p => p.id === productId),
    approvisionnementId: 0, // Sera défini lors de la création
    quantite: quantities[index],
    prixAchat: prixAchat[index],
    prixVente: prixVente[index],
    totalLigne: quantities[index] * prixAchat[index]
  }));
};

export const mockSupplies: Approvisionnement[] = [
  {
    id: 1,
    fournisseur: "Cameroon Airlines",
    dateAppro: new Date('2024-01-10T09:00:00'),
    utilisateurId: 1,
    utilisateur: { id: 1, nom: "Patrick Travel" },
    lignes: createSupplyLines(
      [1, 7],
      [50, 20],
      [25000, 280000],
      [35000, 380000]
    ),
    total: 50 * 25000 + 20 * 280000,
    statut: "validated",
    dateCreation: new Date('2024-01-10T08:30:00')
  },
  {
    id: 2,
    fournisseur: "Air France",
    dateAppro: new Date('2024-01-11T10:30:00'),
    utilisateurId: 2,
    utilisateur: { id: 2, nom: "Marie Dupont" },
    lignes: createSupplyLines(
      [2],
      [30],
      [350000],
      [450000]
    ),
    total: 30 * 350000,
    statut: "validated",
    dateCreation: new Date('2024-01-11T10:00:00')
  },
  {
    id: 3,
    fournisseur: "Hilton Hotels",
    dateAppro: new Date('2024-01-12T14:15:00'),
    utilisateurId: 3,
    utilisateur: { id: 3, nom: "Jean Kamga" },
    lignes: createSupplyLines(
      [3, 8],
      [40, 25],
      [45000, 55000],
      [65000, 75000]
    ),
    total: 40 * 45000 + 25 * 55000,
    statut: "validated",
    dateCreation: new Date('2024-01-12T13:45:00')
  },
  {
    id: 4,
    fournisseur: "Ambassade de France",
    dateAppro: new Date('2024-01-13T11:20:00'),
    utilisateurId: 1,
    utilisateur: { id: 1, nom: "Patrick Travel" },
    lignes: createSupplyLines(
      [4],
      [15],
      [80000],
      [120000]
    ),
    total: 15 * 80000,
    statut: "validated",
    dateCreation: new Date('2024-01-13T10:50:00')
  },
  {
    id: 5,
    fournisseur: "AXA Cameroun",
    dateAppro: new Date('2024-01-14T16:45:00'),
    utilisateurId: 4,
    utilisateur: { id: 4, nom: "Alice Mbappe" },
    lignes: createSupplyLines(
      [5, 10],
      [60, 40],
      [15000, 8000],
      [25000, 15000]
    ),
    total: 60 * 15000 + 40 * 8000,
    statut: "draft",
    dateCreation: new Date('2024-01-14T16:15:00')
  },
  {
    id: 6,
    fournisseur: "Turkish Airlines",
    dateAppro: new Date('2024-01-15T09:30:00'),
    utilisateurId: 2,
    utilisateur: { id: 2, nom: "Marie Dupont" },
    lignes: createSupplyLines(
      [7],
      [25],
      [280000],
      [380000]
    ),
    total: 25 * 280000,
    statut: "draft",
    dateCreation: new Date('2024-01-15T09:00:00')
  }
];

// Mettre à jour les approvisionnementId dans les lignes
mockSupplies.forEach(supply => {
  supply.lignes.forEach(line => {
    line.approvisionnementId = supply.id;
  });
});