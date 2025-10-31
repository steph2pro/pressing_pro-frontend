import React, { useState } from 'react'
import { BarChart3, PieChart, LineChart, TrendingUp, Download, Filter, Calendar, DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useStatistics } from '../../../presentation/hooks/reports/useStatistics'
import { useTopProducts } from '../../../presentation/hooks/reports/useTopProducts'
import { usePerformanceByCategory } from '../../../presentation/hooks/reports/usePerformanceByCategory'
import { useChartData } from '../../../presentation/hooks/reports/useChartData'
import { PeriodeRapport } from '../../../data/models/reports'
import { formatCurrency, formatDate } from '../../../lib/utils'
import { FinancialReportDialog } from './FinancialReportDialog'
import { CustomReportDialog } from './CustomReportDialog'
import { ExportReportDialog } from './ExportReportDialog'
import { SalesReportDialog } from './SalesReportDialog'
import { ChartComponent } from './ChartComponent'

export const ReportDashboard: React.FC = () => {
  const [periode, setPeriode] = useState<PeriodeRapport>(PeriodeRapport.MENSUEL)
  const [dateRange, setDateRange] = useState({
    dateDebut: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 jours
    dateFin: new Date()
  })

  const { statistics, isLoading: statsLoading, refetch: refetchStats } = useStatistics({
    enabled: true,
    params: { periode, ...dateRange }
  })

  const { topProducts, isLoading: topProductsLoading } = useTopProducts({ enabled: true })
  const { performanceByCategory, isLoading: performanceLoading } = usePerformanceByCategory({ enabled: true })
  
  const { chartData, isLoading: chartLoading, updateParams: updateChartParams } = useChartData({
    metrique: 'chiffre_affaire',
    periode: periode,
    type: 'barres',
    ...dateRange
  })

  const handlePeriodeChange = (newPeriode: PeriodeRapport) => {
    setPeriode(newPeriode)
    updateChartParams({ periode: newPeriode })
  }

  const handleDateRangeChange = (field: string, value: Date) => {
    const newDateRange = { ...dateRange, [field]: value }
    setDateRange(newDateRange)
    updateChartParams(newDateRange)
  }

  const getPeriodeText = (periode: PeriodeRapport) => {
    switch (periode) {
      case PeriodeRapport.QUOTIDIEN: return 'Quotidien'
      case PeriodeRapport.HEBDOMADAIRE: return 'Hebdomadaire'
      case PeriodeRapport.MENSUEL: return 'Mensuel'
      case PeriodeRapport.ANNUEL: return 'Annuel'
      default: return periode
    }
  }

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6" style={{ 
      backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)',
      minHeight: '100vh'
    }}>
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Tableau de Bord Analytique
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Analysez vos performances et générez des rapports détaillés
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <CustomReportDialog onSuccess={() => refetchStats()} />
          <ExportReportDialog onSuccess={() => refetchStats()} />
        </div>
      </div>

      {/* Filtres */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
            Filtres et Période
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Période
              </label>
              <Select
                value={periode}
                onChange={(e) => handlePeriodeChange(e.target.value as PeriodeRapport)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value={PeriodeRapport.QUOTIDIEN}>Quotidien</option>
                <option value={PeriodeRapport.HEBDOMADAIRE}>Hebdomadaire</option>
                <option value={PeriodeRapport.MENSUEL}>Mensuel</option>
                <option value={PeriodeRapport.ANNUEL}>Annuel</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Date Début
              </label>
              <input
                type="date"
                value={dateRange.dateDebut.toISOString().split('T')[0]}
                onChange={(e) => handleDateRangeChange('dateDebut', new Date(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Date Fin
              </label>
              <input
                type="date"
                value={dateRange.dateFin.toISOString().split('T')[0]}
                onChange={(e) => handleDateRangeChange('dateFin', new Date(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              />
            </div>
            <div className="flex items-end space-x-2">
              <FinancialReportDialog 
                periode={periode}
                dateDebut={dateRange.dateDebut}
                dateFin={dateRange.dateFin}
                onSuccess={() => refetchStats()}
              />
              <SalesReportDialog 
                periode={periode}
                dateDebut={dateRange.dateDebut}
                dateFin={dateRange.dateFin}
                onSuccess={() => refetchStats()}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cartes de statistiques principales */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Chiffre d'Affaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {formatCurrency(statistics[0]?.chiffreAffaire || 0)}
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {getPeriodeText(periode)}
            </p>
          </CardContent>
        </Card>

        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
              Bénéfice Net
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {formatCurrency(statistics[0]?.benefice || 0)}
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Marge: {((statistics[0]?.marge || 0) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-light-orange, #F6B024)' }} />
              Total Ventes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {statistics[0]?.totalVentes || 0}
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Transactions
            </p>
          </CardContent>
        </Card>

        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Utilisateurs Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {statistics[0]?.utilisateursActifs || 0}
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Fréquence: {statistics[0]?.frequenceConnexions || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques et visualisations */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Graphique principal */}
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Évolution du Chiffre d'Affaires
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {getPeriodeText(periode)} - {formatDate(dateRange.dateDebut)} au {formatDate(dateRange.dateFin)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartComponent 
              chartData={chartData}
              isLoading={chartLoading}
              type="barres"
              onTypeChange={(type) => updateChartParams({ type })}
            />
          </CardContent>
        </Card>

        {/* Top produits */}
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
              Top Produits
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Produits les plus vendus
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topProductsLoading ? (
              <div className="flex items-center justify-center h-40">
                <LoadingSpinner size="md" />
              </div>
            ) : topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.slice(0, 5).map((produit, index) => (
                  <div key={produit.produitId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {produit.produit?.nom || `Produit #${produit.produitId}`}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          {produit.quantiteVendue} unités
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                        {formatCurrency(produit.chiffreAffaire)}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        Marge: {((produit.marge / produit.chiffreAffaire) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune donnée de produits</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance par catégorie */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
            Performance par Catégorie
          </CardTitle>
          <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Répartition du chiffre d'affaires par catégorie
          </CardDescription>
        </CardHeader>
        <CardContent>
          {performanceLoading ? (
            <div className="flex items-center justify-center h-40">
              <LoadingSpinner size="md" />
            </div>
          ) : performanceByCategory.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {performanceByCategory.map((categorie) => (
                  <div key={categorie.categorieId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {categorie.categorie?.nom || `Catégorie #${categorie.categorieId}`}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {categorie.quantiteVendue} ventes
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold" style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                        {formatCurrency(categorie.chiffreAffaire)}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        Marge: {((categorie.marge / categorie.chiffreAffaire) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <ChartComponent 
                  chartData={chartData}
                  isLoading={chartLoading}
                  type="camembert"
                  onTypeChange={(type) => updateChartParams({ type })}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune donnée de performance par catégorie</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}