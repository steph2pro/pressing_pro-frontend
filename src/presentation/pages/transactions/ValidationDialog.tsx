import React, { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Textarea } from '../../components/ui/textarea'
import { useValidateTransaction } from '../../../presentation/hooks/transactions/useValidateTransaction'
import { Transaction, TransactionStatut, ValidationTransactionRequest } from '../../../data/models/transactions'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

interface ValidationDialogProps {
  transaction: Transaction
  onSuccess: () => void
}

export const ValidationDialog: React.FC<ValidationDialogProps> = ({
  transaction,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<'validate' | 'cancel' | null>(null)
  const [commentaire, setCommentaire] = useState('')
  
  const { validateTransaction, loading, error, success } = useValidateTransaction()

  const handleOpen = (actionType: 'validate' | 'cancel') => {
    setAction(actionType)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setAction(null)
    setCommentaire('')
  }

  const handleSubmit = async () => {
    if (!action) return

    const validationData: ValidationTransactionRequest = {
      statut: action === 'validate' ? TransactionStatut.VALIDATED : TransactionStatut.CANCELLED,
      commentaire: commentaire || undefined
    }

    const result = await validateTransaction(transaction.id, validationData)
    
    if (result) {
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 1000)
    }
  }

  const getDialogConfig = () => {
    if (action === 'validate') {
      return {
        title: 'Valider la transaction',
        description: 'Êtes-vous sûr de vouloir valider cette transaction ? Cette action est irréversible.',
        icon: <CheckCircle className="w-6 h-6 text-green-600" />,
        confirmText: 'Valider',
        confirmStyle: { backgroundColor: 'var(--ubuntu-aubergine, #772953)', color: 'white' }
      }
    } else {
      return {
        title: 'Annuler la transaction',
        description: 'Êtes-vous sûr de vouloir annuler cette transaction ? Cette action est irréversible.',
        icon: <XCircle className="w-6 h-6 text-red-600" />,
        confirmText: 'Annuler',
        confirmStyle: { backgroundColor: 'var(--ubuntu-orange, #E95420)', color: 'white' }
      }
    }
  }

  const dialogConfig = action ? getDialogConfig() : null

  return (
    <>
      <div className="flex space-x-2">
        <Button
          onClick={() => handleOpen('validate')}
          style={{ 
            backgroundColor: 'var(--ubuntu-aubergine, #772953)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Valider
        </Button>
        <Button
          onClick={() => handleOpen('cancel')}
          variant="outline"
          style={{ 
            borderColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-orange, #E95420)'
          }}
        >
          <XCircle className="w-4 h-4 mr-2" />
          Annuler
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {dialogConfig?.icon}
              <span>{dialogConfig?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {dialogConfig?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Informations de la transaction */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Détails de la transaction :</h4>
              <p><strong>ID :</strong> #{transaction.id}</p>
              <p><strong>Type :</strong> {transaction.type}</p>
              <p><strong>Montant :</strong> {transaction.montant} €</p>
            </div>

            {/* Commentaire */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Commentaire (optionnel)
              </label>
              <Textarea
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
                placeholder="Ajoutez un commentaire pour justifier votre décision..."
                rows={4}
              />
            </div>

            {/* Messages d'erreur/succès */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">
                  Transaction {action === 'validate' ? 'validée' : 'annulée'} avec succès !
                </span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              style={dialogConfig?.confirmStyle}
            >
              {loading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                dialogConfig?.confirmText
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}