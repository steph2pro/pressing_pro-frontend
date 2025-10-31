import React, { useState } from 'react'
import { Plus, AlertCircle, Package } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCreateProduct } from '../../../presentation/hooks/products/useCreateProduct'
import { useCategories } from '../../../presentation/hooks/products/useCategories'
import { CreateProduitRequest } from '../../../data/models/products'
import { formatCurrency } from '../../../lib/utils'

interface CreateProductDialogProps {
  onSuccess: () => void
}

export const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<CreateProduitRequest>({
    nom: '',
    categorieId: 0,
    marque: '',
    reference: '',
    quantite: 0,
    prixAchat: 0,
    prixVente: 0,
    unite: 'unité',
    seuilAlerte: 5,
    fournisseur: '',
    description: '',
    image: ''
  })
  
  const { createProduct, loading, error, success } = useCreateProduct()
  const { categories } = useCategories({ enabled: true })

  const handleOpen = () => {
    setIsOpen(true)
    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      categorieId: 0,
      marque: '',
      reference: '',
      quantite: 0,
      prixAchat: 0,
      prixVente: 0,
      unite: 'unité',
      seuilAlerte: 5,
      fournisseur: '',
      description: '',
      image: ''
    })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    if (!formData.nom || !formData.reference || formData.categorieId === 0) {
      alert('Veuillez remplir les champs obligatoires')
      return
    }

    if (formData.prixVente <= formData.prixAchat) {
      alert('Le prix de vente doit être supérieur au prix d\'achat')
      return
    }

    const result = await createProduct(formData)
    
    if (result) {
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 1000)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const marge = formData.prixAchat > 0 ? ((formData.prixVente - formData.prixAchat) / formData.prixAchat) * 100 : 0

  return (
    <>
      <Button 
        onClick={handleOpen}
        style={{ 
          backgroundColor: 'var(--ubuntu-orange, #E95420)',
          color: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Nouveau produit
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un nouveau produit</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer un nouveau produit dans votre catalogue.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Informations générales */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nom du produit *
                </label>
                <Input
                  value={formData.nom}
                  onChange={(e) => handleChange('nom', e.target.value)}
                  placeholder="Nom du produit..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Catégorie *
                </label>
                <Select
                  value={formData.categorieId.toString()}
                  onChange={(e) => handleChange('categorieId', parseInt(e.target.value))}
                >
                  <option value="0">Sélectionnez une catégorie</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id.toString()}>
                      {categorie.nom}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Référence *
                </label>
                <Input
                  value={formData.reference}
                  onChange={(e) => handleChange('reference', e.target.value)}
                  placeholder="Référence unique..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Marque
                </label>
                <Input
                  value={formData.marque}
                  onChange={(e) => handleChange('marque', e.target.value)}
                  placeholder="Marque du produit..."
                />
              </div>
            </div>

            {/* Stock et prix */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantité initiale
                </label>
                <Input
                  type="number"
                  value={formData.quantite}
                  onChange={(e) => handleChange('quantite', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prix d'achat *
                </label>
                <Input
                  type="number"
                  value={formData.prixAchat}
                  onChange={(e) => handleChange('prixAchat', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prix de vente *
                </label>
                <Input
                  type="number"
                  value={formData.prixVente}
                  onChange={(e) => handleChange('prixVente', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Unité
                </label>
                <Select
                  value={formData.unite}
                  onChange={(e) => handleChange('unite', e.target.value)}
                >
                  <option value="unité">Unité</option>
                  <option value="kg">Kilogramme</option>
                  <option value="g">Gramme</option>
                  <option value="L">Litre</option>
                  <option value="mL">Millilitre</option>
                  <option value="m">Mètre</option>
                  <option value="cm">Centimètre</option>
                  <option value="paquet">Paquet</option>
                  <option value="carton">Carton</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Seuil d'alerte stock
                </label>
                <Input
                  type="number"
                  value={formData.seuilAlerte}
                  onChange={(e) => handleChange('seuilAlerte', parseInt(e.target.value) || 0)}
                  placeholder="5"
                  min="0"
                />
              </div>
            </div>

            {/* Fournisseur et description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Fournisseur
              </label>
              <Input
                value={formData.fournisseur}
                onChange={(e) => handleChange('fournisseur', e.target.value)}
                placeholder="Nom du fournisseur..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Description du produit..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                URL de l'image
              </label>
              <Input
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>

            {/* Résumé financier */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-3">Résumé financier</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Marge:</span> {marge.toFixed(1)}%
                </div>
                <div>
                  <span className="font-medium">Bénéfice unitaire:</span> {formatCurrency(formData.prixVente - formData.prixAchat)}
                </div>
                <div>
                  <span className="font-medium">Valeur stock:</span> {formatCurrency(formData.quantite * formData.prixAchat)}
                </div>
              </div>
            </div>

            {/* Messages d'erreur/succès */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Produit créé avec succès !</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || !formData.nom || !formData.reference || formData.categorieId === 0}
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
                <>
                  <Package className="w-4 h-4 mr-2" />
                  Créer le produit
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}