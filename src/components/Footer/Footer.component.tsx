import React from 'react'
import Link from 'next/link'
import styles from './Footer.component.module.css'

import { AtSymbolIcon, LinkIcon, PhoneIcon } from '@heroicons/react/solid'

const siteMap = [
  {
    name: 'หน้าหลัก',
    slug: '/'
  },
  {
    name: 'คอร์สเรียน',
    slug: '/course'
  },
  {
    name: 'เกี่ยวกับเรา',
    slug: '/about'
  },
  {
    name: 'รีวิว',
    slug: '/review'
  },
  {
    name: 'เข้าสู่ระบบ',
    slug: '/signin'
  },
]

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.contact}>
            <h3>ติดต่อเรา</h3>
            <ul>
              <li>
                <AtSymbolIcon height={20} width={20} /> <span>thepro@gmail.com</span>
              </li>
              <li>
                <PhoneIcon height={20} width={20} /> <span>0123456789</span>
              </li>
            </ul>
          </div>
          <div className={styles.sitemap}>
            <h3>แผนผังเว็บไซต์</h3>
            <ul className={styles.sitemap_grid}>
              {siteMap.map((sm, index) => (
                <div key={index}>
                  <li >
                    <LinkIcon height={16} width={16} />
                    <span>
                      <Link href={sm.slug} passHref>
                        <a className={styles.link}>
                          {sm.name}
                        </a>
                      </Link>
                    </span>
                  </li>
                </div>
              ))}
            </ul>
          </div>

        </div>
        <div className={styles.copyright}>
          <hr className={styles.hr} />

          <p>© 2022 THE PRO, All right reserved. Made by{' '}
            <a href='https://github.com/phatsanphonna'>
              Phatsanphon Nakaranurak
            </a>
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer