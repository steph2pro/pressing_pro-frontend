import React, { useState } from 'react'
import { Download, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useExportReport } from '../../../presentation/hooks/reports/useExportReport'
import { PeriodeRapport } from '../../../data/models/reports'

interface ExportReportDialogProps {
  onSuccess: () => void
}

export const ExportReportDialog: React.FC<ExportReportDialogProps> = ({
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [exportParams, setExportParams] = useState({
    typeRapport: 'ventes',
    periode: PeriodeRapport.MENSUEL,
    format: 'excel',
    dateDebut: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    dateFin: new Date()
  })
  
  const { exportReport, loading, error, success } = useExportReport()

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    const result = await exportReport(exportParams)
    
    if (result) {
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 1000)
    }
  }

  const handleChange = (field: string, value: any) => {
    setExportParams(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <Button 
        onClick={handleOpen}
        variant="outline"
        style={{ 
          borderColor: 'var(--ubuntu-aubergine, #772953)',
          color: 'var(--ubuntu-aubergine, #772953)'
        }}
      >
        <Download className="w-4 h-4 mr-2" />
        Exporter
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Exporter un Rapport
            </DialogTitle>
            <DialogDescription>
              Exportez vos données dans le format de votre choix.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Type de rapport */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Type de Rapport
              </label>
              <Select
                value={exportParams.typeRapport}
                onChange={(e) => handleChange('typeRapport', e.target.value)}
              >
                <option value="ventes">Ventes</option>
                <option value="financier">Financier</option>
                <option value="stocks">Stocks</option>
                <option value="utilisateurs">Utilisateurs</option>
              </Select>
            </div>

            {/* Période */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Période
              </label>
              <Select
                value={exportParams.periode}
                onChange={(e) => handleChange('periode', e.target.value as PeriodeRapport)}
              >
                <option value={PeriodeRapport.QUOTIDIEN}>Quotidien</option>
                <option value={PeriodeRapport.HEBDOMADAIRE}>Hebdomadaire</option>
                <option value={PeriodeRapport.MENSUEL}>Mensuel</option>
                <option value={PeriodeRapport.ANNUEL}>Annuel</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Date Début */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Début
                </label>
                <input
                  type="date"
                  value={exportParams.dateDebut.toISOString().split('T')[0]}
                  onChange={(e) => handleChange('dateDebut', new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* Date Fin */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Fin
                </label>
                <input
                  type="date"
                  value={exportParams.dateFin.toISOString().split('T')[0]}
                  onChange={(e) => handleChange('dateFin', new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Format d'export
              </label>
              <Select
                value={exportParams.format}
                onChange={(e) => handleChange('format', e.target.value)}
              >
                <option value="excel">Excel (.xlsx)</option>
                <option value="csv">CSV (.csv)</option>
                <option value="pdf">PDF (.pdf)</option>
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
                <span className="text-sm">Rapport exporté avec succès !</span>
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
                  Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}