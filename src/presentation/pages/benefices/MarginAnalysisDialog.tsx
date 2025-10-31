import React, { useState } from 'react'
import { BarChart3, X, Target } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { PeriodeRapport } from '../../../data/models/reports'

interface MarginAnalysisDialogProps {
  periode: PeriodeRapport
  dateDebut: Date
  dateFin: Date
  onSuccess: () => void
}

export const MarginAnalysisDialog: React.FC<MarginAnalysisDialogProps> = ({
  periode,
  dateDebut,
  dateFin,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analysisType, setAnalysisType] = useState<'marge_cible' | 'seuil_rentabilite' | 'optimisation_prix'>('marge_cible')
  const [margeCible, setMargeCible] = useState('30')

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      // Simuler l'analyse
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Margin analysis:', { analysisType, margeCible, periode, dateDebut, dateFin })
      onSuccess()
      setIsOpen(false)
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        style={{ 
          backgroundColor: 'var(--ubuntu-aubergine, #772953)',
          color: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Analyse Avancée
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
                Analyse Avancée des Marges
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
                  Type d'analyse
                </label>
                <Select
                  value={analysisType}
                  onChange={(e) => setAnalysisType(e.target.value as any)}
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <option value="marge_cible">Analyse de marge cible</option>
                  <option value="seuil_rentabilite">Seuil de rentabilité</option>
                  <option value="optimisation_prix">Optimisation des prix</option>
                </Select>
              </div>

              {analysisType === 'marge_cible' && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Marge cible (%)
                  </label>
                  <Input
                    type="number"
                    value={margeCible}
                    onChange={(e) => setMargeCible(e.target.value)}
                    min="0"
                    max="100"
                    style={{
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                    }}
                  />
                </div>
              )}

              <div className="text-sm p-3 rounded-md" style={{ 
                backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)',
                color: 'var(--ubuntu-warm-grey, #AEA79F)'
              }}>
                {analysisType === 'marge_cible' && 'Identifie les produits en dessous de la marge cible'}
                {analysisType === 'seuil_rentabilite' && 'Calcule le point mort et les volumes nécessaires'}
                {analysisType === 'optimisation_prix' && 'Suggère les ajustements de prix optimaux'}
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
                onClick={handleAnalyze}
                disabled={loading}
                style={{ 
                  backgroundColor: 'var(--ubuntu-orange, #E95420)',
                  color: 'var(--ubuntu-white, #FFFFFF)'
                }}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Analyse...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Analyser
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