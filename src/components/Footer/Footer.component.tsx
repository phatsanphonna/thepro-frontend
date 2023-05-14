import { LinkIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import FacebookIcon from '../Icons/FacebookIcon'
import InstagramIcon from '../Icons/InstagramIcon'
import LineIcon from '../Icons/LineIcon'
import styles from './Footer.component.module.css'

const siteMap = [
  { name: 'หน้าหลัก', slug: '/' },
  { name: 'คอร์สเรียน', slug: '/course' },
  { name: 'เกี่ยวกับเรา', slug: '/about' },
  { name: 'รีวิว', slug: '/review' },
  { name: 'เข้าสู่ระบบ', slug: '/signin' },
]

const contacts = [
  { component: <PhoneIcon height={20} width={20} />, url: 'tel:0962239941', text: '096-223-9941' },
  { component: <FacebookIcon />, url: 'https://www.facebook.com/The-Pro-Tutor-104995751003126/', text: 'The Pro Tutor' },
  { component: <LineIcon />, url: 'https://lin.ee/BdFh3Km', text: '@the-pro (มีเครื่องหมาย @)' },
  { component: <InstagramIcon />, url: 'https://www.instagram.com/thepro_tutor/', text: 'thepro_tutor' }
]

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.address}>
            <h3>ที่อยู่</h3>
            <p>
              <span className='text-lg'>
                สถาบันกวดวิชาเดอะโปร
              </span>
              <br />559/3
              <br />ซอยพหลโยธิน 58 แยก 31
              <br />แขวงสายไหม เขตสายไหม
              <br />กรุงเทพมหานคร
              <br />10220
            </p>
          </div>
          <div className={styles.contact}>
            <h3>ติดต่อเรา</h3>
            <ul>
              {contacts.map((contact, index) => (
                <li key={index}>
                  {contact.component}
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contact.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.sitemap}>
            <h3>แผนผังเว็บไซต์</h3>
            <ul className={styles.sitemap_grid}>
              {siteMap.map((sm, index) => (
                <li key={index}>
                  <LinkIcon height={16} width={16} />
                  <span>
                    <Link href={sm.slug} passHref>
                      <a className={styles.link}>
                        {sm.name}
                      </a>
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <hr className={styles.hr} />
          <p>
            <Link href='terms/privacy' passHref>
              <a>
                Privacy Policy
              </a>
            </Link>
          </p>
          <p>© 2023 THE PRO TUTOR, All rights reserved. Made by{' '}
            <a
              href='https://github.com/phatsanphonna'
              target="_blank"
              rel="noreferrer"
            >
              Phatsanphon Nakaranurak
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer