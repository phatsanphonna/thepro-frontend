import CourseCard from '@/components/Dashboard/CourseCard/CourseCard.component';
import Hr from '@/components/Hr.component';
import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { signOut } from '@/libs/auth/signout.lib';
import { ServerAxios } from '@/libs/http';
import styles from '@/styles/pages/dashboard.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

type User = {
  id: string
  userAuthId: string
  firstname: string
  lastname: string
  nickname: string
  assignment: any[]
  studentId: string
}

const DashboardPage: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { firstname, lastname, nickname, assignment, studentId } = user;

  const handleSignOut = async () => {
    await signOut(dispatch, router)
  }

  const todoAssignment = assignment.filter(
    (a) => (new Date().getTime() < new Date(a.expireDate).getTime()
      || !a.expireDate)
  )

  const expiredAssignment = assignment.filter(
    (a) => new Date().getTime() >= new Date(a.expireDate).getTime()
      && a.expireDate
  )

  return (
    <>
      <Metadata title='Dashboard | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

      <Layout>
        <header className={styles.header}>
          <div className={styles.header_info}>
            <h1>{studentId}</h1>
            <p>{firstname} {lastname} ({nickname})</p>
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

        <div className='w-full flex flex-col gap-8'>
          <div className={styles.course}>
            <h3>งานที่ต้องทำ</h3>

            <div className={styles.course_list_wrapper}>
              <div className={styles.course_list}>
                {todoAssignment.length !== 0 ? (
                  todoAssignment.map((asm, index) => (
                    <CourseCard
                      isFinished={asm.isFinished}
                      expireDate={asm.expireDate}
                      assignDate={asm.assignDate}
                      key={index}
                      name={asm.lesson.title}
                      materialsCount={asm.lesson.materialsId.length}
                      assignmentId={asm.id}
                    />
                  ))) : (
                  <div className='w-full min-h-[3rem] rounded-lg shadow-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 grid place-items-center'>
                    <p className='text-center text-lg md:text-xl font-medium text-white'>คุณทำงานเสร็จหมดแล้ว</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {expiredAssignment.length !== 0 && (
            <div className={styles.course}>
              <h3>งานที่หมดอายุ</h3>

              <div className={styles.course_list_wrapper}>
                <div className={styles.course_list}>
                  {assignment && (
                    expiredAssignment
                      .map((asm, index) => (
                        <CourseCard
                          isFinished={asm.isFinished}
                          expireDate={asm.expireDate}
                          assignDate={asm.assignDate}
                          key={index}
                          name={asm.lesson.title}
                          materialsCount={asm.lesson.materialsId.length}
                          assignmentId={asm.id}
                        />
                      )))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await ServerAxios.get(
    '/student', {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie
    }
  })

  return {
    props: {
      user: data
    }
  }
}

export default DashboardPage