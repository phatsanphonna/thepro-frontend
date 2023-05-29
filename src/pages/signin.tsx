import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { signIn } from '@/libs/auth';
import { ServerAxios } from '@/libs/http';
import { disableError, setError } from '@/redux/features/loading.feature';
import styles from '@/styles/pages/signin.module.css';
import { Formik } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const SignInPage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const calculateDistance = () => {
    if (!navigator.geolocation) {
      return dispatch(setError({
        errorMessage: 'โปรดเปิดใช้งานการอนุญาตตำแหน่งในเบราว์เซอร์',
        errorCode: 971
      }))
    }

    let result: boolean = false

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords

      const pos1 = Math.pow(latitude - 13.9371215, 2)
      const pos2 = Math.pow(longitude - 100.6301741, 2)

      const resultInDegree = Math.sqrt(pos1 + pos2)
      const resultInMeters = resultInDegree * 111139

      console.log(resultInMeters)

      result = resultInMeters <= 0.00000001
    })

    return result
  }

  const handleSignIn = () => {

    // if (calculateDistance()) {
    //   return dispatch(setError({
    //     errorMessage: 'โปรดเข้าใกล้ที่เรียนมากกว่านี้',
    //     errorCode: 970
    //   }))
    // }

    window.open(`/api/auth/signin/google?redirectUrl=http://localhost:7810/api/auth/callback`, "_self")
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