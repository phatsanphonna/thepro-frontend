import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import styles from '@/styles/pages/course/courseId.module.css'
import Image from 'next/image'

import Layout from '@/components/Layout/Layout.component'
import CourseSectionCard from '@/components/course/CourseSectionCard/CourseSectionCard.component'
import Metadata from '@/components/Metadata.component'
import Button from '@/components/Button/Button.component'

type Props = {
  course: {
    title: string
    description: string
    price: number
    teacher: {
      name: string
      avatarURL: string
    }
    lessons: [
      {
        title: string,
        content?: [
          {
            title: string
            type: 'video' | 'file'
            contentURL: string
          }
        ]
      }
    ]
  }
}

const CourseIdPage: NextPage<Props> = ({ course }: Props) => {
  return (
    <>
      <Metadata title={course.title} />

      <Layout>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1>{course.title}</h1>
            <h5>ราคา <span>{course.price}</span> บาท</h5>

            <div className='inline-flex flex-row justify-between w-full'>
              <div className={styles.teacherinfo}>
                <Image
                  src={course.teacher.avatarURL}
                  alt={course.teacher.name}
                  className={styles.teacherinfo__avatar}
                  width={50} height={50} objectFit='cover'
                  loading='eager' aria-busy
                />
                <p>{course.teacher.name}</p>
              </div>
              <Button type='primary'>สมัครเรียน</Button>
            </div>
          </header>

          <hr className={styles.hr} />

          <div className={styles.desc}>
            <p>{course.description}</p>
          </div>

          <hr className={styles.hr} />

          <h2 className={styles.course_title}>เนื้อหาทั้งหมดในคอร์สนี้</h2>

          <div className={styles.course_content}>
            {course.lessons.map((lesson, index) => (
              <CourseSectionCard index={index + 1} {...lesson} key={index} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CourseIdPage

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  return {
    props: {
      course: {
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
          {
            title: 'ตรรกศาสตร์'
          },
          {
            title: 'แคลคูลัส',
          },
          {
            title: 'จำนวนเชิงซ้อน'
          },
          {
            title: 'Expo & log'
          },
          {
            title: 'ความน่าจะเป็น'
          },
          {
            title: 'ลำดับ และ อนุกรม'
          },
          {
            title: 'ภาพตัดกรวย',
          },
        ]
      }
    }
  }
}