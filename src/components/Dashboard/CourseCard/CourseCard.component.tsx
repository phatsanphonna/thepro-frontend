import styles from './CourseCard.component.module.css'
import Link from 'next/link'

type Props = {
  assignmentId: string
  name: string
  assignDate: string
  expireDate: string,
  materialsCount: number
  isFinished: boolean
}

const CourseCard: React.FC<Props> = ({
  assignmentId, name, expireDate, materialsCount, isFinished
}) => {
  if (!expireDate) {
    return (
      <Link href={`assignment/${assignmentId}`} passHref>
        <a>
          <div className={styles.root}>
            <h4 className='w-full'>{name}</h4>

            <div className={styles.btm}>
              <div className='bg-blue-100 px-2 py-0.5 rounded-lg'>
                <p className='text-blue-500 inline-flex flex-row items-center gap-1'>
                  <span>{materialsCount} ไฟล์</span>
                </p>
              </div>
              {isFinished ? (
                <div className='bg-green-500 px-2 py-0.5 rounded-lg'>
                  <p className='text-white font-medium'>
                    เสร็จแล้ว
                  </p>
                </div>
              ) : (
                <div className='bg-yellow-500 px-2 py-0.5 rounded-lg'>
                  <p className='text-white font-medium'>
                    ไม่มีวันหมดอายุ
                  </p>
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
    )
  }

  const parsedExpireDate = new Date(expireDate);
  const isExpired = new Date().getTime() >= parsedExpireDate.getTime()

  const formatExpireDate = new Intl.DateTimeFormat('th-TH', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
    .format(parsedExpireDate)


  if (!isExpired) {
    return (
      <Link href={`assignment/${assignmentId}`} passHref>
        <a>
          <div className={styles.root}>
            <h4 className='w-full'>{name}</h4>

            <div className={styles.btm}>
              <div className='bg-blue-100 px-2 py-0.5 rounded-lg'>
                <p className='text-blue-500 inline-flex flex-row items-center gap-1'>
                  <span>{materialsCount} ไฟล์</span>
                </p>
              </div>
              {isFinished ? (
                <div className='bg-green-500 px-2 py-0.5 rounded-lg'>
                  <p className='text-white font-medium'>
                    เสร็จแล้ว
                  </p>
                </div>
              ) : isExpired ? (
                <div className='bg-red-500 px-2 py-0.5 rounded-lg'>
                  <p className='text-white font-medium'>
                    หมดอายุ
                  </p>
                </div>
              ) : (
                <div className='bg-yellow-500 px-2 py-0.5 rounded-lg'>
                  <p className='text-white font-medium'>
                    ทำได้ถึง: {formatExpireDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
    )
  } else {
    return (
      <div className={styles.root_expired}>
        <h4 className='w-full'>{name}</h4>

        <div className={styles.btm}>
          <div className='bg-blue-100 px-2 py-0.5 rounded-lg'>
            <p className='text-blue-500 inline-flex flex-row items-center gap-1'>
              <span>{materialsCount} ไฟล์</span>
            </p>
          </div>
          {isFinished ? (
            <div className='bg-green-500 px-2 py-0.5 rounded-lg'>
              <p className='text-white font-medium'>
                เสร็จแล้ว
              </p>
            </div>
          ) : (
            <div className='bg-red-500 px-2 py-0.5 rounded-lg'>
              <p className='text-white font-medium'>
                หมดอายุ
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CourseCard