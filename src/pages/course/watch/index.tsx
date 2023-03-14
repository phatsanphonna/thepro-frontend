import Footer from '@/components/Footer/Footer.component';
import Metadata from '@/components/Metadata.component';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.component';
import CourseSectionWatchPage from '@/components/WatchPage/CourseSection/CourseSection.component';
import WatchNavbar from '@/components/WatchPage/WatchNavbar/WatchNavbar.component';
import { signOut } from '@/libs/auth/signout.lib';
import { httpGet } from '@/libs/http';
import { setDefaultLoading, setLoading, setStatusMessage } from '@/redux/features/loading.feature';
import styles from '@/styles/pages/course/courseWatch.module.css';
import { VideoCameraIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


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

const CourseWatchPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [fetchedCourse, setFetchCourse] = useState<Course>()
  const [currentContent, setCurrentContent] = useState<LessonContent>()

  const [notFound, setNotFound] = useState(false)

  const [navbarBelowCourse, setNavbarBelowCourse] = useState(true)

  useEffect(() => {
    if (!router.isReady) return

    const courseId = router.query.courseId

    const handleNotFound = (errorCode: number) => {
      setNotFound(true)
      router.push('/dashboard')
    }

    const handleSignOut = async () => {
      await signOut(dispatch, router)
    }

    const fetchData = async () => {
      const { status, data } = await httpGet(`/course/watch?courseId=${courseId}`)

      if (status === 403) {
        return handleSignOut()
      }

      setFetchCourse(data)
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

  useEffect(() => {
    const handleChange = () => {
      if (window.innerWidth > 1024) {
        setNavbarBelowCourse(true)
      } else {
        setNavbarBelowCourse(false)
      }
    }

    handleChange()

    window.addEventListener('resize', handleChange)

    return () => window.removeEventListener('resize', handleChange)
  }, [])

  return (
    <>
      <Metadata
        title={`${fetchedCourse?.title || 'Watch'} | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR`}
      />


      <div className={styles.root}>
        <main className={styles.main}>
          <div className={styles.content}>
            <WatchNavbar />
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

                  <hr className='w-full border-black my-2' />
                </div>
              </>
            )}
            <div
              className={styles.course_info_wrapper}
              style={{ marginTop: currentContent ? '0rem' : '1rem' }}
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
            {navbarBelowCourse && <Footer />}
          </div>

          <div
            className={styles.course_sidebar}
          >
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
        {!navbarBelowCourse && <Footer />}
      </div>

    </>
  )
}

export default CourseWatchPage