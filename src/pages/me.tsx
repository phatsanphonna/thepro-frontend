import { useEffect, useState } from 'react'
import Layout from '@/components/Layout/Layout.component'
import { useDispatch, useSelector } from 'react-redux'
import { NextPage } from 'next'
import { addOrUpdateUser, fetchUser } from '@/libs/user'
import { setLoading, setStatusMessage } from '@/redux/features/loading.feature'
import HeaderText from '@/components/HeaderText/HeaderText.component'
import Input from '@/components/Input/Input.component'

import styles from '@/styles/pages/mePage.module.css'
import Hr from '@/components/Hr.component'
import Metadata from '@/components/Metadata.component'
import { useRouter } from 'next/router'
import { setLocalUser } from '@/redux/features/userAuth.feature'
import { signOut } from '@/libs/auth/signout.lib'

type User = {
  id: string
  userAuthId: string
  email: string
  firstname: string
  lastname: string
  nickname: string
  accessCourse: any[]
}

type PasswordSpec = {
  moreThanEightChar: boolean
  containSpecialChar: boolean
  containCapitalLetter: boolean
  containNonCapitalLetter: boolean
}

const SPECIAL_CHARS = "!@#$%^&*()_+={}[];:<>?"
const CAPITAL_LETTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NON_CAPITAL_LETTER = 'abcdefghijklmnopqrstuvwxyz'

