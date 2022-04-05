import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import styles from '@/styles/pages/signin.module.css'

import Layout from '@/components/Layout/Layout.component'
import Button from '@/components/Button/Button.component'
import Metadata from '@/components/Metadata.component'

const SignInPage: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(username, password);

  }

  return (
    <>
      <Metadata title='เข้าสู่ระบบ'/>
      <Layout>
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>เข้าสู่ระบบ</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">อีเมล</label>
                <br />
                <input
                  type="email" id='email' required
                  placeholder='elonmusk@spacex.org'
                  onChange={e => setUsername(e.target.value)}
                  value={username}
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
              <button className='w-full' type='submit'>
                <Button width='w-full' type='primary'>เข้าสู่ระบบ</Button>
              </button>
            </form>
            <p className='select-none'>- หรือ -</p>
            <Button width='w-full' type='outline-black' onClick={() => { }}>ลงทะเบียน / สมัครเรียน</Button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SignInPage