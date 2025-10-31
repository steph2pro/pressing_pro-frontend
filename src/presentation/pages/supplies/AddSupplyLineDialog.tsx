import React, { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useAddSupplyLine } from '../../../presentation/hooks/supplies/useAddSupplyLine'
import { AddLigneApprovisionnementRequest, CreateLigneApprovisionnementRequest } from '../../../data/models/supplies'
import { formatCurrency } from '../../../lib/utils'

interface AddSupplyLineDialogProps {
  supplyId: number
  onSuccess: () => void
  variant?: 'default' | 'outline'
}

export const AddSupplyLineDialog: React.FC<AddSupplyLineDialogProps> = ({
  supplyId,
  onSuccess,
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [ligneData, setLigneData] = useState<CreateLigneApprovisionnementRequest>({
    produitId: 0,
    quantite: 1,
    prixAchat: 0,
    prixVente: 0
  })
  
  const { addSupplyLine, loading, error, success } = useAddSupplyLine()

  const handleOpen = () => {
    setIsOpen(true)
    setLigneData({
      produitId: 0,
      quantite: 1,
      prixAchat: 0,
      prixVente: 0
    })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    if (ligneData.produitId === 0 || ligneData.quantite <= 0 || ligneData.prixAchat <= 0 || ligneData.prixVente <= 0) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    const lineData: AddLigneApprovisionnementRequest = {
      approvisionnementId: supplyId,
      ligne: ligneData
    }

    const result = await addSupplyLine(lineData)
    
    if (result) {
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 1000)
    }
  }

  const handleChange = (field: string, value: any) => {
    setLigneData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const buttonContent = (
    <>
      <Plus className="w-4 h-4 mr-2" />
      Ajouter une ligne
    </>
  )

  return (
    <>
      {variant === 'outline' ? (
        <Button variant="outline" onClick={handleOpen} className="w-full justify-start">
          {buttonContent}
        </Button>
      ) : (
        <Button 
          onClick={handleOpen}
          style={{ 
            backgroundColor: 'var(--ubuntu-aubergine, #772953)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          {buttonContent}
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter une ligne d'approvisionnement</DialogTitle>
            <DialogDescription>
              Ajoutez un produit à cette commande fournisseur.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Produit ID */}
            <div>
              <label className="block text-sm font-medium mb-2">
                ID Produit *
              </label>
              <Input
                type="number"
                value={ligneData.produitId}
                onChange={(e) => handleChange('produitId', parseInt(e.target.value))}
                placeholder="ID du produit"
                min="1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Quantité */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantité *
                </label>
                <Input
                  type="number"
                  value={ligneData.quantite}
                  onChange={(e) => handleChange('quantite', parseInt(e.target.value))}
                  placeholder="1"
                  min="1"
                />
              </div>

              {/* Prix d'achat */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prix d'achat *
                </label>
                <Input
                  type="number"
                  value={ligneData.prixAchat}
                  onChange={(e) => handleChange('prixAchat', parseFloat(e.target.value))}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Prix de vente */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Prix de vente *
              </label>
              <Input
                type="number"
                value={ligneData.prixVente}
                onChange={(e) => handleChange('prixVente', parseFloat(e.target.value))}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            {/* Sous-total calculé */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sous-total:</span>
                <span className="font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                  {formatCurrency(ligneData.quantite * ligneData.prixAchat)}
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
                <span className="text-sm">Ligne ajoutée avec succès !</span>
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
              disabled={loading || ligneData.produitId === 0}
              style={{ 
                backgroundColor: 'var(--ubuntu-orange, #E95420)',
                color: 'var(--ubuntu-white, #FFFFFF)'
              }}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Ajout...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter la ligne
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}