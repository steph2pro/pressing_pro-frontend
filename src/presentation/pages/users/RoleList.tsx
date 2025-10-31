import React, { useState } from 'react'
import { Eye, Plus, Trash2, Edit, Filter, ChevronLeft, ChevronRight, Shield, Users, Key } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { Input } from '../../components/ui/input'
import { useRoles } from '../../../presentation/hooks/users/useRoles'
import { useRoleStatistics } from '../../../presentation/hooks/users/useRoleStatistics'
import { useNavigate } from 'react-router-dom'
import { Role } from '../../../data/models/roles'
import { formatDate } from '../../../lib/utils'
import { getRolePermissionsSummary } from '../../../lib/permissions'
import { CreateRoleDialog } from './CreateRoleDialog'
import { DeleteRoleDialog } from './DeleteRoleDialog'

export const RoleList: React.FC = () => {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)
  
  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    limit: 10,
  })

  const { 
    roles, 
    isLoading, 
    total, 
    page, 
    limit, 
    pages, 
    isError, 
    error, 
    refetch 
  } = useRoles({
    params: filters,
    enabled: true
  })

  const { statistics } = useRoleStatistics({ enabled: true })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    setFilters(newFilters)
  }

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage }
    setFilters(newFilters)
  }

  const handleViewMore = (role: Role) => {
    navigate(`/users/roles/${role.id}`)
  }

  const handleEdit = (role: Role) => {
    navigate(`/users/roles/${role.id}/edit`)
  }

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async (role: Role) => {
    try {
      console.log('Suppression du rôle:', role.id)
      refetch()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setDeleteDialogOpen(false)
      setRoleToDelete(null)
    }
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false)
    setRoleToDelete(null)
  }

  const handleSuccess = () => {
    refetch()
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
            Gestion des Rôles
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Gérez les rôles et permissions du système
          </p>
        </div>
        <CreateRoleDialog onSuccess={handleSuccess} />
      </div>

      {/* Cartes de statistiques */}
      {statistics && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Total Rôles
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.totalRoles}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-orange, #E95420)' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Permissions Total
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.totalPermissions}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-aubergine, #772953)' }}>
                  <Key className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Rôle le plus utilisé
                  </p>
                  <p className="text-lg font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.roleUsage?.[0]?.role || 'N/A'}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-light-orange, #F6B024)' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
            Recherchez des rôles par nom ou description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-3">
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Recherche
              </label>
              <Input
                type="text"
                placeholder="Nom ou description du rôle..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              />
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => refetch()}
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

      {/* Tableau des rôles */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Liste des Rôles
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {roles.length} rôles sur {total} trouvés
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Rôle</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Code</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Description</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Permissions</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Utilisateurs</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Date création</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.length > 0 ? (
                roles.map((role) => {
                  const permissionsSummary = getRolePermissionsSummary(role)
                  return (
                    <TableRow 
                      key={role.id}
                      style={{ 
                        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                      }}
                    >
                      <TableCell>
                        <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {role.nom}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {role.code}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {role.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="success">
                            {permissionsSummary.total} perm.
                          </Badge>
                          {Object.entries(permissionsSummary.categories).slice(0, 2).map(([category, count]) => (
                            <Badge key={category} variant="outline">
                              {category}: {count}
                            </Badge>
                          ))}
                          {Object.keys(permissionsSummary.categories).length > 2 && (
                            <Badge variant="outline">
                              +{Object.keys(permissionsSummary.categories).length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                          <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            {role.utilisateursCount}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {formatDate(role.dateCreation)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewMore(role)}
                            style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(role)}
                            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(role)}
                            style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Aucun rôle trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Page {page} sur {pages} • {total} rôles au total
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

      {/* Dialogue de suppression */}
      {deleteDialogOpen && roleToDelete && (
        <DeleteRoleDialog
          role={roleToDelete}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
        />
      )}
    </div>
  )
}