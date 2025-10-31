import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCreateCategory } from '../../../presentation/hooks/products/useCreateCategory'
import { CreateCategorieRequest } from '../../../data/models/products'

interface CreateCategoryDialogProps {
  onSuccess: () => void
}

export const CreateCategoryDialog: React.FC<CreateCategoryDialogProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<CreateCategorieRequest>({
    nom: '',
    description: ''
  })

  const { createCategory, loading, error, success } = useCreateCategory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nom.trim()) {
      return
    }

    try {
      await createCategory({
        nom: formData.nom.trim(),
        description: formData.description.trim()
      })
      
      if (success) {
        setFormData({ nom: '', description: '' })
        setIsOpen(false)
        onSuccess()
      }
    } catch (err) {
      console.error('Erreur lors de la création:', err)
    }
  }

  const handleChange = (field: keyof CreateCategorieRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleClose = () => {
    setFormData({ nom: '', description: '' })
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        style={{ 
          backgroundColor: 'var(--ubuntu-orange, #E95420)',
          color: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Nouvelle Catégorie
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-lg w-full max-w-md"
            style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              borderWidth: '1px'
            }}
          >
            {/* En-tête */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Nouvelle Catégorie
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-md text-sm" style={{ 
                  backgroundColor: 'var(--ubuntu-light-orange, #FDF6F2)',
                  color: 'var(--ubuntu-orange, #E95420)',
                  border: '1px solid var(--ubuntu-orange, #E95420)'
                }}>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Nom de la catégorie *
                </label>
                <Input
                  type="text"
                  value={formData.nom}
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
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Entrez une description (optionnelle)"
                  rows={4}
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !formData.nom.trim()}
                  style={{ 
                    backgroundColor: 'var(--ubuntu-orange, #E95420)',
                    color: 'var(--ubuntu-white, #FFFFFF)'
                  }}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Création...
                    </>
                  ) : (
                    'Créer la catégorie'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}