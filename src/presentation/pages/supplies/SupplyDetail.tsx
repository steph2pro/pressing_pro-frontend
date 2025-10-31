import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Calendar, User, FileText, Package, Truck, Plus, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useSupplyById } from '../../../presentation/hooks/supplies/useSupplyById'
import { Approvisionnement } from '../../../data/models/supplies'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { AddSupplyLineDialog } from './AddSupplyLineDialog'

export const SupplyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const supplyId = id ? parseInt(id) : null
  
  const { supply, isLoading, isError, error, refetch } = useSupplyById(supplyId)

  const getStatusBadgeVariant = (statut: string) => {
    switch (statut) {
      case 'validated':
        return 'success'
      case 'draft':
        return 'warning'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'draft': return 'Brouillon'
      case 'validated': return 'Validé'
      case 'cancelled': return 'Annulé'
      default: return statut
    }
  }

  const handleSuccess = () => {
    refetch() // Rafraîchir les données après ajout de ligne
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !supply) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
          Approvisionnement non trouvé
        </h2>
        <p className="text-gray-600 mb-4">
          {error?.message || "L'approvisionnement que vous recherchez n'existe pas."}
        </p>
        <Button 
          onClick={() => navigate('/supplies')}
          style={{ 
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux approvisionnements
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
            onClick={() => navigate('/supplies')}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Approvisionnement #{supply.id}
            </h1>
            <p className="text-lg" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails de la commande fournisseur
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <AddSupplyLineDialog 
            supplyId={supply.id}
            onSuccess={handleSuccess}
          />
          <Button
            onClick={() => navigate(`/supplies/${supply.id}/edit`)}
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
                  <Badge variant={getStatusBadgeVariant(supply.statut)}>
                    {getStatusText(supply.statut)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Fournisseur
                  </label>
                  <p className="text-lg font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {supply.fournisseur}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Total
                  </label>
                  <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                    {formatCurrency(supply.total)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Date d'approvisionnement
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(supply.dateAppro)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Utilisateur
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {supply.utilisateur?.username || `User #${supply.utilisateurId}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lignes d'approvisionnement */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Lignes d'approvisionnement</span>
                <span className="text-sm font-normal" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  {supply.lignes?.length || 0} articles
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {supply.lignes && supply.lignes.length > 0 ? (
                <div className="space-y-4">
                  {supply.lignes.map((ligne) => (
                    <div key={ligne.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {ligne.produit?.nom || `Article #${ligne.produitId}`}
                        </h4>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Quantité:</span>
                            <span className="ml-2 font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                              {ligne.quantite}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Prix achat:</span>
                            <span className="ml-2 font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                              {formatCurrency(ligne.prixAchat)}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Prix vente:</span>
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
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune ligne d'approvisionnement</p>
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
                    Date d'approvisionnement
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(supply.dateAppro)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Date de création
                  </label>
                  <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(supply.dateCreation)}
                  </p>
                </div>
                {supply.dateModification && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Dernière modification
                    </label>
                    <p className="text-lg" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(supply.dateModification)}
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
                  <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Total articles:</span>
                  <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {supply.lignes?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Quantité totale:</span>
                  <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {supply.lignes?.reduce((sum, ligne) => sum + ligne.quantite, 0) || 0}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Total général:</span>
                    <span style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                      {formatCurrency(supply.total)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations fournisseur */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Fournisseur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Nom
                  </label>
                  <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {supply.fournisseur}
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
              <AddSupplyLineDialog 
                supplyId={supply.id}
                onSuccess={handleSuccess}
                variant="outline"
              />
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(`/supplies/${supply.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier la commande
              </Button>
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