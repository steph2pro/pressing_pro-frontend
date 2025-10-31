// presentation/pages/audit/AuditList.tsx
import React, { useState } from 'react'
import { Download, Filter, ChevronLeft, ChevronRight, Eye, FileText, RefreshCw } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { useActionLogs } from '../../../presentation/hooks/audits/useActionLogs'
import { useExportAuditLogs } from '../../../presentation/hooks/audits/useExportAuditLogs'
import { useGenerateAuditReport } from '../../../presentation/hooks/audits/useGenerateAuditReport'
import { formatDate } from '../../../lib/utils'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { GenerateReportDialog } from '../repports/GenerateReportDialog'
import { AuditDetailsDialog } from './AuditDetailsDialog'

export const AuditList: React.FC = () => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedAudit, setSelectedAudit] = useState<any>(null)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)

  const [filters, setFilters] = useState({
    actionType: '',
    user: '',
    dateFrom: '',
    dateTo: '',
    page: 1,
    limit: 10,
  })

  const { 
    actionLogs, 
    isLoading, 
    total, 
    page, 
    limit, 
    pages, 
    isError, 
    error, 
    refetch, 
    updateParams 
  } = useActionLogs({
    ...filters,
    enabled: true
  })

  const { exportAuditLogs, loading: exportLoading } = useExportAuditLogs()
  const { generateAuditReport, loading: reportLoading } = useGenerateAuditReport()

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    setFilters(newFilters)
    updateParams(newFilters)
  }

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage }
    setFilters(newFilters)
    updateParams(newFilters)
  }

  const handleExport = async () => {
    await exportAuditLogs(filters)
  }

  const handleGenerateReport = async (reportParams: any) => {
    const result = await generateAuditReport(reportParams)
    if (result) {
      setReportDialogOpen(false)
      // Optionnel: afficher un message de succès
    }
  }

  const handleViewDetails = (audit: any) => {
    setSelectedAudit(audit)
    setDetailsDialogOpen(true)
  }

  const getActionTypeBadgeVariant = (actionType: string) => {
    switch (actionType) {
      case 'CREATE':
        return 'success'
      case 'UPDATE':
        return 'warning'
      case 'DELETE':
        return 'error'
      case 'READ':
        return 'default'
      default:
        return 'default'
    }
  }

  const getActionTypeText = (actionType: string) => {
    switch (actionType) {
      case 'CREATE': return 'Création'
      case 'UPDATE': return 'Modification'
      case 'DELETE': return 'Suppression'
      case 'READ': return 'Consultation'
      default: return actionType
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'error'
      case 'MEDIUM':
        return 'warning'
      case 'LOW':
        return 'success'
      default:
        return 'default'
    }
  }

  if (isLoading) {
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
            Journal d'Audit
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Suivi des actions et modifications du système
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setReportDialogOpen(true)}
            style={{ 
              backgroundColor: 'var(--ubuntu-aubergine, #772953)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Générer Rapport
          </Button>
          <Button 
            onClick={handleExport}
            disabled={exportLoading}
            style={{ 
              backgroundColor: 'var(--ubuntu-orange, #E95420)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            {exportLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Exporter
          </Button>
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
            Filtres
          </CardTitle>
          <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Filtrez les logs d'audit par type d'action, utilisateur et date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Type d'action
              </label>
              <Select
                value={filters.actionType}
                onChange={(e) => handleFilterChange('actionType', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les types</option>
                <option value="CREATE">Création</option>
                <option value="UPDATE">Modification</option>
                <option value="DELETE">Suppression</option>
                <option value="READ">Consultation</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Utilisateur
              </label>
              <Select
                value={filters.user}
                onChange={(e) => handleFilterChange('user', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les utilisateurs</option>
                {/* Les options d'utilisateurs seraient chargées dynamiquement */}
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Date de début
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
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
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full p-2 border rounded"
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des audits */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Logs d'Audit
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {actionLogs.length} logs sur {total} trouvés
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => refetch()}
              style={{ 
                borderColor: 'var(--ubuntu-orange, #E95420)',
                color: 'var(--ubuntu-orange, #E95420)'
              }}
            >
              Actualiser
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>ID</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Utilisateur</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Action</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Ressource</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Date</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Sévérité</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionLogs.length > 0 ? (
                actionLogs.map((log) => (
                  <TableRow 
                    key={log.id}
                    style={{ 
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                    }}
                  >
                    <TableCell className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      #{log.id}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {log.userName || 'Système'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getActionTypeBadgeVariant(log.actionType)}>
                        {getActionTypeText(log.actionType)}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {log.resourceType}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatDate(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityBadgeVariant(log.severity)}>
                        {log.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(log)}
                          style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Aucun log d'audit trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Page {page} sur {pages} • {total} logs au total
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Précédent
                </Button>
                
                {/* Affichage des numéros de page */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                    let pageNum
                    if (pages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= pages - 2) {
                      pageNum = pages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10 h-10 p-0"
                        style={page === pageNum ? {
                          backgroundColor: 'var(--ubuntu-orange, #E95420)',
                          color: 'var(--ubuntu-white, #FFFFFF)'
                        } : {
                          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                          color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                        }}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pages}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogue des détails d'audit */}
      {detailsDialogOpen && selectedAudit && (
        <AuditDetailsDialog
          audit={selectedAudit}
          onClose={() => setDetailsDialogOpen(false)}
        />
      )}

      {/* Dialogue de génération de rapport */}
      {reportDialogOpen && (
        <GenerateReportDialog
          onGenerate={handleGenerateReport}
          onClose={() => setReportDialogOpen(false)}
          loading={reportLoading}
        />
      )}
    </div>
  )
}