import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './ErrorBox.component.module.css'
import { ExclamationCircleIcon, XIcon } from '@heroicons/react/solid'
import { disableError } from '@/redux/features/loading.feature'
import { useEffect } from 'react'

const variants = {
  enable: { y: 0 },
  disable: { y: 100 }
}

const ErrorBox: React.FC = () => {
  const dispatch = useDispatch()

  const loading = useSelector((state: any) => state.loading)

  return (
    <AnimatePresence>
      {loading.error && (
        <div className={styles.root}>
          <motion.div
            variants={variants}
            initial='disable'
            className={styles.box}
            animate='enable'
            exit='disable'
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className='flex flex-row justify-center items-center gap-2'>
              <ExclamationCircleIcon width={32} />
              <p>{loading.statusMessage} ({loading.errorCode})</p>
            </div>
            <XIcon width={28} onClick={() => dispatch(disableError())} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ErrorBox