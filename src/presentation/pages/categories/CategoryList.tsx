import React, { useState } from 'react'
import { Eye, Plus, Trash2, Edit, ChevronLeft, ChevronRight, Tag } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useCategories } from '../../../presentation/hooks/products/useCategories'
import { useDeleteCategory } from '../../../presentation/hooks/products/useDeleteCategory'
import { useNavigate } from 'react-router-dom'
import { Categorie } from '../../../data/models/products'
import { formatDate } from '../../../lib/utils'
import { CreateCategoryDialog } from './CreateCategoryDialog'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'

export const CategoryList: React.FC = () => {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Categorie | null>(null)
  
  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    limit: 10,
  })

  const { 
    categories, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useCategories({ enabled: true })

  const { deleteCategory, loading: deleteLoading } = useDeleteCategory()

  const handleDeleteClick = (category: Categorie) => {
    setCategoryToDelete(category)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async (category: Categorie) => {
    try {
      await deleteCategory(category.id)
      // Le hook gère déjà l'invalidation des queries
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setDeleteDialogOpen(false)
      setCategoryToDelete(null)
    }
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  const handleViewMore = (category: Categorie) => {
    navigate(`/categories/${category.id}`)
  }

  const handleEdit = (category: Categorie) => {
    navigate(`/categories/${category.id}/edit`)
  }

  const handleSuccess = () => {
    refetch()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
            Erreur lors du chargement des catégories: {error?.message}
          </p>
          <Button onClick={() => refetch()} className="mt-4">
            Réessayer
          </Button>
        </div>
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
            Gestion des Catégories
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Gérez vos catégories de produits
          </p>
        </div>
        <CreateCategoryDialog onSuccess={handleSuccess} />
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  Total Catégories
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  {categories.length}
                </p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-orange, #E95420)' }}>
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des catégories */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Liste des Catégories
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {categories.length} catégories trouvées
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
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Nom</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Description</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Date de création</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Dernière modification</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow 
                    key={category.id}
                    style={{ 
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                    }}
                  >
                    <TableCell>
                      <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {category.nom}
                      </div>
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {category.description || 'Aucune description'}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {formatDate(category.dateCreation)}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {category.dateModification ? formatDate(category.dateModification) : 'Non modifiée'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMore(category)}
                          style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category)}
                          style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(category)}
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
                  <TableCell colSpan={5} className="py-8 text-center" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Aucune catégorie trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogue de suppression */}
      {deleteDialogOpen && categoryToDelete && (
        <DeleteCategoryDialog
          category={categoryToDelete}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
          loading={deleteLoading}
        />
      )}
    </div>
  )
}