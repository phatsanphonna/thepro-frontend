import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { signIn, SignInRouteGuard } from '@/libs/auth';
import { disableError } from '@/redux/features/loading.feature';
import styles from '@/styles/pages/signin.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import type { NextPage } from 'next'
const SignInPage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(disableError())
    await signIn(dispatch, router, { email, password })
  }

  return (
    <>
      <Metadata title='เข้าสู่ระบบ | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

      <SignInRouteGuard>
        <Layout>
          <div className={styles.root}>
            <div className={styles.wrapper}>
              <h1 className={styles.title}>เข้าสู่ระบบ</h1>
              <button onClick={() => dispatch(disableError())}></button>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">อีเมล</label>
                  <br />
                  <input
                    type="email" id='email' required
                    placeholder='elonmusk@spacex.org'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <label htmlFor="password">รหัสผ่าน</label>
                  <br />
                  <input
                    type="password" id='password' required
                    placeholder='รหัสผ่านที่ลับที่สุด'
                    onChange={e => setPassword(e.target.value)}
                    value={password} />
                </div>
                <button className='w-full btn btn-primary' type='submit'>เข้าสู่ระบบ</button>
              </form>
              <p className='select-none'>- หรือ -</p>
              <button
                className='w-full btn btn-outline-black'
                onClick={() => { }}>ลงทะเบียน / สมัครเรียน</button>
            </div>
          </div>
        </Layout>
      </SignInRouteGuard>
    </>
  )
}

export default SignInPage