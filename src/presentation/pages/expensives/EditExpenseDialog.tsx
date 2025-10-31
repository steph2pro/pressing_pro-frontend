import React, { useState, useEffect } from 'react'
import { X, Upload, FileText } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { Depense, DepenseCategorie, UpdateDepenseRequest } from '../../../data/models/expenses'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useUpdateExpense } from '../../hooks/expensives/useUpdateExpense'

interface EditExpenseDialogProps {
  expense: Depense
  onSuccess: () => void
  onClose: () => void
}

export const EditExpenseDialog: React.FC<EditExpenseDialogProps> = ({
  expense,
  onSuccess,
  onClose
}) => {
  const [formData, setFormData] = useState({
    libelle: '',
    categorie: '' as DepenseCategorie,
    montant: '',
    commentaire: '',
    justificatif: ''
  })
  const [file, setFile] = useState<File | null>(null)

  const { updateExpense, loading, error, success } = useUpdateExpense()

  useEffect(() => {
    if (expense) {
      setFormData({
        libelle: expense.libelle || '',
        categorie: expense.categorie || '' as DepenseCategorie,
        montant: expense.montant?.toString() || '',
        commentaire: expense.commentaire || '',
        justificatif: expense.justificatif || ''
      })
    }
  }, [expense])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload: UpdateDepenseRequest = {}
    
    if (formData.libelle !== expense.libelle) payload.libelle = formData.libelle
    if (formData.categorie !== expense.categorie) payload.categorie = formData.categorie as DepenseCategorie
    if (parseFloat(formData.montant) !== expense.montant) payload.montant = parseFloat(formData.montant)
    if (formData.commentaire !== expense.commentaire) payload.commentaire = formData.commentaire || undefined
    if (formData.justificatif !== expense.justificatif) payload.justificatif = formData.justificatif || undefined

    // Only update if there are changes
    if (Object.keys(payload).length > 0) {
      const result = await updateExpense(expense.id, payload)
      
      if (result) {
        onSuccess()
        onClose()
      }
    } else {
      onClose() // Close if no changes
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Ici vous pouvez uploader le fichier et récupérer l'URL
      setFormData(prev => ({ ...prev, justificatif: `/justificatifs/${selectedFile.name}` }))
    }
  }

  const categories = [
    { value: DepenseCategorie.SALAIRE, label: 'Salaire' },
    { value: DepenseCategorie.ELECTRICITE, label: 'Électricité' },
    { value: DepenseCategorie.INTERNET, label: 'Internet' },
    { value: DepenseCategorie.LOYER, label: 'Loyer' },
    { value: DepenseCategorie.FOURNITURE, label: 'Fourniture' },
    { value: DepenseCategorie.MAINTENANCE, label: 'Maintenance' },
    { value: DepenseCategorie.TRANSPORT, label: 'Transport' },
    { value: DepenseCategorie.AUTRE, label: 'Autre' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Modifier la Dépense #{expense.id}
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {error && (
            <div className="p-3 rounded border" style={{ 
              borderColor: 'var(--ubuntu-orange, #E95420)',
              backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)',
              color: 'var(--ubuntu-orange, #E95420)'
            }}>
              {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Libellé *
              </label>
              <input
                type="text"
                required
                value={formData.libelle}
                onChange={(e) => setFormData(prev => ({ ...prev, libelle: e.target.value }))}
                className="w-full p-2 border rounded"
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
                placeholder="Ex: Facture électricité janvier"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Catégorie *
              </label>
              <Select
                required
                value={formData.categorie}
                onChange={(e) => setFormData(prev => ({ ...prev, categorie: e.target.value as DepenseCategorie }))}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Montant (€) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.montant}
                onChange={(e) => setFormData(prev => ({ ...prev, montant: e.target.value }))}
                className="w-full p-2 border rounded"
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
                placeholder="0.00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Commentaire
              </label>
              <textarea
                value={formData.commentaire}
                onChange={(e) => setFormData(prev => ({ ...prev, commentaire: e.target.value }))}
                rows={3}
                className="w-full p-2 border rounded"
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
                placeholder="Notes supplémentaires..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Justificatif
              </label>
              <div className="border-2 border-dashed rounded p-6 text-center" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
                <input
                  type="file"
                  id="justificatif"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label htmlFor="justificatif" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                  <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {file ? file.name : (expense.justificatif ? 'Changer le justificatif' : 'Ajouter un justificatif')}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    PDF, JPG, PNG, DOC (max. 10MB)
                  </p>
                </label>
              </div>
              {(file || expense.justificatif) && (
                <div className="flex items-center mt-2 p-2 rounded" style={{ backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)' }}>
                  <FileText className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                  <span className="text-sm" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {file ? file.name : expense.justificatif?.split('/').pop()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              style={{ 
                borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                color: 'var(--ubuntu-dark-aubergine, #2C001E)'
              }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.libelle || !formData.categorie || !formData.montant}
              style={{ 
                backgroundColor: 'var(--ubuntu-orange, #E95420)',
                color: 'var(--ubuntu-white, #FFFFFF)'
              }}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Modification...
                </>
              ) : (
                'Modifier la dépense'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}