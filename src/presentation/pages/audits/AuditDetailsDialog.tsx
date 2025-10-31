// presentation/pages/audit/AuditDetailsDialog.tsx
import React from 'react'
import { X, User, Calendar, FileText, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'

interface AuditDetailsDialogProps {
  audit: any
  onClose: () => void
}

export const AuditDetailsDialog: React.FC<AuditDetailsDialogProps> = ({
  audit,
  onClose
}) => {
  const getActionTypeBadgeVariant = (actionType: string) => {
    switch (actionType) {
      case 'CREATE': return 'success'
      case 'UPDATE': return 'warning'
      case 'DELETE': return 'error'
      case 'READ': return 'default'
      default: return 'default'
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'error'
      case 'MEDIUM': return 'warning'
      case 'LOW': return 'success'
      default: return 'default'
    }
  }

  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Détails du Log d'Audit #{audit.id}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                <span className="font-medium">Utilisateur:</span>
              </div>
              <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {audit.userName || 'Système'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                <span className="font-medium">Date et heure:</span>
              </div>
              <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {new Date(audit.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                <span className="font-medium">Type d'action:</span>
              </div>
              <Badge variant={getActionTypeBadgeVariant(audit.actionType)}>
                {audit.actionType}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                <span className="font-medium">Sévérité:</span>
              </div>
              <Badge variant={getSeverityBadgeVariant(audit.severity)}>
                {audit.severity}
              </Badge>
            </div>
          </div>

          {/* Ressource */}
          <div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Informations sur la ressource
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Type de ressource:</span>
                <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{audit.resourceType}</p>
              </div>
              <div>
                <span className="text-sm font-medium">ID de la ressource:</span>
                <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{audit.resourceId}</p>
              </div>
            </div>
          </div>

          {/* Données avant/après */}
          {(audit.oldData || audit.newData) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audit.oldData && (
                <div>
                  <h3 className="font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Données avant modification
                  </h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {formatJson(audit.oldData)}
                  </pre>
                </div>
              )}
              {audit.newData && (
                <div>
                  <h3 className="font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Données après modification
                  </h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {formatJson(audit.newData)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {audit.description && (
            <div>
              <h3 className="font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Description
              </h3>
              <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{audit.description}</p>
            </div>
          )}

          {/* IP et User Agent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audit.ipAddress && (
              <div>
                <span className="text-sm font-medium">Adresse IP:</span>
                <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{audit.ipAddress}</p>
              </div>
            )}
            {audit.userAgent && (
              <div>
                <span className="text-sm font-medium">User Agent:</span>
                <p className="text-sm" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  {audit.userAgent}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}