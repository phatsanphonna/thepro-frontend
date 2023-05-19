import { fetchUser } from '@/libs/user'
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useState } from 'react'
import styles from './Navbar.component.module.css'

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>()

  const mobileBreakpoint = 768
  const [screenWidth, setScreenWidth] = useState(mobileBreakpoint)

  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)

  useLayoutEffect(() => {
    const getUser = async () => {
      const user: any = await fetchUser()
      setUser(user);
    }

    getUser()
  }, [])

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    changeWidth()

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  const checkResponsiveNavbar = screenWidth > mobileBreakpoint

  useEffect(() => {
    if (isHamburgerClicked) {
      setIsHamburgerClicked(false)
    }

  }, [checkResponsiveNavbar])

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link href='/' passHref>
              <a>
                <Image
                  src='/theprologo.png'
                  alt='THE PRO LOGO'
                  width={40} height={40}
                  quality={100}
                  loading='eager'
                  priority={true}
                />
                <h1>THE PRO TUTOR</h1>
              </a>
            </Link>
          </div>

          {checkResponsiveNavbar ? (
            <ul className={styles.navlinks}>
              <li>
                <Link href='/course' passHref>
                  <a>คอร์สเรียน</a>
                </Link>
              </li>
              <li>
                <Link href='/tutors' passHref>
                  <a>ติวเตอร์ประจำสถาบัน</a>
                </Link>
              </li>
              <li>
                <Link href='/review' passHref>
                  <a>รีวิว</a>
                </Link>
              </li>
              {user ? (
                <li>
                  <Link href='/dashboard' passHref>
                    <a className='font-medium inline-flex gap-1 items-center justify-center'>
                      <UserCircleIcon width={20} height={20} />
                      {user.firstname}
                    </a>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href='/signin' passHref>
                    <a>เข้าสู่ระบบ</a>
                  </Link>
                </li>
              )}
            </ul>
          ) : (
            <Bars3Icon
              width={20}
              height={20}
              className={styles.hamburger}
              onClick={() => {
                setIsHamburgerClicked(!isHamburgerClicked)
              }}
              style={{
                color: isHamburgerClicked ? 'black' : 'white',
                backgroundColor: isHamburgerClicked ? 'white' : '',
                padding: isHamburgerClicked ? 1 : 0,
              }}
            />
          )}
        </div>
      </nav>
      {!checkResponsiveNavbar && isHamburgerClicked && (
        <>
          <div className={styles.hamburger_tab}>
            <ul className={styles.hamburger_tab_list}>
              <Link href='/course' passHref>
                <li>
                  <a>คอร์สเรียน</a>
                </li>
              </Link>
              <Link href='/tutors' passHref>
                <li>
                  <a>ติวเตอร์ประจำสถาบัน</a>
                </li>
              </Link>
              <Link href='/review' passHref>
                <li>
                  <a>รีวิว</a>
                </li>
              </Link>
              {user ? (
                <Link href='/dashboard' passHref>
                  <li>
                    <a className='font-medium inline-flex gap-1 items-center justify-center'>
                      <UserCircleIcon width={20} height={20} />
                      {user.firstname}
                    </a>
                  </li>
                </Link>
              ) : (
                <Link href='/signin' passHref>
                  <li>
                    <a>เข้าสู่ระบบ</a>
                  </li>
                </Link>
              )}
            </ul>
          </div>
          <div
            className='w-full h-screen bg-transparent opacity-0 absolute top-0 z-10'
            onClick={() => setIsHamburgerClicked(false)}
          />
        </>
      )}
    </>
  )
}

export default Navbar
