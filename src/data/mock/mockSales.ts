import { Vente, LigneVente, Facture, VenteStats } from '../models/sales';
import { mockProducts } from './mockProducts';
import { mockUsers } from './mockUsers';

const createSaleLines = (productIds: number[], quantities: number[], prixVente: number[]): LigneVente[] => {
  return productIds.map((productId, index) => ({
    id: index + 1,
    produitId: productId,
    produit: mockProducts.find(p => p.id === productId),
    venteId: 0, // Sera défini lors de la création
    quantite: quantities[index],
    prixVente: prixVente[index],
    totalLigne: quantities[index] * prixVente[index]
  }));
};

export const mockSales: Vente[] = [
  {
    id: 1,
    dateVente: new Date('2024-01-15T08:30:00'),
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    client: "M. Roger Tchoupa",
    total: 35000 + 65000,
    lignes: createSaleLines(
      [1, 3],
      [1, 1],
      [35000, 65000]
    ),
    numeroFacture: "FAC-2024-001",
    statut: "completed",
    dateCreation: new Date('2024-01-15T08:30:00')
  },
  {
    id: 2,
    dateVente: new Date('2024-01-15T10:15:00'),
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    client: "Mme. Claire Ngo",
    total: 450000 + 25000,
    lignes: createSaleLines(
      [2, 5],
      [1, 2],
      [450000, 25000]
    ),
    numeroFacture: "FAC-2024-002",
    statut: "completed",
    dateCreation: new Date('2024-01-15T10:15:00')
  },
  {
    id: 3,
    dateVente: new Date('2024-01-14T14:45:00'),
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    client: "M. Albert Fotso",
    total: 380000 + 75000 + 15000,
    lignes: createSaleLines(
      [7, 8, 10],
      [2, 3, 1],
      [380000, 75000, 15000]
    ),
    numeroFacture: "FAC-2024-003",
    statut: "completed",
    dateCreation: new Date('2024-01-14T14:45:00')
  },
  {
    id: 4,
    dateVente: new Date('2024-01-14T16:20:00'),
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    client: "Société ABC SARL",
    total: 35000 * 5 + 65000 * 2,
    lignes: createSaleLines(
      [1, 3],
      [5, 2],
      [35000, 65000]
    ),
    numeroFacture: "FAC-2024-004",
    statut: "completed",
    dateCreation: new Date('2024-01-14T16:20:00')
  },
  {
    id: 5,
    dateVente: new Date('2024-01-13T11:30:00'),
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    client: "M. Samuel Eto'o",
    total: 120000 + 40000,
    lignes: createSaleLines(
      [4, 6],
      [1, 1],
      [120000, 40000]
    ),
    numeroFacture: "FAC-2024-005",
    statut: "completed",
    dateCreation: new Date('2024-01-13T11:30:00')
  },
  {
    id: 6,
    dateVente: new Date('2024-01-13T15:10:00'),
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    client: "Mme. Linda Moukoko",
    total: 450000 + 25000,
    lignes: createSaleLines(
      [2, 5],
      [1, 1],
      [450000, 25000]
    ),
    numeroFacture: "FAC-2024-006",
    statut: "cancelled",
    dateCreation: new Date('2024-01-13T15:10:00')
  },
  {
    id: 7,
    dateVente: new Date('2024-01-12T09:45:00'),
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    client: "M. Joseph Kunde",
    total: 35000 * 2 + 65000,
    lignes: createSaleLines(
      [1, 3],
      [2, 1],
      [35000, 65000]
    ),
    numeroFacture: "FAC-2024-007",
    statut: "completed",
    dateCreation: new Date('2024-01-12T09:45:00')
  },
  {
    id: 8,
    dateVente: new Date('2024-01-12T13:20:00'),
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    client: "M. Michel Njitap",
    total: 380000 + 15000,
    lignes: createSaleLines(
      [7, 10],
      [1, 2],
      [380000, 15000]
    ),
    numeroFacture: "FAC-2024-008",
    statut: "completed",
    dateCreation: new Date('2024-01-12T13:20:00')
  }
];

// Mettre à jour les venteId dans les lignes
mockSales.forEach(sale => {
  sale.lignes.forEach(line => {
    line.venteId = sale.id;
  });
});

export const mockInvoices: Facture[] = [
  {
    id: 1,
    numero: "FAC-2024-001",
    dateEmission: new Date('2024-01-15T08:35:00'),
    venteId: 1,
    vente: mockSales[0],
    totalHT: 100000,
    totalTVA: 20000,
    totalTTC: 120000,
    statut: "paid",
    qrCode: "data:image/png;base64,mock-qr-code-1"
  },
  {
    id: 2,
    numero: "FAC-2024-002",
    dateEmission: new Date('2024-01-15T10:20:00'),
    venteId: 2,
    vente: mockSales[1],
    totalHT: 475000,
    totalTVA: 95000,
    totalTTC: 570000,
    statut: "paid",
    qrCode: "data:image/png;base64,mock-qr-code-2"
  },
  {
    id: 3,
    numero: "FAC-2024-003",
    dateEmission: new Date('2024-01-14T14:50:00'),
    venteId: 3,
    vente: mockSales[2],
    totalHT: 865000,
    totalTVA: 173000,
    totalTTC: 1038000,
    statut: "pending",
    qrCode: "data:image/png;base64,mock-qr-code-3"
  }
];

export const mockSalesStats: VenteStats = {
  chiffreAffaireTotal: 2450000,
  nombreVentes: 7,
  moyennePanier: 350000,
  produitsVendus: 18,
  meilleurClient: "M. Albert Fotso",
  periode: "Janvier 2024"
};