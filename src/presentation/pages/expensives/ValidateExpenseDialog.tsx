import React, { useState } from 'react'
import { X, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { Depense, DepenseStatut, ValidationDepenseRequest } from '../../../data/models/expenses'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useValidateExpense } from '../../hooks/expensives/useValidateExpense'

interface ValidateExpenseDialogProps {
  expense: Depense
  onConfirm: (expense: Depense) => void
  onClose: () => void
}

export const ValidateExpenseDialog: React.FC<ValidateExpenseDialogProps> = ({
  expense,
  onConfirm,
  onClose
}) => {
  const [decision, setDecision] = useState<DepenseStatut.VALIDATED | DepenseStatut.REJECTED>(DepenseStatut.VALIDATED)
  const [commentaireValidation, setCommentaireValidation] = useState('')

  const { validateExpense, loading, error } = useValidateExpense()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload: ValidationDepenseRequest = {
      statut: decision,
      commentaireValidation: commentaireValidation || undefined
    }

    const result = await validateExpense(expense.id, payload)
    
    if (result) {
      onConfirm(result)
    }
  }

  const getStatusColor = (statut: DepenseStatut) => {
    switch (statut) {
      case DepenseStatut.VALIDATED:
        return 'var(--ubuntu-orange, #E95420)'
      case DepenseStatut.REJECTED:
        return 'var(--ubuntu-warm-grey, #AEA79F)'
      default:
        return 'var(--ubuntu-light-orange, #F6B024)'
    }
  }

  const getStatusIcon = (statut: DepenseStatut) => {
    switch (statut) {
      case DepenseStatut.VALIDATED:
        return <CheckCircle className="w-5 h-5" />
      case DepenseStatut.REJECTED:
        return <XCircle className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Valider la Dépense
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Contenu */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations de la dépense */}
          <div className="p-4 rounded border" style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)'
          }}>
            <h3 className="font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Dépense #{expense.id}
            </h3>
            <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{expense.libelle}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {expense.montant} € • {expense.categorie}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded border" style={{ 
              borderColor: 'var(--ubuntu-orange, #E95420)',
              backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)',
              color: 'var(--ubuntu-orange, #E95420)'
            }}>
              {error}
            </div>
          )}

          {/* Décision */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Décision *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={decision === DepenseStatut.VALIDATED ? "default" : "outline"}
                onClick={() => setDecision(DepenseStatut.VALIDATED)}
                className="flex items-center justify-center py-3"
                style={decision === DepenseStatut.VALIDATED ? {
                  backgroundColor: 'var(--ubuntu-orange, #E95420)',
                  color: 'var(--ubuntu-white, #FFFFFF)'
                } : {
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Valider
              </Button>
              <Button
                type="button"
                variant={decision === DepenseStatut.REJECTED ? "default" : "outline"}
                onClick={() => setDecision(DepenseStatut.REJECTED)}
                className="flex items-center justify-center py-3"
                style={decision === DepenseStatut.REJECTED ? {
                  backgroundColor: 'var(--ubuntu-warm-grey, #AEA79F)',
                  color: 'var(--ubuntu-white, #FFFFFF)'
                } : {
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Rejeter
              </Button>
            </div>
          </div>

          {/* Commentaire */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Commentaire de validation
              {decision === DepenseStatut.REJECTED && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <textarea
              required={decision === DepenseStatut.REJECTED}
              value={commentaireValidation}
              onChange={(e) => setCommentaireValidation(e.target.value)}
              rows={3}
              className="w-full p-2 border rounded"
              style={{
                borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                color: 'var(--ubuntu-dark-aubergine, #2C001E)'
              }}
              placeholder={
                decision === DepenseStatut.VALIDATED 
                  ? "Commentaire optionnel..." 
                  : "Veuillez expliquer les raisons du rejet..."
              }
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              style={{ 
                borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                color: 'var(--ubuntu-dark-aubergine, #2C001E)'
              }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading || (decision === DepenseStatut.REJECTED && !commentaireValidation)}
              style={{ 
                backgroundColor: getStatusColor(decision),
                color: 'var(--ubuntu-white, #FFFFFF)'
              }}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Traitement...
                </>
              ) : (
                <>
                  {getStatusIcon(decision)}
                  <span className="ml-2">
                    {decision === DepenseStatut.VALIDATED ? 'Valider' : 'Rejeter'}
                  </span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}