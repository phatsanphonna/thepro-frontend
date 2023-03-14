import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { signIn } from '@/libs/auth';
import { disableError } from '@/redux/features/loading.feature';
import styles from '@/styles/pages/signin.module.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import type { NextPage } from 'next'

const SignInPage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <>
      <Metadata title='เข้าสู่ระบบ | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

        <Layout>
          <div className={styles.root}>
            <div className={styles.wrapper}>
              <h1 className={styles.title}>เข้าสู่ระบบ</h1>
              <button onClick={() => dispatch(disableError())}></button>

              <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                  const errors: { email?: string } = {};

                  if (!values.email) {
                    errors.email = 'โปรดระบุอีเมล';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'อีเมลไม่ถูกต้อง';
                  }
                  return errors;
                }}

                onSubmit={async (values, { setSubmitting }) => {
                  dispatch(disableError())
                  await signIn(dispatch, router, values)
                  setSubmitting(false)
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="email">อีเมล</label>
                      <br />
                      <input
                        type="email"
                        name='email'
                        required
                        placeholder='elonmusk@spacex.org'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <p className='text-red-500'>{errors.email && touched.email && errors.email}</p>
                    </div>
                    <div>
                      <label htmlFor="password">รหัสผ่าน</label>
                      <br />
                      <input
                        id='password'
                        name='password'
                        required
                        placeholder='รหัสผ่านที่ลับที่สุด'
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                    </div>
                    <button
                      className='w-full btn btn-primary'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      เข้าสู่ระบบ
                    </button>
                  </form>
                )}
              </Formik>
              <p className='select-none'>- หรือ -</p>
              <button
                className='w-full btn btn-outline-black'
                onClick={() => { }}>ลงทะเบียน / สมัครเรียน</button>
            </div>
          </div>
        </Layout>
    </>
  )
}

export default SignInPage