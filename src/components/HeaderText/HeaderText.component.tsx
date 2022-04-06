import styles from './HeaderText.component.module.css'

type Props = {}

const HeaderText: React.FC = ({ children }) => {
  return (
    <header>
      <h1 className={styles.header}>
        {children}
      </h1>
    </header>
  )
}

export default HeaderText