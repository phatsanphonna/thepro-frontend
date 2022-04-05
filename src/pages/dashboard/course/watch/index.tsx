import React, { useEffect, useRef, useState } from 'react'
import { Course } from '@/types/course.type'
import styles from '@/styles/pages/dashboard/course/view.module.css'

import Metadata from '@/components/Metadata.component'
import Navbar from '@/components/Navbar/Navbar.component'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.component'

const DashboardCourseViewPage = () => {
  const [fetchedCourse, setFetchCourse] = useState<Course>()
  const [url, setUrl] = useState('https://lamberta.github.io/html5-animation/examples/ch04/assets/movieclip.mp4')

  const courseSectionRef = useRef(null)
  const changeUrl = () => {
    setUrl('https://www.youtube.com/watch?v=eDEFolvLn0A')
  }

  useEffect(() => {
    setFetchCourse({
      title: 'TP001 | PROMATH TCAS65 ติวสอบวิชา PAT 1 คณิตศาสตร์ วิชาสามัญ คณิตศาสตร์ 1',
      description: 'วอเตอร์ฮ่องเต้บูติคอุปทาน เพนตากอนแฟรี่ฮอต ซูเปอร์วีเจอันเดอร์ วาไรตี้เอ็นเตอร์เทน โปรเจ็คท์คอนแท็คลีเมอร์ฮาโลวีน วานิลลา ช็อปปิ้งอุตสาหการว้อยแซวห่วย สตาร์คอนแท็คแดรี่ล็อต ลอจิสติกส์คอมเมนต์ มั้งเทปโบกี้ ดีมานด์แซ็กโซโฟนตัวตนอริยสงฆ์แคร์ โทรพันธกิจคีตปฏิภาณ ชีสติวเตอร์แมคเคอเรลภารตะ อุรังคธาตุ แฟรี่เปปเปอร์มินต์ซิลเวอร์งั้นอาร์ติสต์ อยุติธรรมสโลว์ปัจเจกชนอพาร์ทเมนท์',
      price: 500,
      teacher: {
        name: 'ครูพี่ปุ๊ก',
        avatarURL: 'https://pic-bstarstatic.akamaized.net/ugc/8ed56f7208e4aa3e26f516f81b0a789a15d7a11b.jpg@720w_406h_1e_1c_1f.webp',
      },
      lessons: [
        {
          title: 'เซต'
        },
        {
          title: 'เวกเตอร์'
        },
        {
          title: 'เมทริกซ์'
        },
        {
          title: 'ตรีโกณมิติ'
        },
        {
          title: 'ฟังก์ชั่น',
          content: [
            {
              title: 'ฟังก์ชั่น EP.1',
              type: 'video',
              contentURL: 'https:'
            }
          ]
        },
        {
          title: 'จำนวนจริง'
        },
      ]
    })
    return () => { }
  }, [])

  return (
    <>
      <Metadata title={fetchedCourse?.title || null} />

      <div className={styles.root}>
        <Navbar />

        <main className={styles.main}>
          <div className={styles.content}>
            <div onContextMenu={() => false}>
              <VideoPlayer source={url} />
            </div>
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
            <button onClick={changeUrl}>change</button><br />
          </div>
          <div className={styles.course_sidebar} ref={courseSectionRef}>
            <section className={styles.course_section}>
              <div className={styles.course_sidebar_title}>
                <h4>เนื้อหาคอร์สเรียน</h4>
              </div>
              <div className={styles.lessons_container}>
                <ul className={styles.lessons_container__content}>
                  <li className="h-20 bg-slate-400">
                    d
                  </li>
                  <li className="h-20 bg-slate-400">
                    d
                  </li>
                  <li className="h-20 bg-slate-400">
                    d
                  </li>
                  <li className="h-20 bg-slate-400">
                    d
                  </li>
                  <li className="h-20 bg-slate-400">
                    d
                  </li>
                  <li className="h-20 bg-slate-400">
                    d
                  </li>
                
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

export default DashboardCourseViewPage