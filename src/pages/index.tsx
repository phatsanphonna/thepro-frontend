import type { NextPage } from 'next'
import styles from '@/styles/pages/index.module.css'

import Metadata from '@/components/Metadata.component'
import Navbar from '@/components/Navbar/Navbar.component'
import Footer from '@/components/Footer/Footer.component'
import Title from '@/components/IndexPage/Title/Title.component'
import GoogleMap from '@/components/IndexPage/GoogleMap/GoogleMap.component'
import IndexCourseCard from '@/components/IndexPage/CourseCard/CourseCard.component'
import { useEffect, useLayoutEffect, useState } from 'react'

const courseList = [
  { title: 'คณิตศาสตร์', slug: 'math' },
  { title: 'อังกฤษ', slug: 'english' },
  { title: 'วิทยาศาสตร์ ม.ต้น', slug: 'primary-science' },
  { title: 'ฟิสิกส์', slug: 'high-school-science' },
  { title: 'เคมี', slug: 'high-school-science' },
  { title: 'ชีววิทยา', slug: 'high-school-science' },
]

const HomePage: NextPage = () => {
  return (
    <>
      <Metadata title='หน้าหลัก | THE PRO TUTOR' />

      <Navbar />

      <main className={styles.main}>

        <Header />

        <Course />
        <Review />
        <Study />

      </main>

      <Footer />
    </>
  )
}

const Header: React.FC = () => {
  const [bgURL, setBgURL] = useState<string>('')

  useLayoutEffect(() => {
    if (window.innerWidth > 768) {
      setBgURL("./thepro_pv.webp")
    } else {
      setBgURL('./thepro_header.jpg')
    }
  }, [])

  return (
    <div className={styles.header}
      style={{
        backgroundImage: (
          `linear-gradient(to bottom,#000000e6,#000000e6), url(${bgURL})`
        )
      }}
    >
      <div>
        <h1>THE PRO TUTOR</h1>
        <p>&quot;ความรู้คือพลัง สู่อนาคตที่ยั่งยืน&quot;</p>
      </div>
    </div>
  )
}

const Course: React.FC = () => (
  <div className={styles.course}>
    <div className={[styles.wrapper, styles.course__layout].join(' ')}>
      <Title text='คอร์สเรียนของเรา' />

      <div className={styles.course_grid}>
        {courseList.map((c, index) => (
          <IndexCourseCard key={index} {...c} />
        ))}
      </div>
    </div>
  </div>
)

const Review: React.FC = () => (
  <div className={styles.review}>
    <div className={[styles.wrapper, styles.review__layout].join(' ')}>
      <Title text='การันตีจากลูกศิษย์ที่เคยเรียน' />
    </div>
  </div>
)

const Study: React.FC = () => (
  <div className={styles.study}>
    <div className={[styles.wrapper, styles.study__layout].join(' ')}>
      <div className={styles.content}>

        <Title text='เราสอนสดทุกคอร์ส' />

        <p>
          มีทั้งสอนแบบออนไลน์ และ เรียนที่สถาบัน
        </p>
        <p>
          มาเรียนกับเราได้ตามนี้เลย
        </p>
      </div>
      <GoogleMap className={styles.map} />
    </div>
  </div>
)

export default HomePage