import Footer from '@/components/Footer/Footer.component'
import Metadata from '@/components/Metadata.component';
import Navbar from '@/components/Navbar/Navbar.component';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.component';
import CourseSectionWatchPage from '@/components/WatchPage/CourseSection/CourseSection.component';
import { RouteGuard } from '@/libs/auth';
import styles from '@/styles/pages/course/courseWatch.module.css';
import { VideoCameraIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { setError, setLoading, setStatusMessage, setDefaultLoading } from '@/redux/features/loading.feature'

import { httpGet } from '@/libs/http'
import { useDispatch } from 'react-redux';
import Hr from '@/components/Hr.component';
import Image from 'next/image';


type Course = {
  title: string
  description: string
  teacher: {
    name: string
    avatarURL: string
  }
  lessons: Array<Lesson>
}

type Lesson = {
  title: string
  content: LessonContent[]
}

type LessonContent = {
  title: string
  type: 'VIDEO' | 'FILE'
  fileAccessId: string
}

const DashboardCourseViewPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [fetchedCourse, setFetchCourse] = useState<Course>()
  const [currentContent, setCurrentContent] = useState<LessonContent>()

  useEffect(() => {
    if (!router.isReady) return

    const courseId = router.query.courseId

    const handleNotFound = (errorCode: number) => {
      dispatch(setError({
        errorMessage: 'ไม่พบคอร์สนี้',
        errorCode: errorCode
      }))
      router.push('/dashboard')
    }

    const fetchData = async () => {
      const { data } = await httpGet(`/course/watch?courseId=${courseId}`)

      console.log(data);

      if (!data.data) {
        return handleNotFound(data.code)
      }

      setFetchCourse(data.data)
    }

    dispatch(setLoading(true))
    dispatch(setStatusMessage('กำลังดึงข้อมูล'))

    fetchData()
      .then(() => {
        dispatch(setDefaultLoading())
      })
    return () => {
      dispatch(setDefaultLoading())
    }
  }, [router.query.courseId])

  return (
    <>
      <Metadata
        title={`${fetchedCourse?.title || 'Watch'} | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR`}
      />

      <RouteGuard>
        <div className={styles.root}>
          <Navbar />

          <main className={styles.main}>
            <div className={styles.content}>
              <div>
                <VideoPlayer source={currentContent?.fileAccessId} />
              </div>
              {currentContent && (
                <>
                  <div className={styles.content_info}>
                    <h2 className={styles.content_info_title}>
                      <VideoCameraIcon className={styles.statusicon} />
                      {currentContent?.title}
                    </h2>

                    <Hr />
                  </div>
                </>
              )}
              <div
                className={styles.course_info_wrapper}
                style={{
                  marginTop: currentContent ? '-0.5rem' : '1rem'
                }}
              >

                <div className={styles.course_info}>
                  <h2>
                    {fetchedCourse?.title}
                  </h2>
                  <h6 className={styles.course_info_teacher}>
                    โดย {fetchedCourse?.teacher.name}
                  </h6>
                  <p className={styles.course_info_description}>
                    {fetchedCourse?.description}
                  </p>
                </div>
              </div>
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
      </RouteGuard>
    </>
  )
}

export default DashboardCourseViewPage