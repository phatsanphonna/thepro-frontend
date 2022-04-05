import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingIcon from '../LoadingIcon'
import styles from './Navbar.component.module.css'



const Navbar: React.FC = () => {
  const mobileBreakpoint = 960

  const authUser = useSelector((state: any) => state.authUser)

  const [screenWidth, setScreenWidth] = useState(mobileBreakpoint)

  useLayoutEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }
    changeWidth()

    window.addEventListener('resize', () => {
      changeWidth()
    })

    return () => {
      window.removeEventListener('resize', () => {
        changeWidth()
      })
    }
  }, [])

  useEffect(() => {
    
  }, [])

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href='/' passHref>
            <a>
              <h1>THE PRO</h1>
            </a>
          </Link>
        </div>

        {screenWidth > mobileBreakpoint ? (
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
        ) : (
          <MenuIcon width={20} height={20} className={styles.hamburger} />
        )}
      </div>
    </nav >
  )
}

export default Navbar