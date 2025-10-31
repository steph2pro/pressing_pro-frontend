import React, { useState } from 'react'
import { Download, X } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { PeriodeRapport } from '../../../data/models/reports'

interface ProfitExportDialogProps {
  periode: PeriodeRapport
  dateDebut: Date
  dateFin: Date
  onSuccess: () => void
}

export const ProfitExportDialog: React.FC<ProfitExportDialogProps> = ({
  periode,
  dateDebut,
  dateFin,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [format, setFormat] = useState<'excel' | 'pdf' | 'csv'>('excel')
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      // Simuler l'export
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Exporting profit data:', { format, periode, dateDebut, dateFin })
      onSuccess()
      setIsOpen(false)
    } catch (error) {
      console.error('Erreur lors de l\'export:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        style={{ 
          borderColor: 'var(--ubuntu-orange, #E95420)',
          color: 'var(--ubuntu-orange, #E95420)'
        }}
      >
        <Download className="w-4 h-4 mr-2" />
        Exporter
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
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Exporter les Données de Rentabilité
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Format d'export
                </label>
                <Select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <option value="excel">Excel (.xlsx)</option>
                  <option value="pdf">PDF (.pdf)</option>
                  <option value="csv">CSV (.csv)</option>
                </Select>
              </div>

              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                <p>Période: {dateDebut.toLocaleDateString()} - {dateFin.toLocaleDateString()}</p>
                <p>Données incluses: Bénéfices, marges, analyse par produit et catégorie</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                style={{ 
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={handleExport}
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}