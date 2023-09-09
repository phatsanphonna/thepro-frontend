import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { ServerAxios } from '@/libs/http';
import styles from '@/styles/pages/signin.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

const SignInPage: NextPage = () => {
  const handleSignIn = () => {
    window.open(`/api/auth/signin/google?redirectUrl=1`, "_self")
  }

  return (
    <>
      <Metadata title='เข้าสู่ระบบ | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

      <Layout>
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>เข้าสู่ระบบ</h1>

            <div className='w-full md:w-3/5 text-center flex flex-col gap-2'>

              <button
                className='w-full btn btn-primary'
                onClick={handleSignIn}
              >
                เข้าสู่ระบบด้วย Google
              </button>

              <p className='select-none'>- หรือ -</p>

              <Link href='/register' passHref>
                <button className='w-full btn btn-outline-black'>
                  ลงทะเบียน / สมัครเรียน
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie

  const { data } = await ServerAxios<{ status: boolean, roles: string[] }>(
    '/auth/verify', {
    method: 'POST',
    withCredentials: true,
    headers: {
      Cookie: cookie
    },
    validateStatus: () => true
  })

  console.log("data", data);

  if (data.status) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: true,
      },
    }
  } else {
    return {
      props: {}
    }
  }
}

export default SignInPage