import { getLocalUserAuth } from '@/redux/features/userAuth.feature'
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './WatchNavbar.component.module.css'

const WatchNavbar: React.FC = () => {
  const dispatch = useDispatch()

  const userAuth = useSelector((state: any) => state.userAuth)

  const mobileBreakpoint = 768
  const [screenWidth, setScreenWidth] = useState(mobileBreakpoint)

  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)

  useLayoutEffect(() => {
    dispatch(getLocalUserAuth())
  }, [])

  useLayoutEffect(() => {
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
    if (setIsHamburgerClicked) {
      setIsHamburgerClicked(false)
    }

  }, [checkResponsiveNavbar])

  return (
    <>
      <nav
        className={styles.nav}
      >
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
                <Link href='/about' passHref>
                  <a>เกี่ยวกับเรา</a>
                </Link>
              </li>
              <li>
                <Link href='/review' passHref>
                  <a>รีวิว</a>
                </Link>
              </li>
              {userAuth.isAuthenticated ? (
                <li>
                  <Link href='/dashboard' passHref>
                    <a className='font-medium inline-flex gap-1 items-center justify-center'>
                      <UserCircleIcon width={20} height={20} />
                      {userAuth.userAuth?.email.split('@')[0]}
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
            <>
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

            </>
          )}
        </div>
      </nav>
      {(screenWidth < mobileBreakpoint) && (isHamburgerClicked) && (
        <>
          <div className={styles.hamburger_tab}>
            <ul className={styles.hamburger_tab_list}>
              <li>
                <Link href='/course' passHref>
                  <a>คอร์สเรียน</a>
                </Link>
              </li>
              <li>
                <Link href='/about' passHref>
                  <a>เกี่ยวกับเรา</a>
                </Link>
              </li>
              <li>
                <Link href='/review' passHref>
                  <a>รีวิว</a>
                </Link>
              </li>
              {
                userAuth.isAuthenticated ? (
                  <li>
                    <Link href='/dashboard' passHref>
                      <a className='font-medium inline-flex gap-1 items-center justify-center'>
                        <UserCircleIcon width={20} height={20} />
                        {userAuth.userAuth?.email.split('@')[0]}
                      </a>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href='/signin' passHref>
                      <a>เข้าสู่ระบบ</a>
                    </Link>
                  </li>
                )
              }
            </ul>
          </div>
          <div
            className='w-full h-screen bg-black opacity-50 absolute top-0 z-10'
            onClick={() => setIsHamburgerClicked(false)}
          />
        </>
      )}
    </>
  )
}

export default WatchNavbar
