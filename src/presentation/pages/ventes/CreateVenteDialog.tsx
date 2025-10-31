import React, { useState } from 'react'
import { Plus, AlertCircle, ShoppingCart } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { useCreateVente } from '../../../presentation/hooks/sales/useCreateVente'
import { CreateVenteRequest, CreateLigneVenteRequest } from '../../../data/models/sales'
import { formatCurrency } from '../../../lib/utils'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

interface CreateVenteDialogProps {
  onSuccess: () => void
}

export const CreateVenteDialog: React.FC<CreateVenteDialogProps> = ({
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [lignes, setLignes] = useState<CreateLigneVenteRequest[]>([
    { produitId: 0, quantite: 1, prixVente: 0 }
  ])
  const [formData, setFormData] = useState<Omit<CreateVenteRequest, 'lignes'>>({
    dateVente: new Date(),
    client: ''
  })
  
  const { createVente, loading, error, success } = useCreateVente()

  const handleOpen = () => {
    setIsOpen(true)
    // Réinitialiser le formulaire
    setFormData({
      dateVente: new Date(),
      client: ''
    })
    setLignes([{ produitId: 0, quantite: 1, prixVente: 0 }])
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    if (lignes.some(ligne => ligne.produitId === 0 || ligne.quantite <= 0 || ligne.prixVente <= 0)) {
      alert('Veuillez remplir tous les champs des lignes de vente')
      return
    }

    const venteData: CreateVenteRequest = {
      ...formData,
      lignes
    }

    const result = await createVente(venteData)
    
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

  const handleLigneChange = (index: number, field: string, value: any) => {
    const newLignes = [...lignes]
    newLignes[index] = { ...newLignes[index], [field]: value }
    setLignes(newLignes)
  }

  const addLigne = () => {
    setLignes([...lignes, { produitId: 0, quantite: 1, prixVente: 0 }])
  }

  const removeLigne = (index: number) => {
    if (lignes.length > 1) {
      setLignes(lignes.filter((_, i) => i !== index))
    }
  }

  const total = lignes.reduce((sum, ligne) => sum + (ligne.quantite * ligne.prixVente), 0)

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
        Nouvelle vente
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle vente</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer une nouvelle vente.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Informations générales */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date de vente *
                </label>
                <Input
                  type="datetime-local"
                  value={formData.dateVente.toISOString().slice(0, 16)}
                  onChange={(e) => handleChange('dateVente', new Date(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Client
                </label>
                <Input
                  value={formData.client}
                  onChange={(e) => handleChange('client', e.target.value)}
                  placeholder="Nom du client..."
                />
              </div>
            </div>

            {/* Lignes de vente */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium">
                  Articles vendus *
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLigne}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter un article
                </Button>
              </div>
              
              <div className="space-y-4">
                {lignes.map((ligne, index) => (
                  <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">
                        ID Produit *
                      </label>
                      <Input
                        type="number"
                        value={ligne.produitId}
                        onChange={(e) => handleLigneChange(index, 'produitId', parseInt(e.target.value))}
                        placeholder="ID du produit"
                        min="1"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-sm font-medium mb-2">
                        Quantité *
                      </label>
                      <Input
                        type="number"
                        value={ligne.quantite}
                        onChange={(e) => handleLigneChange(index, 'quantite', parseInt(e.target.value))}
                        placeholder="1"
                        min="1"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium mb-2">
                        Prix *
                      </label>
                      <Input
                        type="number"
                        value={ligne.prixVente}
                        onChange={(e) => handleLigneChange(index, 'prixVente', parseFloat(e.target.value))}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="w-20">
                      <label className="block text-sm font-medium mb-2">
                        Total
                      </label>
                      <div className="text-sm font-medium p-2 bg-gray-50 rounded">
                        {formatCurrency(ligne.quantite * ligne.prixVente)}
                      </div>
                    </div>
                    {lignes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLigne(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                  {formatCurrency(total)}
                </span>
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
                <span className="text-sm">Vente créée avec succès !</span>
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
              disabled={loading || total <= 0}
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
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Créer la vente
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}