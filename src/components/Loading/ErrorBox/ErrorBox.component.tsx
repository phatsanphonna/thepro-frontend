import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './ErrorBox.component.module.css'
import { CheckCircleIcon, ExclamationCircleIcon, XIcon } from '@heroicons/react/solid'
import { disableError } from '@/redux/features/loading.feature'
import { useEffect } from 'react'

const variants = {
  enable: { y: 0 },
  disable: { y: 100 }
}

const ErrorBox: React.FC = () => {
  const dispatch = useDispatch()

  const loading = useSelector((state: any) => state.loading)

  const callTimeout = () => {
    return setTimeout(() => {
      dispatch(disableError())
    }, 5000)
  }

  useEffect(() => {
    const timeout = callTimeout()

    return () => {
      clearTimeout(timeout)
    }
  }, [loading.error !== 'idle'])

  return (
    <AnimatePresence>
      {loading.error !== 'idle' && (
        <div className={styles.root}>
          <motion.div
            variants={variants}
            initial='disable'
            className={
              [
                styles.box,
                loading.error === 'error'
                  ? styles.bg_error
                  : loading.error === 'success'
                  && styles.bg_success
              ].join(' ')
            }
            animate='enable'
            exit='disable'
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className='flex flex-row justify-center items-center gap-2'>
              {
                loading.error === 'error'
                  ? <ExclamationCircleIcon width={32} />
                  : <CheckCircleIcon width={32} />
              }
              <p>
                {loading.statusMessage}
                {loading.errorCode && ` (${loading.errorCode})`}
              </p>
            </div>
            <XIcon
              width={28}
              onClick={() => dispatch(disableError())}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ErrorBox