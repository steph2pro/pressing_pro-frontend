import React, { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { useCreateTransaction } from '../../../presentation/hooks/transactions/useCreateTransaction'
import { CreateTransactionRequest, TransactionType } from '../../../data/models/transactions'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

interface CreateTransactionDialogProps {
  onSuccess: () => void
}

export const CreateTransactionDialog: React.FC<CreateTransactionDialogProps> = ({
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<CreateTransactionRequest>({
    type: TransactionType.DEPOT,
    montant: 0,
    dateOperation: new Date(),
    motif: '',
    commentaire: '',
    preuve: ''
  })
  
  const { createTransaction, loading, error, success } = useCreateTransaction()

  const handleOpen = () => {
    setIsOpen(true)
    // Réinitialiser le formulaire
    setFormData({
      type: TransactionType.DEPOT,
      montant: 0,
      dateOperation: new Date(),
      motif: '',
      commentaire: '',
      preuve: ''
    })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    const result = await createTransaction(formData)
    
    if (result) {
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 1000)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <Button 
        onClick={handleOpen}
        style={{ 
          backgroundColor: 'var(--ubuntu-orange, #E95420)',
          color: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Nouvelle transaction
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle transaction</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer une nouvelle transaction financière.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Type de transaction */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Type de transaction *
                </label>
                <Select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value as TransactionType)}
                >
                  <option value={TransactionType.DEPOT}>Dépôt</option>
                  <option value={TransactionType.RETRAIT}>Retrait</option>
                </Select>
              </div>

              {/* Montant */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Montant *
                </label>
                <Input
                  type="number"
                  value={formData.montant}
                  onChange={(e) => handleChange('montant', parseFloat(e.target.value))}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Date d'opération */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Date d'opération *
              </label>
              <Input
                type="datetime-local"
                value={formData.dateOperation.toISOString().slice(0, 16)}
                onChange={(e) => handleChange('dateOperation', new Date(e.target.value))}
              />
            </div>

            {/* Motif */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Motif
              </label>
              <Input
                value={formData.motif}
                onChange={(e) => handleChange('motif', e.target.value)}
                placeholder="Raison de la transaction..."
              />
            </div>

            {/* Commentaire */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Commentaire
              </label>
              <Textarea
                value={formData.commentaire}
                onChange={(e) => handleChange('commentaire', e.target.value)}
                placeholder="Commentaires supplémentaires..."
                rows={3}
              />
            </div>

            {/* Preuve (URL) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Lien de preuve (URL)
              </label>
              <Input
                value={formData.preuve}
                onChange={(e) => handleChange('preuve', e.target.value)}
                placeholder="https://example.com/preuve.jpg"
                type="url"
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
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Transaction créée avec succès !</span>
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
              disabled={loading || formData.montant <= 0}
              style={{ 
                backgroundColor: 'var(--ubuntu-orange, #E95420)',
                color: 'var(--ubuntu-white, #FFFFFF)'
              }}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Création...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Créer la transaction
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}