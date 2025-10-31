import React, { useState } from 'react'
import { TrendingUp, DollarSign, Percent, BarChart3, PieChart, Download, Filter, Calendar, Package, Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { useProfitAnalysis } from '../../../presentation/hooks/benefices/useProfitAnalysis'
import { useMarginByCategory } from '../../../presentation/hooks/benefices/useMarginByCategory'
import { useTopProfitableProducts } from '../../../presentation/hooks/benefices/useTopProfitableProducts'

import { formatCurrency, formatDate, formatPercentage } from '../../../lib/utils'
import { MarginAnalysisDialog } from './MarginAnalysisDialog'
import { ProfitExportDialog } from './ProfitExportDialog'
import { ChartComponent } from '../repports/ChartComponent'
import { PeriodeRapport } from '../../../data/models'

export const ProfitMarginAnalysis: React.FC = () => {
  const [periode, setPeriode] = useState<PeriodeRapport>(PeriodeRapport.MENSUEL)
  const [dateRange, setDateRange] = useState({
    dateDebut: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 jours
    dateFin: new Date()
  })
  const [viewType, setViewType] = useState<'overview' | 'products' | 'categories'>('overview')

  const { 
    profitData, 
    isLoading: profitLoading, 
    refetch: refetchProfit 
  } = useProfitAnalysis({
    enabled: true,
    params: { periode, ...dateRange }
  })

  const { 
    marginByCategory, 
    isLoading: marginLoading 
  } = useMarginByCategory({ 
    enabled: true,
    params: { periode, ...dateRange }
  })

  const { 
    topProfitableProducts, 
    isLoading: productsLoading 
  } = useTopProfitableProducts({ 
    enabled: true,
    params: { periode, ...dateRange }
  })

  const handlePeriodeChange = (newPeriode: PeriodeRapport) => {
    setPeriode(newPeriode)
  }

  const handleDateRangeChange = (field: string, value: Date) => {
    setDateRange(prev => ({ ...prev, [field]: value }))
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

  const getMarginLevel = (marge: number) => {
    if (marge >= 0.4) return { text: 'Élevée', variant: 'success' as const }
    if (marge >= 0.2) return { text: 'Moyenne', variant: 'warning' as const }
    return { text: 'Faible', variant: 'error' as const }
  }

  if (profitLoading) {
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
            Analyse des Bénéfices et Marges
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Suivez votre rentabilité et optimisez vos marges
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <MarginAnalysisDialog 
            periode={periode}
            dateDebut={dateRange.dateDebut}
            dateFin={dateRange.dateFin}
            onSuccess={() => refetchProfit()}
          />
          <ProfitExportDialog 
            periode={periode}
            dateDebut={dateRange.dateDebut}
            dateFin={dateRange.dateFin}
            onSuccess={() => refetchProfit()}
          />
        </div>
      </div>

      {/* Filtres et navigation */}
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
          <div className="grid gap-4 md:grid-cols-5">
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
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Vue
              </label>
              <Select
                value={viewType}
                onChange={(e) => setViewType(e.target.value as any)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="overview">Vue d'ensemble</option>
                <option value="products">Par produit</option>
                <option value="categories">Par catégorie</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => refetchProfit()}
                variant="outline"
                className="w-full"
                style={{ 
                  borderColor: 'var(--ubuntu-orange, #E95420)',
                  color: 'var(--ubuntu-orange, #E95420)'
                }}
              >
                Actualiser
              </Button>
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
              Bénéfice Net
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {formatCurrency(profitData?.beneficeNet || 0)}
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
              <Percent className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
              Marge Moyenne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {formatPercentage(profitData?.margeMoyenne || 0)}
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {getMarginLevel(profitData?.margeMoyenne || 0).text}
            </p>
          </CardContent>
        </Card>

        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-light-orange, #F6B024)' }} />
              ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {formatPercentage(profitData?.roi || 0)}
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Return on Investment
            </p>
          </CardContent>
        </Card>

        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Coûts Variables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {formatCurrency(profitData?.coutVariables || 0)}
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {formatPercentage((profitData?.coutVariables || 0) / (profitData?.chiffreAffaire || 1))} du CA
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Vue détaillée selon le type */}
      {viewType === 'overview' && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Évolution des bénéfices */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                Évolution des Bénéfices
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {getPeriodeText(periode)} - {formatDate(dateRange.dateDebut)} au {formatDate(dateRange.dateFin)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ChartComponent 
                  chartData={profitData?.evolutionBénéfices || []}
                  isLoading={profitLoading}
                  type="line"
                  title="Évolution des bénéfices"
                />
              </div>
            </CardContent>
          </Card>

          {/* Répartition des marges */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
                Répartition des Marges
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Par niveau de rentabilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ChartComponent 
                  chartData={profitData?.repartitionMarges || []}
                  isLoading={profitLoading}
                  type="camembert"
                  title="Répartition des marges"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {viewType === 'products' && (
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Analyse de Rentabilité par Produit
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Top 20 des produits les plus rentables
            </CardDescription>
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <div className="flex items-center justify-center h-40">
                <LoadingSpinner size="md" />
              </div>
            ) : topProfitableProducts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
                    <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Produit</TableHead>
                    <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Catégorie</TableHead>
                    <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Prix Achat</TableHead>
                    <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Prix Vente</TableHead>
                    <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Marge Unit.</TableHead>
                    <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Marge %</TableHead>
                    <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Quantité</TableHead>
                    <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Bénéfice Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProfitableProducts.map((produit) => (
                    <TableRow key={produit.produitId}>
                      <TableCell className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {produit.produit?.nom || `Produit #${produit.produitId}`}
                      </TableCell>
                      <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {produit.produit?.categorie?.nom || 'Non catégorisé'}
                      </TableCell>
                      <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {formatCurrency(produit.prixAchatMoyen)}
                      </TableCell>
                      <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {formatCurrency(produit.prixVenteMoyen)}
                      </TableCell>
                      <TableCell style={{ color: 'var(--ubuntu-aubergine, #772953)' }}>
                        {formatCurrency(produit.margeUnitaire)}
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          produit.margePourcentage >= 0.4 ? 'bg-green-100 text-green-800' :
                          produit.margePourcentage >= 0.2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {formatPercentage(produit.margePourcentage)}
                        </div>
                      </TableCell>
                      <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {produit.quantiteVendue}
                      </TableCell>
                      <TableCell className="font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {formatCurrency(produit.beneficeTotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune donnée de rentabilité par produit</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {viewType === 'categories' && (
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
              Analyse de Rentabilité par Catégorie
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Performance financière par catégorie de produits
            </CardDescription>
          </CardHeader>
          <CardContent>
            {marginLoading ? (
              <div className="flex items-center justify-center h-40">
                <LoadingSpinner size="md" />
              </div>
            ) : marginByCategory.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  {marginByCategory.map((categorie) => (
                    <div key={categorie.categorieId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {categorie.categorie?.nom || `Catégorie #${categorie.categorieId}`}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          categorie.margeMoyenne >= 0.4 ? 'bg-green-100 text-green-800' :
                          categorie.margeMoyenne >= 0.2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {formatPercentage(categorie.margeMoyenne)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Chiffre d'Affaires</div>
                          <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            {formatCurrency(categorie.chiffreAffaire)}
                          </div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Bénéfice Total</div>
                          <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            {formatCurrency(categorie.beneficeTotal)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Performance</span>
                          <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                            {((categorie.beneficeTotal / categorie.chiffreAffaire) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${(categorie.beneficeTotal / categorie.chiffreAffaire) * 100}%`,
                              backgroundColor: categorie.margeMoyenne >= 0.4 ? '#10B981' :
                                              categorie.margeMoyenne >= 0.2 ? '#F59E0B' : '#EF4444'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <ChartComponent 
                    chartData={marginByCategory.map(cat => ({
                      label: cat.categorie?.nom || `Catégorie ${cat.categorieId}`,
                      value: cat.beneficeTotal
                    }))}
                    isLoading={marginLoading}
                    type="camembert"
                    title="Bénéfice par catégorie"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                <Tag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune donnée de rentabilité par catégorie</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}