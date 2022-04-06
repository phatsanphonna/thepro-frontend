import { useState } from 'react'
import styles from './CourseSectionCard.component.module.css'
import {
  ChevronDownIcon, ChevronUpIcon,
  DocumentIcon,
  VideoCameraIcon
} from '@heroicons/react/solid'

type Props = {
  index: number
  title: string
  content?: [
    {
      title: string
      type: 'video' | 'file'
      contentURL: string
    }
  ]
}

const CourseSectionCard = ({ index, title, content }: Props) => {
  const [isInfoShown, setIsInfoShown] = useState(false)

  const toggleInfoShown = () => {
    setIsInfoShown(!isInfoShown)
  }
  
  return (
    <div className={styles.root}>
      <div className={styles.header} onClick={toggleInfoShown}>
        <div className={styles.title}>
          <h4>
            เรื่องที่ {index}
          </h4>
          <span>
            {title}
          </span>
        </div>

        {content && (
          !isInfoShown ?
            <ChevronDownIcon
              className={styles.statusicon}
            /> :
            <ChevronUpIcon
              className={styles.statusicon}
            />
        )}
      </div>
      {(isInfoShown && content) &&
        <div className={styles.content}>
          {content.map((c, index) => {
            let fileType

            switch (c.type) {
              case 'file':
                fileType = <DocumentIcon className={styles.statusicon} />
                break
              case 'video':
                fileType = <VideoCameraIcon className={styles.statusicon} />
                break
            }

            return (
              <a key={index}>
                <p>{fileType} {c.title}</p>
              </a>
            )
          })}
        </div>
      }
    </div>
  )
}

export default CourseSectionCard