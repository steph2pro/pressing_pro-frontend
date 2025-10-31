import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeClasses[size]}`}
        style={{ 
          borderColor: 'var(--ubuntu-orange, #E95420)',
          borderRightColor: 'transparent'
        }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}