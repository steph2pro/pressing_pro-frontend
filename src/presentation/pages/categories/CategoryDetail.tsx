import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Package, Calendar, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Badge } from '../../components/Badge'
import { useCategories } from '../../../presentation/hooks/products/useCategories'
import { formatDate } from '../../../lib/utils'

export const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const categoryId = parseInt(id || '0')

  const { categories, isLoading, isError, error } = useCategories({ enabled: true })

  const category = categories.find(cat => cat.id === categoryId)

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
            Erreur lors du chargement de la catégorie: {error?.message}
          </p>
          <Button onClick={() => navigate('/categories')} className="mt-4">
            Retour à la liste
          </Button>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Catégorie non trouvée
          </p>
          <Button onClick={() => navigate('/categories')} className="mt-4">
            Retour à la liste
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
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/categories')}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {category.nom}
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails de la catégorie
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/categories/${category.id}/edit`)}
          style={{ 
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informations principales */}
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Informations de la catégorie
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails généraux de la catégorie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Nom
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{category.nom}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Description
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {category.description || 'Aucune description'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Métadonnées */}
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Métadonnées
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Informations techniques de la catégorie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                ID
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{category.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Date de création
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{formatDate(category.dateCreation)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Dernière modification
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {category.dateModification ? formatDate(category.dateModification) : 'Non modifiée'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques produits (optionnel) */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
            Produits associés
          </CardTitle>
          <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Produits appartenant à cette catégorie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Fonctionnalité à venir</p>
            <p className="text-sm">Affichage des produits de cette catégorie</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}