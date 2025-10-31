import React, { useState } from 'react'
import { Eye, Plus, Trash2, Edit, Filter, ChevronLeft, ChevronRight, Users, UserCheck, UserX, Shield } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { Input } from '../../components/ui/input'
import { useUsers } from '../../../presentation/hooks/users/useUsers'
import { useNavigate } from 'react-router-dom'
import { User, UserRole, UserStatus } from '../../../data/models/users'
import { formatDate } from '../../../lib/utils'
import { getRoleDisplayName, getStatusDisplayName } from '../../../lib/permissions'
import { DeleteUserDialog } from './DeleteUserDialog'
import { CreateUserDialog } from './CreateUserDialog'
import { useUserStatistics } from '../../hooks/users/useUserStatistics'

 const UserList: React.FC = () => {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    statut: '',
    page: 1,
    limit: 10,
  })

  const { 
    users, 
    isLoading, 
    total, 
    page, 
    limit, 
    pages, 
    isError, 
    error, 
    refetch 
  } = useUsers({
    params: filters,
    enabled: true
  })

  const { statistics } = useUserStatistics({ enabled: true })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    setFilters(newFilters)
  }

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage }
    setFilters(newFilters)
  }

  const getStatusBadgeVariant = (statut: UserStatus) => {
    switch (statut) {
      case UserStatus.ACTIVE: return 'success'
      case UserStatus.INACTIVE: return 'warning'
      case UserStatus.SUSPENDED: return 'error'
      default: return 'default'
    }
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'error'
      case UserRole.DIRECTOR: return 'warning'
      case UserRole.MANAGER: return 'info'
      case UserRole.CASHIER: return 'success'
      case UserRole.EMPLOYEE: return 'default'
      default: return 'default'
    }
  }

  const handleViewMore = (user: User) => {
    navigate(`/users/${user.id}`)
  }

  const handleEdit = (user: User) => {
    navigate(`/users/${user.id}/edit`)
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async (user: User) => {
    try {
      // La logique de suppression sera gérée dans le hook
      console.log('Suppression de l\'utilisateur:', user.id)
      refetch()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
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
            Gestion des Utilisateurs
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Gérez les accès et permissions des utilisateurs
          </p>
        </div>
        <CreateUserDialog onSuccess={handleSuccess} />
      </div>

      {/* Cartes de statistiques */}
      {statistics && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Total Utilisateurs
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.totalUsers}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-orange, #E95420)' }}>
                  <Users className="w-6 h-6 text-white" />
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
                    Utilisateurs Actifs
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.activeUsers}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-aubergine, #772953)' }}>
                  <UserCheck className="w-6 h-6 text-white" />
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
                    Utilisateurs Inactifs
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.inactiveUsers}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  <UserX className="w-6 h-6 text-white" />
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
                    Nouveaux ce mois
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.newUsersThisMonth}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-light-orange, #F6B024)' }}>
                  <Shield className="w-6 h-6 text-white" />
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
            Filtrez les utilisateurs par rôle et statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Recherche
              </label>
              <Input
                type="text"
                placeholder="Nom ou email..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Rôle
              </label>
              <Select
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les rôles</option>
                <option value={UserRole.ADMIN}>Administrateur</option>
                <option value={UserRole.DIRECTOR}>Directeur</option>
                <option value={UserRole.MANAGER}>Manager</option>
                <option value={UserRole.CASHIER}>Caissier</option>
                <option value={UserRole.EMPLOYEE}>Employé</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Statut
              </label>
              <Select
                value={filters.statut}
                onChange={(e) => handleFilterChange('statut', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les statuts</option>
                <option value={UserStatus.ACTIVE}>Actif</option>
                <option value={UserStatus.INACTIVE}>Inactif</option>
                <option value={UserStatus.SUSPENDED}>Suspendu</option>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button 
                onClick={() => navigate('/users/roles')}
                className="flex-1"
                style={{ 
                  backgroundColor: 'var(--ubuntu-aubergine, #772953)',
                  color: 'var(--ubuntu-white, #FFFFFF)'
                }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Gestion des Rôles
              </Button>
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
          </div>
        </CardContent>
      </Card>

      {/* Tableau des utilisateurs */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Liste des Utilisateurs
              </CardTitle>
              <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {users.length} utilisateurs sur {total} trouvés
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Utilisateur</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Email</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Téléphone</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Rôle</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Statut</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Dernière connexion</TableHead>
                <TableHead style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow 
                    key={user.id}
                    style={{ 
                      borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                      backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                    }}
                  >
                    <TableCell>
                      <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {user.nom}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        Créé le {formatDate(user.dateCreation)}
                      </div>
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {user.email}
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {user.telephone || 'Non renseigné'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(user.statut)}>
                        {getStatusDisplayName(user.statut)}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Jamais connecté'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMore(user)}
                          style={{ color: 'var(--ubuntu-aubergine, #772953)' }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
                          style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(user)}
                          style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Page {page} sur {pages} • {total} utilisateurs au total
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
      {deleteDialogOpen && userToDelete && (
        <DeleteUserDialog
          user={userToDelete}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
        />
      )}
    </div>
  )
}

export default UserList