import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { RouteGuard } from '@/libs/auth';
import {
  disableError,
  setLoading,
  setStatusMessage,
  setSuccess
} from '@/redux/features/loading.feature';
import styles from '@/styles/pages/dashboard/dashboardPage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { NextPage } from 'next';
import Hr from '@/components/Hr.component';
import CourseCard from '@/components/Dashboard/CourseCard/CourseCard.component';
import { fetchUser } from '@/libs/user';
import { signOut } from '@/libs/auth/signout.lib';
import Link from 'next/link';
import { setLocalUser } from '@/redux/features/userAuth.feature';

type User = {
  id: string
  userAuthId: string
  email: string
  firstname: string
  lastname: string
  nickname: string
  accessCourse: any[]
  studentId: number
}

const DashboardPage: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.userAuth.user)

  const [firstname, setFirstname] = useState<string>()
  const [lastname, setLastname] = useState<string>()
  const [nickname, setNickname] = useState<string>()
  const [studentId, setStudentId] = useState<number>()
  const [accessCourses, setAccessCourses] = useState<any[]>()

  const handleSignOut = async () => {
    await signOut(dispatch, router)
  }

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setNickname(user.nickname)
        setStudentId(user.studentId)
        setAccessCourses(user.accessCourse)

        return user
      }

      const fetchedUser: User = await fetchUser()

      if (fetchedUser === undefined) {
        return await handleSignOut()
      }

      if (!fetchedUser) {
        return router.push('/me')
      }

      dispatch(setLocalUser(fetchedUser))

      setFirstname(fetchedUser.firstname)
      setLastname(fetchedUser.lastname)
      setNickname(fetchedUser.nickname)
      setStudentId(fetchedUser.studentId)
      setAccessCourses(fetchedUser.accessCourse)

      return fetchedUser
    }

    const handleNotification = (user: User) => {
      dispatch(
        setSuccess({
          errorMessage: `ยินดีต้อนรับ น้อง${user.nickname}`,
        }))
    }

    dispatch(setLoading(true))
    dispatch(setStatusMessage('ค้นหาข้อมูล...'))

    getUser()
      .then((user) => {
        dispatch(setLoading(false))
        dispatch(setStatusMessage(null))

        if (user) {
          handleNotification(user as User)
        }
      })

    return () => {
      dispatch(disableError())
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
              <h1>{studentId}</h1>
              <p>{firstname} {lastname} {nickname && `(${nickname})`}</p>
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