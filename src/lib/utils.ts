import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0,00 €'
  }
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100) // Assuming amounts are in cents
}

export function formatDate(date: string | Date): string {
  if (!date) return 'N/A'
  
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  } catch {
    return 'Date invalide'
  }
}

export function formatNumber(num: number): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0'
  }
  return num.toLocaleString('fr-FR')
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    completed: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    failed: 'bg-red-100 text-red-800 border-red-200',
    cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
    refunded: 'bg-purple-100 text-purple-800 border-purple-200',
    active: 'bg-green-100 text-green-800 border-green-200',
    expired: 'bg-red-100 text-red-800 border-red-200',
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
    subscription: 'bg-blue-100 text-blue-800 border-blue-200',
    virtual_item: 'bg-purple-100 text-purple-800 border-purple-200',
    flowers: 'bg-pink-100 text-pink-800 border-pink-200',
    gifts: 'bg-purple-100 text-purple-800 border-purple-200',
    premium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    free: 'bg-gray-100 text-gray-800 border-gray-200',
  }
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export function getProviderColor(provider: string): string {
  const colors: Record<string, string> = {
    stripe: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    google_play: 'bg-green-100 text-green-800 border-green-200',
    apple_store: 'bg-gray-100 text-gray-800 border-gray-200',
    paypal: 'bg-blue-100 text-blue-800 border-blue-200',
  }
  return colors[provider] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const calculateROI = (benefice: number, investissement: number): number => {
  return investissement > 0 ? benefice / investissement : 0;
};

export const calculateBreakEven = (coutFixes: number, margeUnitaire: number): number => {
  return margeUnitaire > 0 ? Math.ceil(coutFixes / margeUnitaire) : 0;
};

export const calculateMarginSafety = (chiffreAffaire: number, seuilRentabilite: number): number => {
  return chiffreAffaire > 0 ? (chiffreAffaire - seuilRentabilite) / chiffreAffaire : 0;
};
export const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'À l\'instant'
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} h`
  if (diffInSeconds < 2592000) return `Il y a ${Math.floor(diffInSeconds / 86400)} j`
  if (diffInSeconds < 31536000) return `Il y a ${Math.floor(diffInSeconds / 2592000)} mois`
  return `Il y a ${Math.floor(diffInSeconds / 31536000)} an(s)`
}