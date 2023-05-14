import { httpGet } from '@/libs/http'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
  VideoCameraIcon
} from '@heroicons/react/20/solid'
import { useState } from 'react'
import styles from './CourseSection.component.module.css'

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
  type: 'VIDEO' | 'FILE'
  fileAccessId: string
}

const CourseSectionWatchPage = ({ lesson, index, setCurrentContent }: Props) => {
  const [isInfoShown, setIsInfoShown] = useState(false)

  const toggleInfoShown = () => {
    setIsInfoShown(!isInfoShown)
  }

  const downloadFile = async (fileAccessId: string) => {
    try {
      const response = await httpGet(`/file/${fileAccessId}`)

      window.open(response.data.signedUrl, '_blank')

      // const filename = response.headers['content-disposition'].split(';')[1].split('=')[1];

      // const url = window.URL.createObjectURL(new Blob([response.data]))

      // const link = document.createElement('a')
      // link.href = url
      // link.setAttribute('download', filename)

      // document.body.appendChild(link);

      // link.click()
    } catch (e) {
      throw e
    }
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
              case 'FILE':
                return (
                  <a
                    key={index}
                    onClick={() => downloadFile(c.fileAccessId)}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    <p><DocumentIcon className={styles.statusicon} /> {c.title}</p>
                  </a>
                )
              case 'VIDEO':
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