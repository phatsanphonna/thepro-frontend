import React from 'react'

type Props = {
  value: string
  placeholder?: string
  type: React.HTMLInputTypeAttribute
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  extraClassName?: string[]
  label?: string
  id?: string
  required?: boolean
  disabled?: boolean
}

const Input: React.FC<Props> = ({
  value, type, placeholder, onChange, onFocus, extraClassName = [],
  label, id, required = false, disabled = false
}) => {
  const className = [
    'transition-all',
    'w-64',
    'p-2',
    'border',
    'border-black',
    'h-10',
    'px-2',
    'rounded',
    'focus:ring',
    'focus:ring-gray-200',
    'disabled:bg-gray-200',
    'disabled:text-gray-500',
    ...extraClassName
  ]

  return (
    <div className='grid gap-y-1'>
      <label htmlFor={id} className='font-medium'>{label}</label>
      <input
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={className.join(' ')}
        required={required}
        disabled={disabled}
        onFocus={onFocus}
      />
    </div>
  )
}

export default Input