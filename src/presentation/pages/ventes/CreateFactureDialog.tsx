import React, { useState } from 'react'
import { Receipt, Plus, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCreateFacture } from '../../../presentation/hooks/sales/useCreateFacture'
import { CreateFactureRequest } from '../../../data/models/sales'

interface CreateFactureDialogProps {
  venteId: number
  onSuccess: () => void
  variant?: 'default' | 'outline'
}

export const CreateFactureDialog: React.FC<CreateFactureDialogProps> = ({
  venteId,
  onSuccess,
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<CreateFactureRequest>({
    venteId: venteId,
    dateEmission: new Date()
  })
  
  const { createFacture, loading, error, success } = useCreateFacture()

  const handleOpen = () => {
    setIsOpen(true)
    setFormData({
      venteId: venteId,
      dateEmission: new Date()
    })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    const result = await createFacture(formData)
    
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

  const buttonContent = (
    <>
      <Receipt className="w-4 h-4 mr-2" />
      Créer facture
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
          size="sm"
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
            <DialogTitle>Créer une facture</DialogTitle>
            <DialogDescription>
              Générez une facture pour cette vente.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Date d'émission */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Date d'émission *
              </label>
              <Input
                type="date"
                value={formData.dateEmission.toISOString().split('T')[0]}
                onChange={(e) => handleChange('dateEmission', new Date(e.target.value))}
              />
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
                <span className="text-sm">Facture créée avec succès !</span>
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
              disabled={loading}
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
                  <Receipt className="w-4 h-4 mr-2" />
                  Créer la facture
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}