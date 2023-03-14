import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';

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

import type { GetServerSideProps, NextPage } from 'next';
import Hr from '@/components/Hr.component';
import CourseCard from '@/components/Dashboard/CourseCard/CourseCard.component';
import { fetchUser } from '@/libs/user';
import { signOut } from '@/libs/auth/signout.lib';
import Link from 'next/link';
import { setLocalUser } from '@/redux/features/userAuth.feature';
import { ServerAxios, httpGet } from '@/libs/http';
import axios from 'axios';

type User = {
  id: string
  userAuthId: string
  firstname: string
  lastname: string
  nickname: string
  assignment: any[]
}

const DashboardPage: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { firstname, lastname, nickname, assignment } = user;

  const handleSignOut = async () => {
    await signOut(dispatch, router)
  }

  return (
    <>
      <Metadata title='Dashboard | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

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
            <h3>งานที่ต้องทำ</h3>
          </div>

          <div className={styles.course_list_wrapper}>
            <div className={styles.course_list}>
              {assignment && (assignment!.map((asm, index) => (
                <CourseCard
                  key={index}
                  name={asm.title}
                  courseAccessId={asm.id} />
              )))}

            </div>
          </div>
        </div>

      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await ServerAxios.get('/student', {
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