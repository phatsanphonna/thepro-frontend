import React from 'react'

type Props = {
  type?: 'primary' | 'outline-primary' | 'secondary' | 'black' | 'outline-black',
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  width?: string
  extraArgument?: string[]
  children: string
}

const Button: React.FC<Props> = ({ children, type, width = 'w-24', extraArgument = [], onClick }: Props) => {

  let className = ['h-12', 'rounded', width, 'font-normal', 'transition-all', 'select-none', ...extraArgument]

  switch (type) {
    case 'primary':
      className.push('bg-mantis', 'border-0', 'text-white', 'hover:ring-2', 'hover:ring-mantis-100')
      break
    case 'outline-primary':
      className.push('bg-transparent', 'border', 'border-mantis', 'text-mantis',  'hover:bg-mantis', 'hover:text-white')
      break
    case 'black':
      className.push('bg-black', 'border-0', 'text-white')
      break
    case 'outline-black':
      className.push('bg-transparent', 'border', 'border-black', 'text-black', 'hover:border-0', 'hover:bg-black', 'hover:text-white')
      break
  }
  return (
    <button className={className.join(' ')} onClick={onClick}>{children}</button>
  )
}

export default Button