import styles from './LoadingBar.component.module.css'

type Props = {
  style?: React.CSSProperties
}

const LoadingBar: React.FC<Props> = ({ style }: Props) => {
  return (
    <div className={styles.root} style={{}} />
  )
}

export default LoadingBar