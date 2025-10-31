import SupplyApi from "../../../data/datasources/SupplyApi";
import { ApprovisionnementSearchParams } from "../../../data/models";

export interface SupplyStats {
  totalApprovisionnements: number;
  totalMontant: number;
  moyenneParApprovisionnement: number;
  approvisionnementsEnAttente: number;
  topFournisseurs: Array<{
    fournisseur: string;
    count: number;
    totalMontant: number;
  }>;
  evolutionMensuelle: Array<{
    mois: string;
    count: number;
    totalMontant: number;
  }>;
}

export const calculateSupplyStatsUseCase = async (
  params: ApprovisionnementSearchParams,
  supplyApi: SupplyApi
): Promise<SupplyStats> => {
  try {
    // Récupérer tous les approvisionnements (sans pagination)
    const allSupplies = await supplyApi.getSupplies({ ...params, limit: 1000 });
    
    const stats: SupplyStats = {
      totalApprovisionnements: allSupplies.total,
      totalMontant: allSupplies.data.reduce((sum, supply) => sum + supply.total, 0),
      moyenneParApprovisionnement: 0,
      approvisionnementsEnAttente: allSupplies.data.filter(s => s.statut === 'draft').length,
      topFournisseurs: [],
      evolutionMensuelle: []
    };
    
    // Calculer la moyenne
    stats.moyenneParApprovisionnement = stats.totalMontant / Math.max(stats.totalApprovisionnements, 1);
    
    // Calculer les top fournisseurs
    const fournisseursMap = new Map();
    allSupplies.data.forEach(supply => {
      const existing = fournisseursMap.get(supply.fournisseur) || { count: 0, totalMontant: 0 };
      fournisseursMap.set(supply.fournisseur, {
        count: existing.count + 1,
        totalMontant: existing.totalMontant + supply.total
      });
    });
    
    stats.topFournisseurs = Array.from(fournisseursMap.entries())
      .map(([fournisseur, data]) => ({ fournisseur, ...data }))
      .sort((a, b) => b.totalMontant - a.totalMontant)
      .slice(0, 5);
    
    // Calculer l'évolution mensuelle
    const moisMap = new Map();
    allSupplies.data.forEach(supply => {
      const mois = supply.dateAppro.toISOString().substring(0, 7); // YYYY-MM
      const existing = moisMap.get(mois) || { count: 0, totalMontant: 0 };
      moisMap.set(mois, {
        count: existing.count + 1,
        totalMontant: existing.totalMontant + supply.total
      });
    });
    
    stats.evolutionMensuelle = Array.from(moisMap.entries())
      .map(([mois, data]) => ({ mois, ...data }))
      .sort((a, b) => a.mois.localeCompare(b.mois));
    
    console.log("📊 Statistiques des approvisionnements calculées", stats);
    
    return stats;
  } catch (error: any) {
    console.error("Erreur lors du calcul des statistiques des approvisionnements :", error);
    const message = error?.response?.data?.error || "Erreur lors du calcul des statistiques";
    throw new Error(message);
  }
};