import React, { useState } from 'react'
import { Eye, Plus, Trash2, Edit, Download, Filter, ChevronLeft, ChevronRight, BarChart2, Package, Truck } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useSupplies } from '../../../presentation/hooks/supplies/useSupplies'
import { useSupplyStats } from '../../../presentation/hooks/supplies/useSupplyStats'
import { useNavigate } from 'react-router-dom'
import { Approvisionnement } from '../../../data/models/supplies'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { CreateSupplyDialog } from './CreateSupplyDialog'
import { DeleteSupplyDialog } from './DeleteSupplyDialog'

export const SupplyList: React.FC = () => {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [supplyToDelete, setSupplyToDelete] = useState<Approvisionnement | null>(null)
  
  const [filters, setFilters] = useState({
    fournisseur: '',
    statut: '',
    page: 1,
    limit: 10,
  })

  const { 
    supplies, 
    isLoading, 
    total, 
    page, 
    limit, 
    pages, 
    isError, 
    error, 
    refetch, 
    updateParams 
  } = useSupplies({
    ...filters,
    enabled: true
  })

  const { stats, isLoading: statsLoading } = useSupplyStats()

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

  const handleViewMore = (supply: Approvisionnement) => {
    navigate(`/supplies/${supply.id}`)
  }

  const handleEdit = (supply: Approvisionnement) => {
    navigate(`/supplies/${supply.id}/edit`)
  }

  const handleDeleteClick = (supply: Approvisionnement) => {
    setSupplyToDelete(supply)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async (supply: Approvisionnement) => {
    try {
      // Implémentez la logique de suppression ici
      console.log('Suppression de l\'approvisionnement:', supply.id)
      // await deleteSupplyMutation(supply.id)
      
      // Rafraîchir les données
      refetch()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setDeleteDialogOpen(false)
      setSupplyToDelete(null)
    }
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false)
    setSupplyToDelete(null)
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
            Gestion des Approvisionnements
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Gérez vos commandes fournisseurs et stocks
          </p>
        </div>
        <CreateSupplyDialog onSuccess={handleSuccess} />
      </div>

      {/* Cartes de statistiques */}
      {stats && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Package className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Total Approvisionnements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {stats.total}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Toutes les commandes
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                En Brouillon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-light-orange, #F6B024)' }}>
                {stats.draft}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Commandes en préparation
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Validés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                {stats.confirmed}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Commandes validées
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Montant Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
                {formatCurrency(stats.totalAmount)}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Valeur totale
              </p>
            </CardContent>
          </Card>
        </div>
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
            Filtrez les approvisionnements par fournisseur et statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Fournisseur
              </label>
              <Select
                value={filters.fournisseur}
                onChange={(e) => handleFilterChange('fournisseur', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les fournisseurs</option>
                <option value="Amazon">Amazon</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Dell">Dell</option>
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
                <option value="draft">Brouillon</option>
                <option value="validated">Validé</option>
                <option value="cancelled">Annulé</option>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button 
                onClick={() => navigate('/supplies/diagrams')}
                className="flex-1"
                style={{ 
                  backgroundColor: 'var(--ubuntu-aubergine, #772953)',
                  color: 'var(--ubuntu-white, #FFFFFF)'
                }}
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                Voir les diagrammes
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des approvisionnements */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Liste des Approvisionnements
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {supplies.length} approvisionnements sur {total} trouvés
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
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>#</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Fournisseur</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Date Appro.</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Total</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Articles</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Statut</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplies.length > 0 ? (
                supplies.map((supply) => (
                  <TableRow 
                    key={supply.id}
                    style={{ 
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                    }}
                  >
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      #{supply.id}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {supply.fournisseur}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(supply.dateAppro)}
                    </TableCell>
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                      {formatCurrency(supply.total)}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {supply.lignes?.length || 0} articles
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(supply.statut)}>
                        {getStatusText(supply.statut)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMore(supply)}
                          style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(supply)}
                          style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(supply)}
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
                  <TableCell colSpan={7} className="py-8 text-center" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Aucun approvisionnement trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Page {page} sur {pages} • {total} approvisionnements au total
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
      {deleteDialogOpen && supplyToDelete && (
        <DeleteSupplyDialog
          supply={supplyToDelete}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
        />
      )}
    </div>
  )
}