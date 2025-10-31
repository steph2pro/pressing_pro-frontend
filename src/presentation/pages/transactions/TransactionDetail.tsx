import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Calendar, User, FileText, CheckCircle, XCircle, Clock, Download, Building } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useTransactionById } from '../../../presentation/hooks/transactions/useTransactionById'
import { useBalance } from '../../../presentation/hooks/transactions/useBalance'
import { useMouvementsTresorerie } from '../../../presentation/hooks/transactions/useMouvementsTresorerie'
import { TransactionStatut, TransactionType } from '../../../data/models/transactions'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { ValidationDialog } from './ValidationDialog'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

export const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const transactionId = id ? parseInt(id) : null
  
  const { transaction, isLoading, isError, error, refetch } = useTransactionById(transactionId)
  const { balance, isLoading: balanceLoading } = useBalance()
  const { mouvements, isLoading: mouvementsLoading } = useMouvementsTresorerie()

  const getStatusIcon = (statut: TransactionStatut) => {
    switch (statut) {
      case TransactionStatut.VALIDATED:
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case TransactionStatut.CANCELLED:
        return <XCircle className="w-5 h-5 text-red-600" />
      case TransactionStatut.PENDING:
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadgeVariant = (statut: TransactionStatut) => {
    switch (statut) {
      case TransactionStatut.VALIDATED:
        return 'success'
      case TransactionStatut.PENDING:
        return 'warning'
      case TransactionStatut.CANCELLED:
        return 'error'
      default:
        return 'default'
    }
  }

  const handleSuccess = () => {
    refetch() // Rafraîchir les données après validation
  }

  // Trouver le mouvement de trésorerie correspondant
  const mouvementCorrespondant = mouvements.find(
    m => new Date(m.date).getTime() === new Date(transaction?.dateOperation || '').getTime() &&
         m.montant === transaction?.montant
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !transaction) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
          Transaction non trouvée
        </h2>
        <p className="text-gray-600 mb-4">
          {error?.message || "La transaction que vous recherchez n'existe pas."}
        </p>
        <Button 
          onClick={() => navigate('/transactions')}
          style={{ 
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux transactions
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
            onClick={() => navigate('/transactions')}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Transaction #{transaction.id}
            </h1>
            <p className="text-lg" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails de la transaction
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {transaction.statut === TransactionStatut.PENDING && (
            <ValidationDialog 
              transaction={transaction}
              onSuccess={handleSuccess}
            />
          )}
          <Button
            onClick={() => navigate(`/transactions/${transaction.id}/edit`)}
            style={{ 
              backgroundColor: 'var(--ubuntu-orange, #E95420)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Informations principales */}
        <div className="md:col-span-2 space-y-6">
          {/* Carte de statut et montant */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Informations principales
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(transaction.statut)}
                  <Badge variant={getStatusBadgeVariant(transaction.statut)}>
                    {transaction.statut === TransactionStatut.PENDING && 'En attente'}
                    {transaction.statut === TransactionStatut.VALIDATED && 'Validé'}
                    {transaction.statut === TransactionStatut.CANCELLED && 'Annulé'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Type
                  </label>
                  <Badge variant={transaction.type === TransactionType.DEPOT ? 'success' : 'warning'}>
                    {transaction.type === TransactionType.DEPOT ? 'Dépôt' : 'Retrait'}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Montant
                  </label>
                  <div className="text-2xl font-bold" style={{ 
                    color: transaction.type === TransactionType.DEPOT ? 
                      'var(--ubuntu-aubergine, #772953)' : 
                      'var(--ubuntu-orange, #E95420)'
                  }}>
                    {formatCurrency(transaction.montant)}
                  </div>
                </div>
              </div>
              
              {/* Impact sur le solde */}
              {balance && transaction.statut === TransactionStatut.VALIDATED && (
                <div className="pt-4 border-t border-gray-200">
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Impact sur le solde
                  </label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="text-sm">
                      <span className="font-medium">Solde disponible : </span>
                      <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {formatCurrency(balance.soldeDisponible)}
                      </span>
                    </div>
                    {transaction.type === TransactionType.DEPOT ? (
                      <Badge variant="success">+ {formatCurrency(transaction.montant)}</Badge>
                    ) : (
                      <Badge variant="warning">- {formatCurrency(transaction.montant)}</Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dates importantes */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Dates importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Date d'opération
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(transaction.dateOperation)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Date de création
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(transaction.dateCreation)}
                  </p>
                </div>
                {transaction.dateValidation && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Date de validation
                    </label>
                    <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(transaction.dateValidation)}
                    </p>
                  </div>
                )}
                {transaction.dateModification && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Dernière modification
                    </label>
                    <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(transaction.dateModification)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informations supplémentaires */}
          {(transaction.motif || transaction.commentaire) && (
            <Card style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                  Informations supplémentaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transaction.motif && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Motif
                    </label>
                    <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {transaction.motif}
                    </p>
                  </div>
                )}
                {transaction.commentaire && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Commentaire
                    </label>
                    <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {transaction.commentaire}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Mouvement de trésorerie */}
          {mouvementCorrespondant && (
            <Card style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                  Mouvement de trésorerie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Libellé
                    </label>
                    <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {mouvementCorrespondant.libelle}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Solde après opération
                    </label>
                    <p className="text-lg font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatCurrency(mouvementCorrespondant.solde)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Utilisateurs et informations */}
        <div className="space-y-6">
          {/* Utilisateur */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    ID Utilisateur
                  </label>
                  <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    #{transaction.utilisateurId}
                  </p>
                </div>
                {transaction.utilisateur && (
                  <>
                    <div>
                      <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        Nom
                      </label>
                      <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {transaction.utilisateur.username || transaction.utilisateur.nom}
                      </p>
                    </div>
                    {transaction.utilisateur.email && (
                      <div>
                        <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          Email
                        </label>
                        <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {transaction.utilisateur.email}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Validateur */}
          {transaction.validateurId && (
            <Card style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                  Validateur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      ID Validateur
                    </label>
                    <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      #{transaction.validateurId}
                    </p>
                  </div>
                  {transaction.validateur && (
                    <>
                      <div>
                        <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          Nom
                        </label>
                        <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {transaction.validateur.username || transaction.validateur.nom}
                        </p>
                      </div>
                      {transaction.validateur.email && (
                        <div>
                          <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                            Email
                          </label>
                          <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            {transaction.validateur.email}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preuve */}
          {transaction.preuve && (
            <Card style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
            }}>
              <CardHeader>
                <CardTitle>Preuve de transaction</CardTitle>
                <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  Document justificatif
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {transaction.preuve.match(/\.(jpeg|jpg|gif|png)$/) ? (
                    <img 
                      src={transaction.preuve} 
                      alt="Preuve de transaction"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Document de preuve</p>
                      <a 
                        href={transaction.preuve} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                      >
                        Voir le document
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(transaction.preuve, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger la preuve
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions rapides */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(`/transactions/${transaction.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier la transaction
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Imprimer les détails
              </Button>
              {transaction.statut === TransactionStatut.PENDING && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Validation rapide :</p>
                  <ValidationDialog 
                    transaction={transaction}
                    onSuccess={handleSuccess}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}