import React from 'react'
import { Trash2, AlertTriangle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Approvisionnement } from '../../../data/models/supplies'

interface DeleteSupplyDialogProps {
  supply: Approvisionnement
  onConfirm: (supply: Approvisionnement) => void
  onClose: () => void
}

export const DeleteSupplyDialog: React.FC<DeleteSupplyDialogProps> = ({
  supply,
  onConfirm,
  onClose
}) => {
  const handleConfirm = () => {
    onConfirm(supply)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-6 h-6" />
            <span>Supprimer l'approvisionnement</span>
          </DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet approvisionnement ?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations de l'approvisionnement */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Approvisionnement à supprimer :</h4>
            <p><strong>ID :</strong> #{supply.id}</p>
            <p><strong>Fournisseur :</strong> {supply.fournisseur}</p>
            <p><strong>Total :</strong> {supply.total} €</p>
            <p><strong>Date :</strong> {new Date(supply.dateAppro).toLocaleDateString()}</p>
            <p><strong>Articles :</strong> {supply.lignes?.length || 0}</p>
          </div>

          {/* Avertissement */}
          <div className="flex items-start space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              <strong>Attention :</strong> La suppression d'un approvisionnement peut affecter les stocks et l'historique.
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            style={{ 
              backgroundColor: 'var(--ubuntu-orange, #E95420)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer définitivement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}