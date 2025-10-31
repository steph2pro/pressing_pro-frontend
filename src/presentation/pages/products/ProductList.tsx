import React, { useState } from 'react'
import { Eye, Plus, Trash2, Edit, Download, Filter, ChevronLeft, ChevronRight, BarChart2, Package, AlertTriangle, Tag } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useProducts } from '../../../presentation/hooks/products/useProducts'
import { useCategories } from '../../../presentation/hooks/products/useCategories'
import { useStockAlerts } from '../../../presentation/hooks/products/useStockAlerts'
import { useNavigate } from 'react-router-dom'
import { Produit } from '../../../data/models/products'
import { formatCurrency } from '../../../lib/utils'
import { CreateProductDialog } from './CreateProductDialog'
import { DeleteProductDialog } from './DeleteProductDialog'

export const ProductList: React.FC = () => {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Produit | null>(null)
  
  const [filters, setFilters] = useState({
    categorieId: '',
    search: '',
    statut: '',
    stockFaible: '',
    page: 1,
    limit: 10,
  })

  const { 
    products, 
    isLoading, 
    total, 
    page, 
    limit, 
    pages, 
    isError, 
    error, 
    refetch, 
    updateParams 
  } = useProducts({
    ...filters,
    enabled: true
  })

  const { categories } = useCategories({ enabled: true })
  const { stockAlerts } = useStockAlerts({ enabled: true })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    setFilters(newFilters)
    updateParams(newFilters)
  }

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage }
    setFilters(newFilters)
    updateParams(newFilters)
  }

  const getStockBadgeVariant = (quantite: number, seuilAlerte: number) => {
    if (quantite === 0) return 'error'
    if (quantite <= seuilAlerte) return 'warning'
    return 'success'
  }

  const getStockText = (quantite: number, seuilAlerte: number) => {
    if (quantite === 0) return 'Rupture'
    if (quantite <= seuilAlerte) return 'Stock faible'
    return 'En stock'
  }

  const getStatusBadgeVariant = (statut: string) => {
    return statut === 'active' ? 'success' : 'error'
  }

  const handleViewMore = (product: Produit) => {
    navigate(`/products/${product.id}`)
  }

  const handleEdit = (product: Produit) => {
    navigate(`/products/${product.id}/edit`)
  }

  const handleDeleteClick = (product: Produit) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async (product: Produit) => {
    try {
      // Implémentez la logique de suppression ici
      console.log('Suppression du produit:', product.id)
      // await deleteProductMutation(product.id)
      
      // Rafraîchir les données
      refetch()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  const handleSuccess = () => {
    refetch() // Rafraîchir les données après création
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
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
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Gestion des Produits
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Gérez votre catalogue de produits et stocks
          </p>
        </div>
        <CreateProductDialog onSuccess={handleSuccess} />
      </div>

      {/* Alertes stock */}
      {stockAlerts.length > 0 && (
        <Card style={{ 
          borderColor: 'var(--ubuntu-orange, #E95420)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Alertes Stock ({stockAlerts.length})
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Produits avec un stock faible ou en rupture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {stockAlerts.slice(0, 3).map((alerte) => (
                <div key={alerte.produit.id} className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                  <div>
                    <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {alerte.produit.nom}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Stock: {alerte.quantiteActuelle} / Seuil: {alerte.seuilAlerte}
                    </div>
                  </div>
                  <Badge variant={alerte.niveau === 'critique' ? 'error' : 'warning'}>
                    {alerte.niveau === 'critique' ? 'CRITIQUE' : 'FAIBLE'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtres */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
            Filtres
          </CardTitle>
          <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Filtrez les produits par catégorie, statut et stock
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Catégorie
              </label>
              <Select
                value={filters.categorieId}
                onChange={(e) => handleFilterChange('categorieId', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Toutes les catégories</option>
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.id.toString()}>
                    {categorie.nom}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Statut
              </label>
              <Select
                value={filters.statut}
                onChange={(e) => handleFilterChange('statut', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Stock
              </label>
              <Select
                value={filters.stockFaible}
                onChange={(e) => handleFilterChange('stockFaible', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les stocks</option>
                <option value="true">Stock faible uniquement</option>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button 
                onClick={() => navigate('/products/diagrams')}
                className="flex-1"
                style={{ 
                  backgroundColor: 'var(--ubuntu-aubergine, #772953)',
                  color: 'var(--ubuntu-white, #FFFFFF)'
                }}
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                Statistiques
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des produits */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Liste des Produits
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {products.length} produits sur {total} trouvés
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => refetch()}
              style={{ 
                borderColor: 'var(--ubuntu-orange, #E95420)',
                color: 'var(--ubuntu-orange, #E95420)'
              }}
            >
              Actualiser
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Produit</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Référence</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Catégorie</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Prix Achat</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Prix Vente</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Stock</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Statut</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow 
                    key={product.id}
                    style={{ 
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                    }}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.nom}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            {product.nom}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                            {product.marque}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {product.reference}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {product.categorie?.nom || 'Non catégorisé'}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatCurrency(product.prixAchat)}
                    </TableCell>
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                      {formatCurrency(product.prixVente)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStockBadgeVariant(product.quantite, product.seuilAlerte)}>
                          {getStockText(product.quantite, product.seuilAlerte)}
                        </Badge>
                        <span className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          ({product.quantite} {product.unite})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(product.statut)}>
                        {product.statut === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMore(product)}
                          style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                          style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(product)}
                          style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Aucun produit trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Page {page} sur {pages} • {total} produits au total
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Précédent
                </Button>
                
                {/* Affichage des numéros de page */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                    let pageNum
                    if (pages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= pages - 2) {
                      pageNum = pages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10 h-10 p-0"
                        style={page === pageNum ? {
                          backgroundColor: 'var(--ubuntu-orange, #E95420)',
                          color: 'var(--ubuntu-white, #FFFFFF)'
                        } : {
                          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                          color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                        }}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pages}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogue de suppression */}
      {deleteDialogOpen && productToDelete && (
        <DeleteProductDialog
          product={productToDelete}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
        />
      )}
    </div>
  )
}