import styles from './CourseCard.component.module.css'
import Link from 'next/link'

type Props = {
  courseAccessId: string
  name: string
}

const CourseCard: React.FC<Props> = ({ courseAccessId, name }) => {
  return (
    <div className={styles.root}>
      <h4>
        {name}
      </h4>
      <div className={styles.btn}>
        <Link href={`course/watch?courseId=${courseAccessId}`} passHref>
          <a>
            <button
              className='btn btn-outline-primary h-8'
            >
              เรียนคอร์สนี้
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default CourseCard