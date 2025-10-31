import { useVentes } from './useVentes';
import { useCreateVente } from './useCreateVente';
import { useCancelVente } from './useCancelVente';
import { useVenteStats } from './useVenteStats';
import { useFactures } from './useFactures';

export const useSalesManagement = () => {
  const ventes = useVentes();
  const createVente = useCreateVente();
  const cancelVente = useCancelVente();
  const stats = useVenteStats();
  const factures = useFactures();

  return {
    // Ventes
    ventes: ventes.ventes,
    ventesLoading: ventes.isLoading,
    createVente: createVente.createVente,
    creatingVente: createVente.loading,
    cancelVente: cancelVente.cancelVente,
    cancellingVente: cancelVente.loading,
    
    // Statistiques
    stats: stats.stats,
    statsLoading: stats.isLoading,
    
    // Factures
    factures: factures.factures,
    facturesLoading: factures.isLoading,
    
    // Filtres et pagination
    updateVenteParams: ventes.updateParams,
    updateFactureParams: factures.updateParams,
  };
};