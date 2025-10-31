import React from 'react'
import { Trash2, AlertTriangle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Produit } from '../../../data/models/products'
import { formatCurrency } from '../../../lib/utils'

interface DeleteProductDialogProps {
  product: Produit
  onConfirm: (product: Produit) => void
  onClose: () => void
}

export const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  product,
  onConfirm,
  onClose
}) => {
  const handleConfirm = () => {
    onConfirm(product)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-6 h-6" />
            <span>Supprimer le produit</span>
          </DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce produit ?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations du produit */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Produit à supprimer :</h4>
            <p><strong>Nom :</strong> {product.nom}</p>
            <p><strong>Référence :</strong> {product.reference}</p>
            <p><strong>Prix de vente :</strong> {formatCurrency(product.prixVente)}</p>
            <p><strong>Stock :</strong> {product.quantite} {product.unite}</p>
            <p><strong>Valeur stock :</strong> {formatCurrency(product.quantite * product.prixAchat)}</p>
          </div>

          {/* Avertissement */}
          <div className="flex items-start space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              <strong>Attention :</strong> La suppression d'un produit peut affecter les ventes et l'historique.
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