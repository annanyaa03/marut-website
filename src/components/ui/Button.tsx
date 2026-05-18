import React from 'react'

type ButtonProps = {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

export default function Button({ variant, children, href, onClick }: ButtonProps) {
  const baseClasses = "rounded px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors inline-block text-center"
  
  const variantClasses = variant === 'primary' 
    ? "bg-yellow text-dark hover:bg-yellow-hover"
    : "bg-transparent border border-white text-white hover:bg-white hover:text-dark"
    
  const classes = `${baseClasses} ${variantClasses}`
  
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
