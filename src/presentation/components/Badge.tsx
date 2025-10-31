import React from 'react'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'status' | 'outline'
  status?: string
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', status, children }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: 'var(--ubuntu-light-green, #DCFCE7)',
          color: 'var(--ubuntu-dark-green, #166534)',
          border: '1px solid #BBF7D0'
        }
      case 'warning':
        return {
          backgroundColor: 'var(--ubuntu-light-orange, #F6B024)',
          color: 'var(--ubuntu-white, #FFFFFF)',
          border: 'none'
        }
      case 'error':
        return {
          backgroundColor: 'var(--ubuntu-light-red, #FECACA)',
          color: 'var(--ubuntu-dark-red, #991B1B)',
          border: '1px solid #FCA5A5'
        }
      case 'info':
        return {
          backgroundColor: 'var(--ubuntu-light-blue, #DBEAFE)',
          color: 'var(--ubuntu-dark-blue, #1E40AF)',
          border: '1px solid #BFDBFE'
        }
      case 'status':
        switch (status) {
          case 'completed':
          case 'validated':
            return {
              backgroundColor: '#DCFCE7',
              color: '#166534',
              border: '1px solid #BBF7D0'
            }
          case 'pending':
            return {
              backgroundColor: '#FEF9C3',
              color: '#854D0E',
              border: '1px solid #FDE047'
            }
          case 'failed':
          case 'cancelled':
            return {
              backgroundColor: '#FECACA',
              color: '#991B1B',
              border: '1px solid #FCA5A5'
            }
          default:
            return getDefaultStyles()
        }
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--ubuntu-aubergine, #772953)',
          border: '1px solid var(--ubuntu-aubergine, #772953)'
        }
      default:
        return getDefaultStyles()
    }
  }

  const getDefaultStyles = () => ({
    backgroundColor: 'var(--ubuntu-light-grey, #E0E0E0)',
    color: 'var(--ubuntu-dark-aubergine, #2C001E)',
    border: 'none'
  })

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={getVariantStyles()}
    >
      {children}
    </span>
  )
}
