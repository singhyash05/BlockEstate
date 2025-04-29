import './Button.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) {
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size} 
    ${fullWidth ? 'button-full-width' : ''}
    ${className}
  `
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button