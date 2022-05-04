import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingIcon from '@/components/Icons/LoadingIcon'

import styles from './LoadingStatus.component.module.css'

const containerVariants = {
  visible: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
  hidden: { backgroundColor: 'rgba(0, 0, 0, 0)' },
}

const boxVariants = {
  visible: { scale: 1 },
  hidden: { scale: 0 },
}

const LoadingStatus: React.FC = () => {
  const { globalLoading, statusMessage } = useSelector((state: any) => state.loading)

  return (
    <>
      <AnimatePresence>
        {globalLoading && (
          <motion.div
            className={styles.container}
            initial='hidden'
            animate='visible'
            variants={containerVariants}
            exit='hidden'
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <motion.div
              className={styles.box}
              initial='hidden'
              animate='visible'
              variants={boxVariants}
              exit='hidden'
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <LoadingIcon wh={64} color='#000' />
            </motion.div>
            <motion.p
              className={styles.status_message}
              initial='hidden'
              animate='visible'
              variants={boxVariants}
              exit='hidden'
              transition={{ duration: 0.5, type: 'spring' }}
            >
              {statusMessage}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LoadingStatus