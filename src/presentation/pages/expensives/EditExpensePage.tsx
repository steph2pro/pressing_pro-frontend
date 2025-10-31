import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { EditExpenseDialog } from './EditExpenseDialog'
import { useExpenseById } from '../../hooks/expensives/useExpenseById'

export const EditExpensePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const expenseId = parseInt(id || '0')
  const [showEditDialog, setShowEditDialog] = useState(true)

  const { expense, isLoading, isError, error, refetch } = useExpenseById(expenseId, {
    enabled: !!expenseId
  })

  const handleSuccess = () => {
    refetch()
    navigate(`/expenses/${expenseId}`)
  }

  const handleClose = () => {
    navigate(`/expenses/${expenseId}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !expense) {
    return (
      <div className="text-center py-12">
        <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
          {error?.message || 'Dépense non trouvée'}
        </p>
        <Button 
          onClick={() => navigate('/expenses')}
          className="mt-4"
        >
          Retour à la liste
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/expenses/${expenseId}`)}
          style={{ color: 'var(--ubuntu-orange, #E95420)' }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
          Modifier la Dépense #{expense.id}
        </h1>
      </div>

      {showEditDialog && expense && (
        <EditExpenseDialog
          expense={expense}
          onSuccess={handleSuccess}
          onClose={handleClose}
        />
      )}
    </div>
  )
}