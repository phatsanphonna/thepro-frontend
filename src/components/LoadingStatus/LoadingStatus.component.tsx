import React from 'react'
import { useSelector } from 'react-redux'
import LoadingIcon from '../LoadingIcon'
import styles from './LoadingStatus.component.module.css'

type Props = {}

const LoadingStatus: React.FC = (props: Props) => {
  const globalLoading = useSelector((state: any) => state.loading.globalLoading)

  return (
    <>
      {
        // globalLoading && (
        <div
          className={styles.box}
          style={{
            opacity: globalLoading ? 100 : 0,
            transform: globalLoading ? 'translateY(0%)' : 'translateY(20%)'
          }}>
          <div className={styles.icon}>
            <LoadingIcon wh={30} />
          </div>
        </div>
        // )
      }
    </>
  )
}

export default LoadingStatus