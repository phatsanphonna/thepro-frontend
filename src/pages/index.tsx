import Footer from '@/components/Footer/Footer.component';
import IndexCourseCard from '@/components/IndexPage/CourseCard/CourseCard.component';
import GoogleMap from '@/components/IndexPage/GoogleMap/GoogleMap.component';
import Title from '@/components/IndexPage/Title/Title.component';
import Metadata from '@/components/Metadata.component';
import Navbar from '@/components/Navbar/Navbar.component';
import styles from '@/styles/pages/index.module.css';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';

const courseList = [
  { title: 'คณิตศาสตร์', slug: 'math' },
  { title: 'ภาษาอังกฤษ', slug: 'english' },
  { title: 'วิทยาศาสตร์ ม.ต้น', slug: 'secondary-school-science' },
  { title: 'ฟิสิกส์', slug: 'high-school-science' },
  { title: 'เคมี', slug: 'high-school-science' },
  { title: 'ชีววิทยา', slug: 'high-school-science' },
]

const reviewList = [
  '/promotion_pictures/pm_review_64_1.jpg',
  '/promotion_pictures/pm_review_64_2.jpg',
  '/promotion_pictures/pm_review_63_1.jpg',
  '/promotion_pictures/pm_review_63_2.jpg',
  '/promotion_pictures/pm_review_61_1.jpg',
  '/promotion_pictures/pm_review_61_2.jpg',
]

const HomePage: NextPage = () => {
  return (
    <>
      <Metadata title='สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

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

      <div className={styles.header__chevron}>
        <a href="#course">
          <ChevronDownIcon />
        </a>
        <a href="#course">
          <span>เลื่อนลง</span>
        </a>
      </div>
    </div>
  )
}

const Course: React.FC = () => (
  <div className={styles.course} id='course'>
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

const Review: React.FC = () => {
  const [isMoreInfoShown, setIsMoreInfoShown] = useState(false)

  const [width, setWidth] = useState(768)

  useEffect(() => {
    setWidth(window.innerWidth)

    if (window.innerWidth > 768) {
      setIsMoreInfoShown(true)
    }
  }, [])

  return (
    <div className={styles.review}>
      <div className={[styles.wrapper, styles.review__layout].join(' ')}>
        <Title text='การันตีจากลูกศิษย์ที่เคยเรียน' />

        <div className={styles.review_grid}>
          {reviewList.map((review, index) => {
            if (isMoreInfoShown || width > 768) {
              return (
                <div className={styles.review_pics} key={index}>
                  <Image
                    className='rounded'
                    alt='PM Review'
                    layout='fill'
                    objectFit='cover'
                    quality={75}
                    src={review}
                  />
                </div>
              )
            } else {
              if (index >= 3) return

              return (
                <div className={styles.review_pics} key={index}>
                  <Image
                    className='rounded'
                    alt='PM Review'
                    layout='fill'
                    objectFit='cover'
                    quality={75}
                    src={review}
                  />
                </div>
              )
            }
          })}
        </div>
        {(!isMoreInfoShown) && (
          <div className={styles.chevron}>
            <ChevronDownIcon
              width={40}
              onClick={() => setIsMoreInfoShown(true)} />
          </div>
        )}
      </div>
    </div>
  )
}

const playerConfig = {
  controls: true,
  pip: true
}

const Study: React.FC = () => (
  <div className={styles.study}>
    <div className={[styles.wrapper, styles.study__layout].join(' ')}>
      <div className={styles.content}>

        <div className='font-semibold text-3xl md:text-5xl text-center md:text-left mb-2'>
          <h2>เราสอนสดทุกคอร์ส</h2>
        </div>

        <p>
          มีทั้งสอนแบบออนไลน์และเรียนที่สถาบัน
          มาเรียนกับเราได้ตามนี้เลย
          เรายินดีต้อนรับทุกคน
          ทั้งคนที่มีพื้นฐาน และ ไม่มีพื้นฐาน
        </p>
      </div>
      <GoogleMap className={styles.map} />
    </div>
  </div>
)

export default HomePage