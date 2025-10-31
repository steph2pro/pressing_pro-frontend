import React from 'react'
import { Trash2, AlertTriangle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCancelVente } from '../../../presentation/hooks/sales/useCancelVente'
import { Vente } from '../../../data/models/sales'

interface CancelVenteDialogProps {
  vente: Vente
  onConfirm: (vente: Vente) => void
  onClose: () => void
  variant?: 'default' | 'outline'
}

export const CancelVenteDialog: React.FC<CancelVenteDialogProps> = ({
  vente,
  onConfirm,
  onClose,
  variant = 'default'
}) => {
  const { cancelVente, loading, error } = useCancelVente()

  const handleConfirm = async () => {
    const result = await cancelVente(vente.id)
    if (result) {
      onConfirm(vente)
    }
  }

  const buttonContent = (
    <>
      <Trash2 className="w-4 h-4 mr-2" />
      Annuler la vente
    </>
  )

  return (
    <>
      {variant === 'outline' ? (
        <Button variant="outline" onClick={onClose} className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
          {buttonContent}
        </Button>
      ) : (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-6 h-6" />
                <span>Annuler la vente</span>
              </DialogTitle>
              <DialogDescription>
                Cette action est irréversible. Êtes-vous sûr de vouloir annuler cette vente ?
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Informations de la vente */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 mb-2">Vente à annuler :</h4>
                <p><strong>ID :</strong> #{vente.id}</p>
                <p><strong>Client :</strong> {vente.client || 'Non spécifié'}</p>
                <p><strong>Total :</strong> {vente.total} €</p>
                <p><strong>Date :</strong> {new Date(vente.dateVente).toLocaleDateString()}</p>
              </div>

              {/* Avertissement */}
              <div className="flex items-start space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Attention :</strong> L'annulation d'une vente peut affecter les statistiques et l'inventaire.
                </span>
              </div>

              {/* Message d'erreur */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                style={{ 
                  backgroundColor: 'var(--ubuntu-orange, #E95420)',
                  color: 'var(--ubuntu-white, #FFFFFF)'
                }}
              >
                {loading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Annuler définitivement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}