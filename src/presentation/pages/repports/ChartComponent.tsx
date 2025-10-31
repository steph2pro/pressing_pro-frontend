import React from 'react'
import { BarChart3, PieChart, LineChart, TrendingUp } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { DonneesGraphique } from '../../../data/models/reports'

interface ChartComponentProps {
  chartData?: DonneesGraphique
  isLoading: boolean
  type: 'barres' | 'courbes' | 'camembert' | 'ligne'
  onTypeChange: (type: 'barres' | 'courbes' | 'camembert' | 'ligne') => void
}

export const ChartComponent: React.FC<ChartComponentProps> = ({
  chartData,
  isLoading,
  type,
  onTypeChange
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <TrendingUp className="w-16 h-16 mb-4 opacity-50" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
        <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Aucune donnée disponible pour le graphique</p>
        <p className="text-sm mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
          Modifiez les filtres ou la période pour voir les données
        </p>
      </div>
    )
  }

  // Ici vous intégreriez votre bibliothèque de graphiques préférée (Chart.js, Recharts, etc.)
  // Pour l'exemple, nous affichons un placeholder

  return (
    <div className="space-y-4">
      {/* Contrôles du type de graphique */}
      <div className="flex justify-end space-x-2">
        <Button
          variant={type === 'barres' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTypeChange('barres')}
          style={type === 'barres' ? {
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          } : {}}
        >
          <BarChart3 className="w-4 h-4 mr-1" />
          Barres
        </Button>
        <Button
          variant={type === 'ligne' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTypeChange('ligne')}
          style={type === 'ligne' ? {
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          } : {}}
        >
          <LineChart className="w-4 h-4 mr-1" />
          Ligne
        </Button>
        <Button
          variant={type === 'camembert' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTypeChange('camembert')}
          style={type === 'camembert' ? {
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          } : {}}
        >
          <PieChart className="w-4 h-4 mr-1" />
          Camembert
        </Button>
      </div>

      {/* Placeholder pour le graphique */}
      <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Graphique {type === 'barres' ? 'en barres' : type === 'ligne' ? 'en ligne' : 'camembert'}
          </div>
          <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            {chartData.labels.length} points de données
          </div>
          <div className="mt-4 text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Intégrez ici votre bibliothèque de graphiques préférée
          </div>
        </div>
      </div>

      {/* Légende */}
      {chartData.datasets && chartData.datasets.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {chartData.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dataset.backgroundColor?.[0] || '#E95420' }}
              ></div>
              <span className="text-sm" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {dataset.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}