const MePage: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.userAuth.user)

  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [oldPassword, setOldPasword] = useState('')
  const [newPassword, setNewPasword] = useState('')
  const [repeatNewPassword, setRepeatNewPasword] = useState('')

  const [showPasswordInfo, setShowPasswordInfo] = useState(false)
  const [allowChangePassword, setAllowChangePassword] = useState(false)
  const [passwordMinimumSpec, setPasswordMinimumSpec] = useState<PasswordSpec>({
    moreThanEightChar: false,
    containSpecialChar: false,
    containCapitalLetter: false,
    containNonCapitalLetter: false,
  })

  const handleUpdateUser = async () => {
    dispatch(setLoading(true))
    dispatch(setStatusMessage('กำลังอัพเดทข้อมูล...'))

    const updatedUser = await addOrUpdateUser({
      firstname, lastname, email, nickname
    })

    dispatch(setLocalUser(updatedUser))

    dispatch(setStatusMessage('อัพเดทข้อมูลสำเร็จ'))

    dispatch(setStatusMessage('กำลังเปลี่ยนหน้า...'))
    router.push('/dashboard')
  }

  const checkPasswordMinimumSpec = () => {
    console.log(newPassword.length);

    if (newPassword.length >= 8) {
      setPasswordMinimumSpec({ ...passwordMinimumSpec, moreThanEightChar: true })
    } else {
      setPasswordMinimumSpec({ ...passwordMinimumSpec, moreThanEightChar: false })
    }

    for (let c of newPassword) {
      if (SPECIAL_CHARS.includes(c)) {
        setPasswordMinimumSpec({ ...passwordMinimumSpec, containSpecialChar: true })
        break;
      }

      if (newPassword.indexOf(c) === newPassword.length) {
        setPasswordMinimumSpec({ ...passwordMinimumSpec, containSpecialChar: false })
        break;
      }
    }

    for (let c of newPassword) {
      if (CAPITAL_LETTER.includes(c)) {
        setPasswordMinimumSpec({ ...passwordMinimumSpec, containCapitalLetter: true })
        break;
      }

      if (newPassword.indexOf(c) === newPassword.length) {
        setPasswordMinimumSpec({ ...passwordMinimumSpec, containCapitalLetter: false })
        break;
      }
    }

    for (let c of newPassword) {
      if (NON_CAPITAL_LETTER.includes(c)) {
        setPasswordMinimumSpec({ ...passwordMinimumSpec, containNonCapitalLetter: true })
        break;
      }

      if (newPassword.indexOf(c) === newPassword.length) {
        setPasswordMinimumSpec({ ...passwordMinimumSpec, containNonCapitalLetter: false })
        break;
      }
    }
  }

  const handleSignOut = async () => {
    await signOut(dispatch, router)
  }
  
  useEffect(() => {
    const getUser = async () => {
      if (user) {
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setNickname(user.nickname)
        setEmail(user.email)

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
      
      setEmail(fetchedUser.email)
      setFirstname(fetchedUser.firstname)
      setLastname(fetchedUser.lastname)
      setNickname(fetchedUser.nickname)

      return fetchedUser
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
      <Metadata title='ข้อมูลส่วนตัว | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

        <Layout>
          <HeaderText>ข้อมูลส่วนตัว</HeaderText>
          <Hr />
          <div className={styles.wrapper}>
            <div className={styles.btn_wrapper}>
              <h3>แก้ไขรหัสผ่าน</h3>
              <button
                className='btn btn-warning w-28'
                disabled={!allowChangePassword}>
                แก้ไขรหัสผ่าน
              </button>
            </div>
            <div className={styles.password_container}>
              <div className={styles.password_wrapper}>
                <div>
                  <Input
                    value={oldPassword}
                    label='รหัสผ่านเดิม'
                    onChange={(e) => setOldPasword(e.target.value)}
                    type='password'
                  />
                </div>
              </div>
              <div className={styles.confirm_password_wrapper}>
                <Input
                  value={newPassword}
                  label='รหัสผ่านใหม่'
                  onChange={(e) => {
                    setNewPasword(e.target.value)
                    checkPasswordMinimumSpec()
                  }}
                  type='password'
                  onFocus={() => setShowPasswordInfo(true)}
                />
                <Input
                  value={repeatNewPassword}
                  label='ยืนยันรหัสผ่านใหม่'
                  onChange={(e) => setRepeatNewPasword(e.target.value)}
                  type='password'
                />
              </div>
              {showPasswordInfo && (
                <div className={styles.password_info}>
                  <h6>รหัสผ่านจะต้องประกอบไปด้วย</h6>
                  <p style={{
                    color: passwordMinimumSpec.moreThanEightChar ? 'green' : 'red'
                  }}>- รหัสผ่านมากกว่าหรือเท่ากับ 8 ตัวขึ้นไป</p>
                  <p style={{
                    color: passwordMinimumSpec.containSpecialChar ? 'green' : 'red'
                  }}>- ต้องประกอบไปด้วยตัวอักษรพิเศษใน
                    <strong> {SPECIAL_CHARS} </strong>
                    อย่างน้อย 1 ตัว</p>
                  <p style={{
                    color: passwordMinimumSpec.containNonCapitalLetter ? 'green' : 'red'
                  }}>- ต้องมีตัวอักษรภาษาอังกฤษพิมพ์เล็กอย่างน้อย 1 ตัว</p>
                  <p style={{
                    color: passwordMinimumSpec.containCapitalLetter ? 'green' : 'red'
                  }}>- ต้องมีตัวอักษรภาษาอังกฤษพิมพ์ใหญ่อย่างน้อย 1 ตัว</p>
                </div>
              )}
            </div>

          </div>

          <Hr />

          <div className={styles.wrapper}>
            <div className={styles.btn_wrapper}>
              <h3>แก้ไขข้อมูลส่วนตัว</h3>
              <button
                className='btn btn-primary w-28'
                onClick={handleUpdateUser}
              >
                แก้ไขข้อมูล
              </button>
            </div>
            <div className={styles.info_wrapper}>
              <Input
                value={email}
                label='อีเมล'
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                disabled={true}
              />
              <Input
                value={firstname}
                label='ชื่อจริง'
                onChange={(e) => setFirstname(e.target.value)}
                type='text'
              />
              <Input
                value={lastname}
                label='นามสกุล'
                onChange={(e) => setLastname(e.target.value)}
                type='text'
              />
              <Input
                value={nickname}
                label='ชื่อเล่น'
                onChange={(e) => setNickname(e.target.value)}
                type='text'
                required={true}
              />
            </div>
          </div>
        </Layout>

    </>
  )
}

export default MePage