import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, CheckCircle, XCircle, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { DepenseStatut, DepenseCategorie } from '../../../data/models/expenses'
import { useExpenseById } from '../../hooks/expensives/useExpenseById'

export const ExpenseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const expenseId = parseInt(id || '0')

  const { expense, isLoading, isError, error, refetch } = useExpenseById(expenseId, {
    enabled: !!expenseId
  })

  const getStatusBadgeVariant = (statut: DepenseStatut) => {
    switch (statut) {
      case DepenseStatut.VALIDATED:
        return 'success'
      case DepenseStatut.REJECTED:
        return 'error'
      case DepenseStatut.PENDING:
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStatusText = (statut: DepenseStatut) => {
    switch (statut) {
      case DepenseStatut.VALIDATED: return 'Validée'
      case DepenseStatut.REJECTED: return 'Rejetée'
      case DepenseStatut.PENDING: return 'En attente'
      default: return statut
    }
  }

  const getCategorieText = (categorie: DepenseCategorie) => {
    const categories = {
      [DepenseCategorie.SALAIRE]: 'Salaire',
      [DepenseCategorie.ELECTRICITE]: 'Électricité',
      [DepenseCategorie.INTERNET]: 'Internet',
      [DepenseCategorie.LOYER]: 'Loyer',
      [DepenseCategorie.FOURNITURE]: 'Fourniture',
      [DepenseCategorie.MAINTENANCE]: 'Maintenance',
      [DepenseCategorie.TRANSPORT]: 'Transport',
      [DepenseCategorie.AUTRE]: 'Autre'
    }
    return categories[categorie] || categorie
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
    <div className="space-y-6 p-6" style={{ 
      backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)',
      minHeight: '100vh'
    }}>
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/expenses')}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Dépense #{expense.id}
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {expense.libelle}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => navigate(`/expenses/${expense.id}/edit`)}
            style={{ 
              backgroundColor: 'var(--ubuntu-orange, #E95420)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Informations principales */}
        <div className="md:col-span-2 space-y-6">
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Informations de la Dépense
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Libellé
                  </label>
                  <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {expense.libelle}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Catégorie
                  </label>
                  <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {getCategorieText(expense.categorie)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Montant
                  </label>
                  <p className="text-lg font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                    {formatCurrency(expense.montant)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Statut
                  </label>
                  <div className="mt-1">
                    <Badge variant={getStatusBadgeVariant(expense.statut)}>
                      {getStatusText(expense.statut)}
                    </Badge>
                  </div>
                </div>
              </div>

              {expense.commentaire && (
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Commentaire
                  </label>
                  <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {expense.commentaire}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations de validation */}
          {(expense.statut === DepenseStatut.VALIDATED || expense.statut === DepenseStatut.REJECTED) && (
            <Card style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
            }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Informations de Validation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Validateur
                    </label>
                    <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {expense.validateur?.name || 'Non spécifié'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Date de Validation
                    </label>
                    <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {expense.dateValidation ? formatDate(expense.dateValidation) : 'Non spécifiée'}
                    </p>
                  </div>
                </div>
                {/* {expense.commentaireValidation && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Commentaire de Validation
                    </label>
                    <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {expense.commentaireValidation}
                    </p>
                  </div>
                )} */}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Métadonnées */}
        <div className="space-y-6">
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Métadonnées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  Créée par
                </label>
                <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  {expense.utilisateur?.name || 'Non spécifié'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  Date de création
                </label>
                <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  {formatDate(expense.dateCreation)}
                </p>
              </div>
              {expense.dateModification && (
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Dernière modification
                  </label>
                  <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(expense.dateModification)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Justificatif */}
          {expense.justificatif && (
            <Card style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
            }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Justificatif
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(expense.justificatif, '_blank')}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Voir le justificatif
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}