import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/pages/dashboard/course/view.module.css'

import Metadata from '@/components/Metadata.component'
import Navbar from '@/components/Navbar/Navbar.component'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.component'
import CourseSectionWatchPage from '@/components/WatchPage/CourseSection/CourseSection.component'
import Footer from '@/components/Footer/Footer.component'
import { VideoCameraIcon } from '@heroicons/react/solid'

type Course = {
  title: string
  description: string
  price: number
  teacher: {
    name: string
    avatarURL: string
  }
  lessons: Array<Lesson>
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

const DashboardCourseViewPage = () => {
  const router = useRouter()

  const [fetchedCourse, setFetchCourse] = useState<Course>()
  const [currentContent, setCurrentContent] = useState<LessonContent>()

  useEffect(() => {
    const courseId = router.query.id
    const courseData: Course = {
      title: 'TP001 | PROMATH TCAS65 ติวสอบวิชา PAT 1 คณิตศาสตร์ วิชาสามัญ คณิตศาสตร์ 1',
      description: 'วอเตอร์ฮ่องเต้บูติคอุปทาน เพนตากอนแฟรี่ฮอต ซูเปอร์วีเจอันเดอร์ วาไรตี้เอ็นเตอร์เทน โปรเจ็คท์คอนแท็คลีเมอร์ฮาโลวีน วานิลลา ช็อปปิ้งอุตสาหการว้อยแซวห่วย สตาร์คอนแท็คแดรี่ล็อต ลอจิสติกส์คอมเมนต์ มั้งเทปโบกี้ ดีมานด์แซ็กโซโฟนตัวตนอริยสงฆ์แคร์ โทรพันธกิจคีตปฏิภาณ ชีสติวเตอร์แมคเคอเรลภารตะ อุรังคธาตุ แฟรี่เปปเปอร์มินต์ซิลเวอร์งั้นอาร์ติสต์ อยุติธรรมสโลว์ปัจเจกชนอพาร์ทเมนท์',
      price: 500,
      teacher: {
        name: 'ครูพี่ปุ๊ก',
        avatarURL: 'https://pic-bstarstatic.akamaized.net/ugc/8ed56f7208e4aa3e26f516f81b0a789a15d7a11b.jpg@720w_406h_1e_1c_1f.webp',
      },
      lessons: [
        {
          title: 'เซต',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https://streamable.com/mqgmaw'
            }
          ]
        },
        {
          title: 'เวกเตอร์',
          content: [
            {
              title: 'เอกสารประกอบการเรียน',
              type: 'file',
              contentURL: 'https://streamable.com/ex7wun'
            },
            {
              title: 'เวกเตอร์ EP.1',
              type: 'video',
              contentURL: 'https://streamable.com/ex7wun'
            }
          ]
        },
        {
          title: 'เมทริกซ์',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        },
        {
          title: 'ตรีโกณมิติ',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        },
        {
          title: 'ฟังก์ชั่น',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        },
        {
          title: 'จำนวนจริง',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        },
        {
          title: 'จำนวนจริง',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        }, {
          title: 'จำนวนจริง',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        }, {
          title: 'จำนวนจริง',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        }, {
          title: 'จำนวนจริง',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        }, {
          title: 'จำนวนจริง',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        }, {
          title: 'จำนวนจริง',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        }, {
          title: 'จำนวนจริง',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        },
      ]
    }

    setFetchCourse(courseData)
    return () => { }
  }, [router.query.id])

  return (
    <>
      <Metadata title={fetchedCourse?.title || null} />

      <div className={styles.root}>
        <Navbar />

        <main className={styles.main}>
          <div className={styles.content}>
            <div>
              <VideoPlayer source={currentContent?.contentURL} />
            </div>
            {currentContent && (
              <div className={styles.content_info}>
                <h2 className={styles.content_info_title}>
                  <VideoCameraIcon className={styles.statusicon} />
                  {currentContent?.title}
                </h2>
              </div>
            )}
          </div>
          <div className={styles.course_sidebar}>
            <section className={styles.course_section}>
              <div className={styles.course_sidebar_title}>
                <h3>เนื้อหาคอร์สเรียน</h3>
              </div>

              <div className={styles.lessons_container}>
                <div className={styles.lessons_container__content}>
                  {fetchedCourse?.lessons.map((lesson, index) => (
                    <CourseSectionWatchPage
                      key={index} index={index + 1}
                      lesson={lesson}
                      setCurrentContent={setCurrentContent}
                    />
                  ))
                  }
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default DashboardCourseViewPage