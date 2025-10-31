import React from 'react'
import { Trash2, AlertTriangle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Transaction } from '../../../data/models/transactions'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

interface DeleteTransactionDialogProps {
  transaction: Transaction
  onConfirm: (transaction: Transaction) => Promise<void>
  onClose: () => void
  loading?: boolean
  error?: string | null
}

export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  transaction,
  onConfirm,
  onClose,
  loading = false,
  error = null
}) => {
  const handleConfirm = async () => {
    await onConfirm(transaction)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-6 h-6" />
            <span>Supprimer la transaction</span>
          </DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cette transaction ?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations de la transaction */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Transaction à supprimer :</h4>
            <p><strong>ID :</strong> #{transaction.id}</p>
            <p><strong>Type :</strong> {transaction.type}</p>
            <p><strong>Montant :</strong> {transaction.montant} €</p>
            <p><strong>Statut :</strong> {transaction.statut}</p>
            <p><strong>Date :</strong> {new Date(transaction.dateOperation).toLocaleDateString()}</p>
          </div>

          {/* Avertissement */}
          <div className="flex items-start space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              <strong>Attention :</strong> La suppression d'une transaction peut affecter les soldes et l'historique financier.
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
            Supprimer définitivement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}