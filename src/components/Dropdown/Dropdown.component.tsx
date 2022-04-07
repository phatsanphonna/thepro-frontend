import styles from './Dropdown.component.module.css'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  valueList: Array<{ name: string, value: string }>
}

const Dropdown: React.FC<Props> = ({ valueList, onChange, disabled = false }) => {
  return (
    <select
      onChange={onChange}
      disabled={disabled}
      className={styles.select}
    >
      {valueList.map((value, index) => (
        <option key={index} value={value.value}>
          {value.name}
        </option>
      ))}
    </select>
  )
}

export default Dropdown