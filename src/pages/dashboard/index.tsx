import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { RouteGuard } from '@/libs/auth';
import {
  setLoading,
  setStatusMessage
} from '@/redux/features/loading.feature';
import styles from '@/styles/pages/dashboard/dashboardPage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { NextPage } from 'next';
import Hr from '@/components/Hr.component';
import CourseCard from '@/components/Dashboard/CourseCard/CourseCard.component';
import { fetchUser } from '@/libs/user';
import { signOut } from '@/libs/auth/signout.lib';
import Link from 'next/link';

type User = {
  id: string
  userAuthId: string
  email: string
  firstname: string
  lastname: string
  nickname: string
  accessCourse: any[]
}

const DashboardPage: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [firstname, setFirstname] = useState<string>()
  const [lastname, setLastname] = useState<string>()
  const [nickname, setNickname] = useState<string>()
  const [accessCourses, setAccessCourses] = useState<any[]>()

  const handleSignOut = async () => {
    await signOut(dispatch, router)
  }

  useEffect(() => {
    const getUser = async () => {
      const user: User = await fetchUser()

      if (!user) {
        return router.push('/me')
      }

      setFirstname(user.firstname)
      setLastname(user.lastname)
      setNickname(user.nickname)
      setAccessCourses(user.accessCourse)
    }


    dispatch(setLoading(true))
    dispatch(setStatusMessage('ค้นหาข้อมูล...'))

    getUser()
      .then(() => {
        dispatch(setLoading(false))
        dispatch(setStatusMessage(null))
      })


    return () => {
      dispatch(setLoading(false))
      dispatch(setStatusMessage(null))
    }
  }, [])

  return (
    <>
      <Metadata title='Dashboard | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

      <RouteGuard>
        <Layout>
          <header className={styles.header}>
            <div className={styles.header_info}>
              <h1>{nickname}</h1>
              <p>{firstname} {lastname}</p>
            </div>

            <div className={styles.header_button}>
              <Link href='/me' passHref>
                <a>
                  <button
                    className='btn btn-secondary w-full md:w-28'
                  >
                    แก้ไขข้อมูล
                  </button>
                </a>
              </Link>
              <button
                className='btn btn-danger w-full md:w-28'
                onClick={handleSignOut}
              >
                ออกจากระบบ
              </button>
            </div>
          </header>

          <Hr />

          <div className={styles.course}>
            <div>
              <h3>คอร์สของฉัน</h3>
            </div>

            <div className={styles.course_list_wrapper}>
              <div className={styles.course_list}>
                {accessCourses && (accessCourses!.map((ac, index) => (
                  <CourseCard
                    key={index}
                    name={ac.title}
                    courseAccessId={ac.accessId} />
                )))}

              </div>
            </div>
          </div>

        </Layout>
      </RouteGuard>
    </>
  )
}

export default DashboardPage