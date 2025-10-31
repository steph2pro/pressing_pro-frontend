// presentation/pages/audit/GenerateReportDialog.tsx
import React, { useState } from 'react'
import { X, Download, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'

interface GenerateReportDialogProps {
  onGenerate: (params: any) => void
  onClose: () => void
  loading: boolean
}

export const GenerateReportDialog: React.FC<GenerateReportDialogProps> = ({
  onGenerate,
  onClose,
  loading
}) => {
  const [reportParams, setReportParams] = useState({
    reportType: 'SUMMARY',
    format: 'PDF',
    dateRange: 'LAST_7_DAYS',
    customDateFrom: '',
    customDateTo: '',
    includeDetails: true
  })

  const handleParamChange = (key: string, value: string | boolean) => {
    setReportParams(prev => ({ ...prev, [key]: value }))
  }

  const handleGenerate = () => {
    onGenerate(reportParams)
  }

  const dateRangeOptions = [
    { value: 'LAST_7_DAYS', label: '7 derniers jours' },
    { value: 'LAST_30_DAYS', label: '30 derniers jours' },
    { value: 'LAST_90_DAYS', label: '90 derniers jours' },
    { value: 'CURRENT_MONTH', label: 'Mois en cours' },
    { value: 'CUSTOM', label: 'Période personnalisée' }
  ]

  const reportTypeOptions = [
    { value: 'SUMMARY', label: 'Rapport sommaire' },
    { value: 'DETAILED', label: 'Rapport détaillé' },
    { value: 'SECURITY', label: 'Rapport de sécurité' },
    { value: 'COMPLIANCE', label: 'Rapport de conformité' }
  ]

  const formatOptions = [
    { value: 'PDF', label: 'PDF' },
    { value: 'EXCEL', label: 'Excel' },
    { value: 'CSV', label: 'CSV' }
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Générer un Rapport d'Audit
            </span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Type de rapport */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Type de rapport
            </label>
            <Select
              value={reportParams.reportType}
              onChange={(e) => handleParamChange('reportType', e.target.value)}
            >
              {reportTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Format */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Format du rapport
            </label>
            <Select
              value={reportParams.format}
              onChange={(e) => handleParamChange('format', e.target.value)}
            >
              {formatOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Période */}
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Période
            </label>
            <Select
              value={reportParams.dateRange}
              onChange={(e) => handleParamChange('dateRange', e.target.value)}
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Dates personnalisées */}
          {reportParams.dateRange === 'CUSTOM' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Date de début
                </label>
                <input
                  type="date"
                  value={reportParams.customDateFrom}
                  onChange={(e) => handleParamChange('customDateFrom', e.target.value)}
                  className="w-full p-2 border rounded"
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Date de fin
                </label>
                <input
                  type="date"
                  value={reportParams.customDateTo}
                  onChange={(e) => handleParamChange('customDateTo', e.target.value)}
                  className="w-full p-2 border rounded"
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Options supplémentaires */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includeDetails"
              checked={reportParams.includeDetails}
              onChange={(e) => handleParamChange('includeDetails', e.target.checked)}
              className="rounded"
            />
            <label htmlFor="includeDetails" className="text-sm" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Inclure les détails des logs
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              style={{ 
                borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                color: 'var(--ubuntu-dark-aubergine, #2C001E)'
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={loading}
              style={{ 
                backgroundColor: 'var(--ubuntu-orange, #E95420)',
                color: 'var(--ubuntu-white, #FFFFFF)'
              }}
            >
              {loading ? 'Génération...' : 'Générer le rapport'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}