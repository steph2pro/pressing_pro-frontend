import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Package, Tag, DollarSign, BarChart3, AlertTriangle, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useProductById } from '../../../presentation/hooks/products/useProductById'
import { Produit } from '../../../data/models/products'
import { formatCurrency, formatDate } from '../../../lib/utils'

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const productId = id ? parseInt(id) : 0
  
  const { product, isLoading, isError, error, refetch } = useProductById(productId, { enabled: true })

  const getStockBadgeVariant = (quantite: number, seuilAlerte: number) => {
    if (quantite === 0) return 'error'
    if (quantite <= seuilAlerte) return 'warning'
    return 'success'
  }

  const getStockText = (quantite: number, seuilAlerte: number) => {
    if (quantite === 0) return 'Rupture de stock'
    if (quantite <= seuilAlerte) return 'Stock faible'
    return 'En stock'
  }

  const getStatusBadgeVariant = (statut: string) => {
    return statut === 'active' ? 'success' : 'error'
  }

  const calculateMarge = (prixAchat: number, prixVente: number) => {
    return ((prixVente - prixAchat) / prixAchat) * 100
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
          Produit non trouvé
        </h2>
        <p className="text-gray-600 mb-4">
          {error?.message || "Le produit que vous recherchez n'existe pas."}
        </p>
        <Button 
          onClick={() => navigate('/products')}
          style={{ 
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux produits
        </Button>
      </div>
    )
  }

  const marge = calculateMarge(product.prixAchat, product.prixVente)

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
            onClick={() => navigate('/products')}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {product.nom}
            </h1>
            <p className="text-lg" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails du produit
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => navigate(`/products/${product.id}/edit`)}
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
          {/* Carte produit */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Informations du produit
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStockBadgeVariant(product.quantite, product.seuilAlerte)}>
                    {getStockText(product.quantite, product.seuilAlerte)}
                  </Badge>
                  <Badge variant={getStatusBadgeVariant(product.statut)}>
                    {product.statut === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image et description */}
              <div className="flex items-start space-x-6">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.nom}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Description
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Informations générales
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Référence:</span>
                      <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{product.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Marque:</span>
                      <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{product.marque}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Catégorie:</span>
                      <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {product.categorie?.nom || 'Non catégorisé'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Unité:</span>
                      <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{product.unite}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Stock et fournisseur
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Quantité:</span>
                      <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {product.quantite} {product.unite}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Seuil d'alerte:</span>
                      <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {product.seuilAlerte} {product.unite}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Fournisseur:</span>
                      <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{product.fournisseur}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations financières */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Informations financières
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                    {formatCurrency(product.prixAchat)}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Prix d'achat
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
                    {formatCurrency(product.prixVente)}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Prix de vente
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: marge >= 0 ? 'var(--ubuntu-aubergine, #772953)' : 'var(--ubuntu-orange, #E95420)' }}>
                    {marge.toFixed(1)}%
                  </div>
                  <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Marge
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Valeur du stock:</span>
                  <span className="font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatCurrency(product.quantite * product.prixAchat)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Potentiel de vente:</span>
                  <span className="font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatCurrency(product.quantite * product.prixVente)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Dates importantes */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Historique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Date de création
                  </label>
                  <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatDate(product.dateCreation)}
                  </p>
                </div>
                {product.dateModification && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Dernière modification
                    </label>
                    <p className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(product.dateModification)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Alertes */}
          {product.quantite <= product.seuilAlerte && (
            <Card style={{ 
              borderColor: 'var(--ubuntu-orange, #E95420)',
              backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Alerte Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Le stock de ce produit est faible.
                  </p>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Stock actuel:</span>
                    <span className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {product.quantite} {product.unite}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Seuil d'alerte:</span>
                    <span className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {product.seuilAlerte} {product.unite}
                    </span>
                  </div>
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
                onClick={() => navigate(`/products/${product.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier le produit
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/supplies/new')}
              >
                <Package className="w-4 h-4 mr-2" />
                Commander du stock
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