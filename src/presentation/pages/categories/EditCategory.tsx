import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCategories } from '../../../presentation/hooks/products/useCategories'
import { useUpdateCategory } from '../../../presentation/hooks/products/useUpdateCategory'
import { UpdateCategorieRequest } from '../../../data/models/products'

export const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const categoryId = parseInt(id || '0')

  const { categories, isLoading, isError, error } = useCategories({ enabled: true })
  const { updateCategory, loading: updateLoading, error: updateError } = useUpdateCategory()

  const [formData, setFormData] = useState<UpdateCategorieRequest>({
    nom: '',
    description: ''
  })

  const category = categories.find(cat => cat.id === categoryId)

  useEffect(() => {
    if (category) {
      setFormData({
        nom: category.nom,
        description: category.description || ''
      })
    }
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nom?.trim()) {
      return
    }

    try {
      await updateCategory(categoryId, {
        nom: formData.nom.trim(),
        description: formData.description?.trim() || ''
      })
      
      navigate(`/categories/${categoryId}`)
    } catch (err) {
      console.error('Erreur lors de la modification:', err)
    }
  }

  const handleChange = (field: keyof UpdateCategorieRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !category) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
            {error?.message || 'Catégorie non trouvée'}
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
            onClick={() => navigate(`/categories/${categoryId}`)}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Modifier la catégorie
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {category.nom}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Informations de la catégorie
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Modifiez les informations de la catégorie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {updateError && (
                <div className="p-3 rounded-md text-sm" style={{ 
                  backgroundColor: 'var(--ubuntu-light-orange, #FDF6F2)',
                  color: 'var(--ubuntu-orange, #E95420)',
                  border: '1px solid var(--ubuntu-orange, #E95420)'
                }}>
                  {updateError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Nom de la catégorie *
                </label>
                <Input
                  type="text"
                  value={formData.nom || ''}
                  onChange={(e) => handleChange('nom', e.target.value)}
                  placeholder="Entrez le nom de la catégorie"
                  required
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Description
                </label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Entrez une description (optionnelle)"
                  rows={4}
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/categories/${categoryId}`)}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={updateLoading || !formData.nom?.trim()}
                  style={{ 
                    backgroundColor: 'var(--ubuntu-orange, #E95420)',
                    color: 'var(--ubuntu-white, #FFFFFF)'
                  }}
                >
                  {updateLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Modification...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}