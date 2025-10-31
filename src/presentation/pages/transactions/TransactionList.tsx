import React, { useState } from 'react'
import { Eye, MoreHorizontal, Plus, Trash2, Edit, Download, Filter, ChevronLeft, ChevronRight, BarChart2, CreditCard } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { useTransactions } from '../../../presentation/hooks/transactions/useTransactions'
import { useTransactionStats } from '../../../presentation/hooks/transactions/useTransactionStats'
import { useNavigate } from 'react-router-dom'
import { Transaction, TransactionStatut, TransactionType } from '../../../data/models/transactions'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { CreateTransactionDialog } from './CreateTransactionDialog'
import { DeleteTransactionDialog } from './DeleteTransactionDialog'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Badge } from '../../components/Badge'

export const TransactionList: React.FC = () => {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null)
  
  const [filters, setFilters] = useState({
    statut: '',
    type: '',
    page: 1,
    limit: 10,
  })

  const { 
    transactions, 
    isLoading, 
    total, 
    page, 
    limit, 
    pages, 
    isError, 
    error, 
    refetch, 
    updateParams 
  } = useTransactions({
    ...filters,
    enabled: true
  })

  const { stats, isLoading: statsLoading } = useTransactionStats()

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

  const getTypeBadgeVariant = (type: TransactionType) => {
    switch (type) {
      case TransactionType.DEPOT:
        return 'success'
      case TransactionType.RETRAIT:
        return 'warning'
      default:
        return 'default'
    }
  }

  const handleViewMore = (transaction: Transaction) => {
    navigate(`/transactions/${transaction.id}`)
  }

  const handleEdit = (transaction: Transaction) => {
    navigate(`/transactions/${transaction.id}/edit`)
  }

  const handleDeleteClick = (transaction: Transaction) => {
    setTransactionToDelete(transaction)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async (transaction: Transaction) => {
    try {
      // Implémentez la logique de suppression ici
      console.log('Suppression de la transaction:', transaction.id)
      // await deleteTransactionMutation(transaction.id)
      
      // Rafraîchir les données
      refetch()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setDeleteDialogOpen(false)
      setTransactionToDelete(null)
    }
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false)
    setTransactionToDelete(null)
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
            Gestion des Transactions
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Gérez et suivez toutes vos transactions financières
          </p>
        </div>
        <CreateTransactionDialog onSuccess={handleSuccess} />
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
                <CreditCard className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {stats.total}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Toutes les transactions
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                En Attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-light-orange, #F6B024)' }}>
                {stats.pending}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                En cours de validation
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Dépots Validés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                {formatCurrency(stats.totalDepots)}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Total des dépôts
              </p>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Retraits Validés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
                {formatCurrency(stats.totalRetraits)}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Total des retraits
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
            Filtrez les transactions par statut et type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
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
                <option value={TransactionStatut.PENDING}>En attente</option>
                <option value={TransactionStatut.VALIDATED}>Validé</option>
                <option value={TransactionStatut.CANCELLED}>Annulé</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Type
              </label>
              <Select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les types</option>
                <option value={TransactionType.DEPOT}>Dépôt</option>
                <option value={TransactionType.RETRAIT}>Retrait</option>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button 
                onClick={() => navigate('/transactions/diagrams')}
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

      {/* Tableau des transactions */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Liste des Transactions
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {transactions.length} transactions sur {total} trouvées
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
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Type</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Montant</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Statut</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Date Opération</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Utilisateur</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id}
                    style={{ 
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                    }}
                  >
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      #{transaction.id}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(transaction.type)}>
                        {transaction.type === TransactionType.DEPOT ? 'Dépôt' : 'Retrait'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium" style={{ 
                      color: transaction.type === TransactionType.DEPOT ? 
                        'var(--ubuntu-aubergine, #772953)' : 
                        'var(--ubuntu-orange, #E95420)'
                    }}>
                      {formatCurrency(transaction.montant)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(transaction.statut)}>
                        {transaction.statut === TransactionStatut.PENDING && 'En attente'}
                        {transaction.statut === TransactionStatut.VALIDATED && 'Validé'}
                        {transaction.statut === TransactionStatut.CANCELLED && 'Annulé'}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(transaction.dateOperation)}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {transaction.utilisateur?.username || `User #${transaction.utilisateurId}`}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMore(transaction)}
                          style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(transaction)}
                          style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(transaction)}
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
                    Aucune transaction trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Page {page} sur {pages} • {total} transactions au total
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
      {deleteDialogOpen && transactionToDelete && (
        <DeleteTransactionDialog
          transaction={transactionToDelete}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
        />
      )}
    </div>
  )
}