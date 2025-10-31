import React, { useState } from 'react'
import { FileText, AlertCircle, Download } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCustomReport } from '../../../presentation/hooks/reports/useCustomReport'
import { CustomRapportRequest } from '../../../data/models/reports'

interface CustomReportDialogProps {
  onSuccess: () => void
}

export const CustomReportDialog: React.FC<CustomReportDialogProps> = ({
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [reportParams, setReportParams] = useState<CustomRapportRequest>({
    dateDebut: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    dateFin: new Date(),
    typeRapport: 'ventes',
    groupBy: 'mois'
  })
  
  const { generateCustomReport, data, loading, error, success } = useCustomReport()

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    const result = await generateCustomReport(reportParams)
    
    if (result) {
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 1000)
    }
  }

  const handleChange = (field: string, value: any) => {
    setReportParams(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <Button 
        onClick={handleOpen}
        style={{ 
          backgroundColor: 'var(--ubuntu-orange, #E95420)',
          color: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        <FileText className="w-4 h-4 mr-2" />
        Rapport Personnalisé
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Rapport Personnalisé
            </DialogTitle>
            <DialogDescription>
              Créez un rapport personnalisé selon vos besoins spécifiques.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Type de rapport */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Type de Rapport *
              </label>
              <Select
                value={reportParams.typeRapport}
                onChange={(e) => handleChange('typeRapport', e.target.value)}
              >
                <option value="ventes">Rapport de Ventes</option>
                <option value="depenses">Rapport de Dépenses</option>
                <option value="stocks">Rapport de Stocks</option>
                <option value="financier">Rapport Financier</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Date Début */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Début *
                </label>
                <input
                  type="date"
                  value={reportParams.dateDebut.toISOString().split('T')[0]}
                  onChange={(e) => handleChange('dateDebut', new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* Date Fin */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Fin *
                </label>
                <input
                  type="date"
                  value={reportParams.dateFin.toISOString().split('T')[0]}
                  onChange={(e) => handleChange('dateFin', new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Groupement */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Regroupement par
              </label>
              <Select
                value={reportParams.groupBy}
                onChange={(e) => handleChange('groupBy', e.target.value)}
              >
                <option value="jour">Jour</option>
                <option value="semaine">Semaine</option>
                <option value="mois">Mois</option>
                <option value="categorie">Catégorie</option>
                <option value="produit">Produit</option>
              </Select>
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
                <span className="text-sm">Rapport personnalisé généré avec succès !</span>
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
                  Génération...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Générer le rapport
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}