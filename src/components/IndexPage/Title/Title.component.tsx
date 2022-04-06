import styles from './Title.component.module.css'

const Title: React.FC<{ text: string }> = ({ text }) => (
  <div className={styles.title}>
    <h2>{text}</h2>
  </div>
)

export default Title