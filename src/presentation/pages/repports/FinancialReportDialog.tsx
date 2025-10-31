import React, { useState } from 'react'
import { DollarSign, AlertCircle, Download } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useFinancialReport } from '../../../presentation/hooks/reports/useFinancialReport'
import { PeriodeRapport, RapportRequest } from '../../../data/models/reports'
import { formatCurrency, formatDate } from '../../../lib/utils'

interface FinancialReportDialogProps {
  periode: PeriodeRapport
  dateDebut: Date
  dateFin: Date
  onSuccess: () => void
}

export const FinancialReportDialog: React.FC<FinancialReportDialogProps> = ({
  periode,
  dateDebut,
  dateFin,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [reportParams, setReportParams] = useState<RapportRequest>({
    periode,
    dateDebut,
    dateFin
  })
  
  const { generateFinancialReport, data, loading, error, success } = useFinancialReport()

  const handleOpen = () => {
    setIsOpen(true)
    setReportParams({ periode, dateDebut, dateFin })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    const result = await generateFinancialReport(reportParams)
    
    if (result) {
      setTimeout(() => {
        onSuccess()
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
        variant="outline"
        style={{ 
          borderColor: 'var(--ubuntu-aubergine, #772953)',
          color: 'var(--ubuntu-aubergine, #772953)'
        }}
      >
        <DollarSign className="w-4 h-4 mr-2" />
        Rapport Financier
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Rapport Financier
            </DialogTitle>
            <DialogDescription>
              Générez un rapport financier détaillé pour la période sélectionnée.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Paramètres du rapport */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Période
                </label>
                <Select
                  value={reportParams.periode}
                  onChange={(e) => handleChange('periode', e.target.value as PeriodeRapport)}
                >
                  <option value={PeriodeRapport.QUOTIDIEN}>Quotidien</option>
                  <option value={PeriodeRapport.HEBDOMADAIRE}>Hebdomadaire</option>
                  <option value={PeriodeRapport.MENSUEL}>Mensuel</option>
                  <option value={PeriodeRapport.ANNUEL}>Annuel</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Début
                </label>
                <input
                  type="date"
                  value={reportParams.dateDebut?.toISOString().split('T')[0] || ''}
                  onChange={(e) => handleChange('dateDebut', new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Fin
                </label>
                <input
                  type="date"
                  value={reportParams.dateFin?.toISOString().split('T')[0] || ''}
                  onChange={(e) => handleChange('dateFin', new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Aperçu du rapport */}
            {data && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold mb-3">Aperçu du Rapport Financier</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Période:</span> {data.periode}
                  </div>
                  <div>
                    <span className="font-medium">Revenus:</span> {formatCurrency(data.revenus)}
                  </div>
                  <div>
                    <span className="font-medium">Dépenses:</span> {formatCurrency(data.depenses)}
                  </div>
                  <div>
                    <span className="font-medium">Bénéfice Net:</span> {formatCurrency(data.beneficeNet)}
                  </div>
                  <div>
                    <span className="font-medium">Marge:</span> {(data.marge * 100).toFixed(1)}%
                  </div>
                  <div>
                    <span className="font-medium">Transactions:</span> {data.transactions.length}
                  </div>
                </div>
              </div>
            )}

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
                <span className="text-sm">Rapport financier généré avec succès !</span>
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