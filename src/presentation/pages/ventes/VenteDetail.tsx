import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Calendar, User, FileText, ShoppingCart, Receipt, Download, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useVenteById } from '../../../presentation/hooks/sales/useVenteById'
import { Vente } from '../../../data/models/sales'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { CreateFactureDialog } from './CreateFactureDialog'
import { CancelVenteDialog } from './CancelVenteDialog'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

export const VenteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const venteId = id ? parseInt(id) : null
  
  const { vente, isLoading, isError, error, refetch } = useVenteById(venteId)

  const getStatusBadgeVariant = (statut: string) => {
    switch (statut) {
      case 'completed':
        return 'success'
      case 'cancelled':
        return 'error'
      case 'refunded':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'completed': return 'Terminée'
      case 'cancelled': return 'Annulée'
      case 'refunded': return 'Remboursée'
      default: return statut
    }
  }

  const handleSuccess = () => {
    refetch() // Rafraîchir les données après création de facture
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !vente) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
          Vente non trouvée
        </h2>
        <p className="text-gray-600 mb-4">
          {error?.message || "La vente que vous recherchez n'existe pas."}
        </p>
        <Button 
          onClick={() => navigate('/ventes')}
          style={{ 
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux ventes
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
            onClick={() => navigate('/ventes')}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Vente #{vente.id}
            </h1>
            <p className="text-lg" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails de la transaction
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {vente.statut === 'completed' && !vente.numeroFacture && (
            <CreateFactureDialog 
              venteId={vente.id}
              onSuccess={handleSuccess}
            />
          )}
          <Button
            onClick={() => navigate(`/ventes/${vente.id}/edit`)}
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
                  <Badge variant={getStatusBadgeVariant(vente.statut)}>
                    {getStatusText(vente.statut)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Client
                  </label>
                  <p className="text-lg font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {vente.client || 'Non spécifié'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Total
                  </label>
                  <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                    {formatCurrency(vente.total)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Numéro de facture
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {vente.numeroFacture || 'Non facturée'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Vendeur
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {vente.utilisateur?.username || `User #${vente.utilisateurId}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lignes de vente */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Articles vendus</span>
                <span className="text-sm font-normal" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  {vente.lignes?.length || 0} articles
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vente.lignes && vente.lignes.length > 0 ? (
                <div className="space-y-4">
                  {vente.lignes.map((ligne) => (
                    <div key={ligne.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {ligne.produit?.nom || `Article #${ligne.produitId}`}
                        </h4>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Quantité:</span>
                            <span className="ml-2 font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                              {ligne.quantite}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Prix unitaire:</span>
                            <span className="ml-2 font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                              {formatCurrency(ligne.prixVente)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                          {formatCurrency(ligne.totalLigne)}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          Sous-total
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun article vendu</p>
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
                    Date de vente
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(vente.dateVente)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Date de création
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(vente.dateCreation)}
                  </p>
                </div>
                {vente.dateModification && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Dernière modification
                    </label>
                    <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(vente.dateModification)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Informations complémentaires */}
        <div className="space-y-6">
          {/* Résumé financier */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle>Résumé financier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Articles vendus:</span>
                  <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {vente.lignes?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Quantité totale:</span>
                  <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {vente.lignes?.reduce((sum, ligne) => sum + ligne.quantite, 0) || 0}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Total général:</span>
                    <span style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                      {formatCurrency(vente.total)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations client */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Client
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Nom
                  </label>
                  <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {vente.client || 'Non spécifié'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vente.statut === 'completed' && !vente.numeroFacture && (
                <CreateFactureDialog 
                  venteId={vente.id}
                  onSuccess={handleSuccess}
                  variant="outline"
                />
              )}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(`/ventes/${vente.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier la vente
              </Button>
              {vente.statut === 'completed' && (
                <CancelVenteDialog 
                  vente={vente}
                  onConfirm={() => refetch()}
                  variant="outline"
                />
              )}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Imprimer les détails
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}