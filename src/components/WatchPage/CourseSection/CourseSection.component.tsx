import { useState } from 'react'
import styles from './CourseSection.component.module.css'

import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
  VideoCameraIcon
} from '@heroicons/react/solid'

type Props = {
  index: number
  lesson: Lesson
  setCurrentContent: Function
}

type Lesson = {
  title: string
  content: Array<LessonContent>
}

type LessonContent = {
  title: string
  type: 'video' | 'file'
  contentURL: string
}

const CourseSectionWatchPage = ({ lesson, index, setCurrentContent }: Props) => {
  const [isInfoShown, setIsInfoShown] = useState(false)

  const toggleInfoShown = () => {
    setIsInfoShown(!isInfoShown)
  }

  return (
    <div className={styles.root}>
      <div className={styles.header} onClick={toggleInfoShown}>
        <p>
          เรื่องที่ {index} :
          <span>
            {lesson.title}
          </span>
        </p>
        {
          !isInfoShown ?
            <ChevronDownIcon
              className={styles.statusicon}
            /> :
            <ChevronUpIcon
              className={styles.statusicon}
            />
        }
      </div>

      {isInfoShown && (
        <div className={styles.content}>
          {lesson.content.map((c, index) => {
            switch (c.type) {
              case 'file':
                return (
                  <a
                    key={index}
                    href={c.contentURL}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    <p><DocumentIcon className={styles.statusicon} /> {c.title}</p>
                  </a>
                )
              case 'video':
                return (
                  <a
                    key={index}
                    onClick={() => setCurrentContent(c)}
                    className={styles.link}
                  >
                    <p><VideoCameraIcon className={styles.statusicon} /> {c.title}</p>
                  </a>
                )
            }
          })}
        </div>
      )}
    </div>
  )
}

export default CourseSectionWatchPage