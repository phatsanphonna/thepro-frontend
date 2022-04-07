import LoadingIcon from '@/components/Icons/LoadingIcon'
import styles from './LoadingScreen.component.module.css'

const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.root}>
      <LoadingIcon wh={100} color='#000000' />
    </div>
  )
}

export default LoadingScreen