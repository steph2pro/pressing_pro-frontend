import { Produit, Categorie, AlerteStock } from '../models/products';

export const mockCategories: Categorie[] = [
  {
    id: 1,
    nom: "Billets d'avion",
    description: "Billets d'avion nationaux et internationaux",
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 2,
    nom: "Réservations hôtel",
    description: "Réservations d'hôtels et hébergements",
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 3,
    nom: "Visa et documents",
    description: "Services de visa et documents de voyage",
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 4,
    nom: "Assurances voyage",
    description: "Assurances voyage et annulation",
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 5,
    nom: "Excursions",
    description: "Excursions et activités touristiques",
    dateCreation: new Date('2024-01-01T08:00:00')
  }
];

export const mockProducts: Produit[] = [
  {
    id: 1,
    nom: "Billet Yaoundé-Douala",
    categorieId: 1,
    categorie: mockCategories[0],
    marque: "Cameroon Airlines",
    reference: "B-YDE-DLA-001",
    quantite: 45,
    prixAchat: 25000,
    prixVente: 35000,
    unite: "billet",
    seuilAlerte: 10,
    fournisseur: "Cameroon Airlines",
    description: "Billet économique Yaoundé vers Douala",
    image: "/images/billet-yde-dla.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-01T09:00:00')
  },
  {
    id: 2,
    nom: "Billet Douala-Paris",
    categorieId: 1,
    categorie: mockCategories[0],
    marque: "Air France",
    reference: "B-DLA-CDG-001",
    quantite: 25,
    prixAchat: 350000,
    prixVente: 450000,
    unite: "billet",
    seuilAlerte: 5,
    fournisseur: "Air France",
    description: "Billet économique Douala vers Paris CDG",
    image: "/images/billet-dla-cdg.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-01T09:15:00')
  },
  {
    id: 3,
    nom: "Hôtel Hilton Yaoundé",
    categorieId: 2,
    categorie: mockCategories[1],
    marque: "Hilton",
    reference: "H-HIL-YDE-001",
    quantite: 30,
    prixAchat: 45000,
    prixVente: 65000,
    unite: "nuit",
    seuilAlerte: 8,
    fournisseur: "Hilton Hotels",
    description: "Chambre standard pour une nuit",
    image: "/images/hotel-hilton.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-02T10:00:00')
  },
  {
    id: 4,
    nom: "Visa Touristique France",
    categorieId: 3,
    categorie: mockCategories[2],
    marque: "Ambassade France",
    reference: "V-FRA-001",
    quantite: 8,
    prixAchat: 80000,
    prixVente: 120000,
    unite: "visa",
    seuilAlerte: 3,
    fournisseur: "Ambassade de France",
    description: "Visa touristique Schengen pour la France",
    image: "/images/visa-france.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-03T11:00:00')
  },
  {
    id: 5,
    nom: "Assurance Voyage Gold",
    categorieId: 4,
    categorie: mockCategories[3],
    marque: "AXA Assurance",
    reference: "A-AXA-GOLD-001",
    quantite: 50,
    prixAchat: 15000,
    prixVente: 25000,
    unite: "assurance",
    seuilAlerte: 15,
    fournisseur: "AXA Cameroun",
    description: "Assurance voyage complète avec annulation",
    image: "/images/assurance-axa.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-04T14:00:00')
  },
  {
    id: 6,
    nom: "Excursion Mont Cameroun",
    categorieId: 5,
    categorie: mockCategories[4],
    marque: "Cameroon Tours",
    reference: "E-MT-CAM-001",
    quantite: 3,
    prixAchat: 25000,
    prixVente: 40000,
    unite: "excursion",
    seuilAlerte: 2,
    fournisseur: "Cameroon Adventure",
    description: "Excursion guidée au Mont Cameroun",
    image: "/images/excursion-mt-cam.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-05T15:30:00')
  },
  {
    id: 7,
    nom: "Billet Douala-Istanbul",
    categorieId: 1,
    categorie: mockCategories[0],
    marque: "Turkish Airlines",
    reference: "B-DLA-IST-001",
    quantite: 18,
    prixAchat: 280000,
    prixVente: 380000,
    unite: "billet",
    seuilAlerte: 5,
    fournisseur: "Turkish Airlines",
    description: "Billet économique Douala vers Istanbul",
    image: "/images/billet-dla-ist.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-06T16:45:00')
  },
  {
    id: 8,
    nom: "Hôtel Radisson Blu Douala",
    categorieId: 2,
    categorie: mockCategories[1],
    marque: "Radisson",
    reference: "H-RAD-DLA-001",
    quantite: 22,
    prixAchat: 55000,
    prixVente: 75000,
    unite: "nuit",
    seuilAlerte: 6,
    fournisseur: "Radisson Hotel Group",
    description: "Chambre deluxe pour une nuit",
    image: "/images/hotel-radisson.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-07T17:20:00')
  },
  {
    id: 9,
    nom: "Visa USA Touristique",
    categorieId: 3,
    categorie: mockCategories[2],
    marque: "Ambassade USA",
    reference: "V-USA-001",
    quantite: 2,
    prixAchat: 120000,
    prixVente: 180000,
    unite: "visa",
    seuilAlerte: 2,
    fournisseur: "Ambassade des USA",
    description: "Visa B2 touristique pour les USA",
    image: "/images/visa-usa.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-08T18:00:00')
  },
  {
    id: 10,
    nom: "Assurance Voyage Basic",
    categorieId: 4,
    categorie: mockCategories[3],
    marque: "Allianz",
    reference: "A-ALL-BASIC-001",
    quantite: 35,
    prixAchat: 8000,
    prixVente: 15000,
    unite: "assurance",
    seuilAlerte: 10,
    fournisseur: "Allianz Cameroun",
    description: "Assurance voyage basique",
    image: "/images/assurance-allianz.jpg",
    statut: "active",
    dateCreation: new Date('2024-01-09T19:15:00')
  }
];

export const mockStockAlerts: AlerteStock[] = [
  {
    produit: mockProducts[5], // Excursion Mont Cameroun
    quantiteActuelle: 3,
    seuilAlerte: 2,
    niveau: "faible",
    dateAlerte: new Date('2024-01-15T08:00:00')
  },
  {
    produit: mockProducts[8], // Visa USA
    quantiteActuelle: 2,
    seuilAlerte: 2,
    niveau: "critique",
    dateAlerte: new Date('2024-01-15T09:30:00')
  },
  {
    produit: mockProducts[3], // Visa France
    quantiteActuelle: 8,
    seuilAlerte: 3,
    niveau: "faible",
    dateAlerte: new Date('2024-01-14T14:15:00')
  }
];