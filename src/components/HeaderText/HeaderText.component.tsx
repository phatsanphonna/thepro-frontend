import styles from './HeaderText.component.module.css'

type Props = {
  children: React.ReactNode
}

const HeaderText: React.FC<Props> = ({ children }) => {
  return (
    <header>
      <h1 className={styles.header}>
        {children}
      </h1>
    </header>
  )
}

export default HeaderText