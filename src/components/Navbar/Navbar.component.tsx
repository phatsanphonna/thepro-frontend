import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingIcon from '../Icons/LoadingIcon'
import styles from './Navbar.component.module.css'



const Navbar: React.FC = () => {
  const authUser = useSelector((state: any) => state.authUser)
  const globalLoading = useSelector((state: any) => state.loading.globalLoading)

  const mobileBreakpoint = 768
  const [screenWidth, setScreenWidth] = useState(mobileBreakpoint)

  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)

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
                {globalLoading ? (
                  <LoadingIcon wh={30} />
                ) : (
                  <Image
                    src='/theprologo.png'
                    alt='THE PRO LOGO'
                    width={40} height={40}
                    quality={100}
                    loading='eager'

                  />
                )}
                <h1>THE PRO TUTOR</h1>
              </a>
            </Link>
          </div>

          {checkResponsiveNavbar ? (
            <ul className={styles.navlinks}>
              <li>
                <Link href='/course' passHref>
                  <a>
                    คอร์สเรียน
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/about' passHref>
                  <a>
                    เกี่ยวกับเรา
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/review' passHref>
                  <a>
                    รีวิว
                  </a>
                </Link>
              </li>
              {authUser.isAuthenticated ? (
                <li>
                  <Link href='/dashboard' passHref>
                    <a className='font-medium inline-flex gap-1 items-center justify-center'>
                      <UserCircleIcon width={20} height={20} />
                      สวัสดีน้อง{authUser.user.name}
                    </a>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href='/signin' passHref>
                    <a>
                      เข้าสู่ระบบ
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          ) : (
            <>
              <MenuIcon
                width={20}
                height={20}
                className={styles.hamburger}
                onClick={() => {
                  setIsHamburgerClicked(!isHamburgerClicked)
                }
                }
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
                  <a>
                    คอร์สเรียน
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/about' passHref>
                  <a>
                    เกี่ยวกับเรา
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/review' passHref>
                  <a>
                    รีวิว
                  </a>
                </Link>
              </li>
              {
                authUser.isAuthenticated ? (
                  <li>
                    <Link href='/dashboard' passHref>
                      <a className='font-medium inline-flex gap-1 items-center justify-center'>
                        <UserCircleIcon width={20} height={20} />
                        สวัสดีน้อง{authUser.user.name}
                      </a>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href='/signin' passHref>
                      <a>
                        เข้าสู่ระบบ
                      </a>
                    </Link>
                  </li>
                )
              }
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