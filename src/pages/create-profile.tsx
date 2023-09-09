import HeaderText from '@/components/HeaderText/HeaderText.component'
import Layout from '@/components/Layout/Layout.component'
import Metadata from '@/components/Metadata.component'
import { GetServerSideProps, NextPage } from 'next'
import { Formik } from 'formik'
import { ClientAxios, ServerAxios } from '@/libs/http'
import { useRouter } from 'next/router'

const CreateProfilePage: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Metadata title='ลงทะเบียน | สถาบันกวดวิชา THE PRO TUTOR' />

      <Layout>
        <HeaderText>ลงทะเบียน</HeaderText>

        <div className='w-full'>
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              nickname: '',
              telephoneNumber: '',
              guardianTelephoneNumber: '',
            }}
            onSubmit={async (values) => {
              const { data } = await ClientAxios.post('/student', {
                ...values
              })

              router.push('/dashboard')
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className='w-full mx-auto flex flex-col gap-2'>
                <h3 className='font-medium text-xl'>ข้อมูลเบื้องต้น</h3>

                <div className='grid grid-cols-1 lg:grid-cols-3 w-full gap-2'>
                  <div className='flex flex-col'>
                    <label htmlFor="firstname">ชื่อจริง<span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      id='firstname'
                      name="firstname"
                      placeholder='ชื่อจริง'
                      className='input w-full'
                      required={true}
                      onChange={handleChange}
                      value={values.firstname}
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="lastname">นามสกุล<span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      id='lastname'
                      name="lastname"
                      placeholder='นามสกุล'
                      className='input w-full'
                      required={true}
                      onChange={handleChange}
                      value={values.lastname}
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="nickname">ชื่อเล่น<span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      id='nickname'
                      name="nickname"
                      placeholder='ชื่อเล่น'
                      className='input w-full'
                      required={true}
                      onChange={handleChange}
                      value={values.nickname}
                    />
                  </div>
                </div>

                <h3 className='font-medium text-xl mt-6'>เบอร์โทรศัพท์</h3>

                <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-2'>
                  <div className='flex flex-col'>
                    <label htmlFor="telephoneNumber">เบอร์โทรศัพท์<span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      id='telephoneNumber'
                      name="telephoneNumber"
                      placeholder='0987654321'
                      className='input w-full'
                      onChange={handleChange}
                      required={true}
                      value={values.telephoneNumber}
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="guardianTelephoneNumber">เบอร์โทรศัพท์ผู้ปกครอง<span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      id='guardianTelephoneNumber'
                      name="guardianTelephoneNumber"
                      placeholder='0123456789'
                      className='input w-full'
                      onChange={handleChange}
                      required={true}
                      value={values.guardianTelephoneNumber}
                    />
                  </div>
                </div>

                <div className='w-full flex flex-row gap-2 mt-8'>
                  <input
                    type='checkbox'
                    className='checkbox'
                    required={true}
                  />
                  <p>ข้าพเจ้าได้ยอมรับนโยบายสิทธิส่วนบุคคล</p>
                </div>

                <div className='w-full flex flex-row justify-center items-center mt-6'>
                  <button type='submit' className='btn btn-primary w-32'>บันทึกข้อมูล</button>
                </div>
              </form>
            )}
          </Formik>
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

  if (data) {
    return {
      redirect: {
        destination: '/dashboard',
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}


export default CreateProfilePage