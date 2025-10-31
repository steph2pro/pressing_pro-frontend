import React, { useState } from 'react'
import { Eye, Plus, Trash2, Edit, Download, Filter, ChevronLeft, ChevronRight, BarChart2, ShoppingCart, Receipt, User } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useVentes } from '../../../presentation/hooks/sales/useVentes'
import { useVenteStats } from '../../../presentation/hooks/sales/useVenteStats'
import { useNavigate } from 'react-router-dom'
import { Vente } from '../../../data/models/sales'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { CreateVenteDialog } from './CreateVenteDialog'
import { CreateFactureDialog } from './CreateFactureDialog'
import { CancelVenteDialog } from './CancelVenteDialog'

export const VenteList: React.FC = () => {
  const navigate = useNavigate()
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [venteToCancel, setVenteToCancel] = useState<Vente | null>(null)
  
  const [filters, setFilters] = useState({
    client: '',
    statut: '',
    page: 1,
    limit: 10,
  })

  const { 
    ventes, 
    isLoading, 
    total, 
    page, 
    limit, 
    pages, 
    isError, 
    error, 
    refetch, 
    updateParams 
  } = useVentes({
    ...filters,
    enabled: true
  })

  const { stats, isLoading: statsLoading } = useVenteStats()

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

  const handleViewMore = (vente: Vente) => {
    navigate(`/ventes/${vente.id}`)
  }

  const handleEdit = (vente: Vente) => {
    navigate(`/ventes/${vente.id}/edit`)
  }

  const handleCancelClick = (vente: Vente) => {
    setVenteToCancel(vente)
    setCancelDialogOpen(true)
  }

  const handleCancelConfirm = async (vente: Vente) => {
    try {
      // La logique d'annulation est gérée dans le dialogue
      // Rafraîchir les données après annulation
      refetch()
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error)
    } finally {
      setCancelDialogOpen(false)
      setVenteToCancel(null)
    }
  }

  const handleCancelClose = () => {
    setCancelDialogOpen(false)
    setVenteToCancel(null)
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
            Gestion des Ventes
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Gérez vos ventes et factures clients
          </p>
        </div>
        <CreateVenteDialog onSuccess={handleSuccess} />
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
                <ShoppingCart className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Chiffre d'Affaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {formatCurrency(stats.chiffreAffaireTotal)}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Total des ventes
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Nombre de Ventes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-light-orange, #F6B024)' }}>
                {stats.nombreVentes}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Transactions
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Panier Moyen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                {formatCurrency(stats.moyennePanier)}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Par transaction
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Produits Vendus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
                {stats.produitsVendus}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Articles vendus
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
            Filtrez les ventes par client et statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Client
              </label>
              <Select
                value={filters.client}
                onChange={(e) => handleFilterChange('client', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les clients</option>
                <option value="Particulier">Particulier</option>
                <option value="Entreprise">Entreprise</option>
                <option value="Client VIP">Client VIP</option>
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
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
                <option value="refunded">Remboursée</option>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button 
                onClick={() => navigate('/ventes/diagrams')}
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

      {/* Tableau des ventes */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Liste des Ventes
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {ventes.length} ventes sur {total} trouvées
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
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Client</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Date Vente</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Total</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Facture</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Statut</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ventes.length > 0 ? (
                ventes.map((vente) => (
                  <TableRow 
                    key={vente.id}
                    style={{ 
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                    }}
                  >
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      #{vente.id}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {vente.client || 'Non spécifié'}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(vente.dateVente)}
                    </TableCell>
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                      {formatCurrency(vente.total)}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {vente.numeroFacture || 'Non facturée'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(vente.statut)}>
                        {getStatusText(vente.statut)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMore(vente)}
                          style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(vente)}
                          style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {vente.statut === 'completed' && !vente.numeroFacture && (
                          <CreateFactureDialog 
                            venteId={vente.id}
                            onSuccess={handleSuccess}
                          />
                        )}
                        {vente.statut === 'completed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelClick(vente)}
                            style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Aucune vente trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Page {page} sur {pages} • {total} ventes au total
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

      {/* Dialogue d'annulation */}
      {cancelDialogOpen && venteToCancel && (
        <CancelVenteDialog
          vente={venteToCancel}
          onConfirm={handleCancelConfirm}
          onClose={handleCancelClose}
        />
      )}
    </div>
  )
}