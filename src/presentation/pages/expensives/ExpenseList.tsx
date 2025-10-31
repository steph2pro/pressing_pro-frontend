import React, { useState } from 'react'
import { Eye, Plus, Trash2, Edit, Download, Filter, ChevronLeft, ChevronRight, BarChart2, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useNavigate } from 'react-router-dom'
import { Depense, DepenseCategorie, DepenseStatut } from '../../../data/models/expenses'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useExpenses } from '../../hooks/expensives/useExpenses'
import { useExpensesStats } from '../../hooks/expensives/useExpensesStats'
import { CreateExpenseDialog } from './CreateExpenseDialog'
import { ValidateExpenseDialog } from './ValidateExpenseDialog'
import { DeleteExpenseDialog } from './DeleteExpenseDialog'

export const ExpenseList: React.FC = () => {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [validateDialogOpen, setValidateDialogOpen] = useState(false)
  const [expenseToAction, setExpenseToAction] = useState<Depense | null>(null)
  
  const [filters, setFilters] = useState({
    categorie: '',
    statut: '',
    search: '',
    page: 1,
    limit: 10,
  })

  const { 
    expenses, 
    isLoading, 
    total, 
    page, 
    limit, 
    pages, 
    isError, 
    error, 
    refetch, 
    updateParams 
  } = useExpenses({
    ...filters,
    enabled: true
  })

  const { stats, isLoading: statsLoading } = useExpensesStats()

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

  const handleViewMore = (expense: Depense) => {
    navigate(`/expenses/${expense.id}`)
  }

  const handleEdit = (expense: Depense) => {
    navigate(`/expenses/${expense.id}/edit`)
  }

  const handleValidateClick = (expense: Depense) => {
    setExpenseToAction(expense)
    setValidateDialogOpen(true)
  }

  const handleDeleteClick = (expense: Depense) => {
    setExpenseToAction(expense)
    setDeleteDialogOpen(true)
  }

  const handleActionConfirm = async () => {
    // La logique est gérée dans les dialogues
    refetch()
  }

  const handleActionClose = () => {
    setValidateDialogOpen(false)
    setDeleteDialogOpen(false)
    setExpenseToAction(null)
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
            Gestion des Dépenses
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Gérez vos dépenses et suivre vos coûts
          </p>
        </div>
        <CreateExpenseDialog onSuccess={handleSuccess} />
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
                <BarChart2 className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Total des Dépenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {formatCurrency(stats.totalDepenses)}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Dépenses totales
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-light-orange, #F6B024)' }} />
                En Attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-light-orange, #F6B024)' }}>
                {stats.depensesEnAttente}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Dépenses à valider
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Moyenne Mensuelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                {formatCurrency(stats.moyenneMensuelle)}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Par mois
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Catégories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
                {stats.depensesParCategorie.length}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Types de dépenses
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
            Filtrez les dépenses par catégorie et statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Recherche
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Rechercher..."
                className="w-full p-2 border rounded"
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Catégorie
              </label>
              <Select
                value={filters.categorie}
                onChange={(e) => handleFilterChange('categorie', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Toutes les catégories</option>
                {Object.values(DepenseCategorie).map((categorie) => (
                  <option key={categorie} value={categorie}>
                    {getCategorieText(categorie)}
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
                <option value={DepenseStatut.PENDING}>En attente</option>
                <option value={DepenseStatut.VALIDATED}>Validée</option>
                <option value={DepenseStatut.REJECTED}>Rejetée</option>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button 
                onClick={() => navigate('/expenses/diagrams')}
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

      {/* Tableau des dépenses */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Liste des Dépenses
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {expenses.length} dépenses sur {total} trouvées
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
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Libellé</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Catégorie</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Montant</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Date</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Statut</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <TableRow 
                    key={expense.id}
                    style={{ 
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                    }}
                  >
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      #{expense.id}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {expense.libelle}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {getCategorieText(expense.categorie)}
                    </TableCell>
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                      {formatCurrency(expense.montant)}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(expense.dateCreation)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(expense.statut)}>
                        {getStatusText(expense.statut)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMore(expense)}
                          style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(expense)}
                          style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {expense.statut === DepenseStatut.PENDING && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleValidateClick(expense)}
                            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(expense)}
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
                    Aucune dépense trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Page {page} sur {pages} • {total} dépenses au total
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

      {/* Dialogues */}
      {validateDialogOpen && expenseToAction && (
        <ValidateExpenseDialog
          expense={expenseToAction}
          onConfirm={handleActionConfirm}
          onClose={handleActionClose}
        />
      )}

      {deleteDialogOpen && expenseToAction && (
        <DeleteExpenseDialog
          expense={expenseToAction}
          onConfirm={handleActionConfirm}
          onClose={handleActionClose}
        />
      )}
    </div>
  )
}