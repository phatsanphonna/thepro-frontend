import Link from 'next/link'
import styles from './CourseCard.component.module.css'

type Props = {
  title: string
  slug: string
}

const IndexCourseCard: React.FC<Props> = ({ title, slug }) => {
  return (
    <Link
      href={{
        pathname: '/course',
        query: {
          category: encodeURIComponent(slug)
        }
      }}
      passHref
    >
      <a>
        <div className={styles.card}>
          <div>
            {title}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default IndexCourseCard