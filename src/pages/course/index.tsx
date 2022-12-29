import HeaderText from '@/components/HeaderText/HeaderText.component';
import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { courseList } from '@/libs/courseList.lib';
import styles from '@/styles/pages/course/coursePage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { GetServerSideProps, NextPage } from 'next'
type Grade = {
  name: string;
  value: string;
}

const descriptionList = [
  'สอนสดที่ THE PRO เท่านั้น',
  'รับนักเรียนจำนวนจำกัด',
  'ทุกคอร์สหยุดเทศกาล สงกรานต์ และ ปีใหม่',
  'หากมีการขาดเรียน การขอชดเชย (ตามดุลยพินิจของผู้สอน)'
]

const gradeCategory: Grade[] = [
  {
    name: 'ทั้งหมด',
    value: 'all'
  },
  {
    name: 'ประถม',
    value: 'primary'
  },
  {
    name: 'มัธยมต้น',
    value: 'secondary'
  },
  {
    name: 'มัธยมปลาย',
    value: 'high'
  }
]

const compareGrade = (grade: string) => {
  switch (grade) {
    case 'primary':
      return gradeCategory[1]
    case 'secondary':
      return gradeCategory[2]
    case 'high':
      return gradeCategory[3]
    case 'all':
      return gradeCategory[0]
    default:
      return gradeCategory[0]
  }
}

type Props = {
  grade: string
}

const CoursePage: NextPage<Props> = ({ grade: queryGrade }) => {
  const router = useRouter()

  const [grade, setGrade] = useState<Grade>(compareGrade(queryGrade))

  const handleChangeGrade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentGrade = compareGrade(e.target.value)
    setGrade(currentGrade!)
  }

  useEffect(() => {
    const { query, pathname, isReady } = router

    if (!isReady) return

    router.push({
      pathname,
      query: {
        ...query,
        grade: grade.value
      },
    })
  }, [grade])


  return (
    <>
      <Metadata title={
        grade.value !== 'all'
          ? `คอร์สเรียนระดับชั้น${grade.name} | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR`
          : `คอร์สเรียนทั้งหมด | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR`
      }
      />

      <Layout>
        <HeaderText>
          คอร์สเรียน{
            grade.value !== 'all'
              ? `ระดับชั้น${grade.name}`
              : `ทั้งหมด`
          }
        </HeaderText>

        <div className={styles.option}>
          <div className={styles.subject}>
            <p>ระดับชั้น :</p>
            <select
              defaultValue={grade.name}
              onChange={handleChangeGrade}
              className={styles.select}
            >
              {gradeCategory.map((value, index) => (
                <option
                  key={index}
                  value={value.value}
                  className={styles.option}
                >
                  {value.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className={styles.hr} />

        <div className={styles.description}>
          <h3>รายละเอียด</h3>
          <ul>
            {descriptionList.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>

        <hr className={styles.hr} />

        {(grade.value === 'primary' || grade.value === 'all') && (
          <div className={styles.course}>
            <h3>PRO KIDS</h3>
            {courseList.kids.map((c, index) => {
              return (
                <section
                  className={styles.section}
                  key={index}
                >
                  <div className={styles.course_section_title}>
                    <h4>{c.name}</h4>
                    <div className={styles.course_section_title__second_line}>
                      <p>{c.subject}</p>
                      <span>{c.time}</span>
                    </div>
                  </div>

                  <div className={styles.grade}>
                    <p>{c.grade}</p><span>{c.price.toLocaleString()} บาท/เดือน</span>
                  </div>

                  {c.specialTime && (
                    <div className={styles.grade__time}>
                      <p>เลือกเรียนได้ตามเวลาดังนี้</p>
                      <ul>
                        <li>
                          <span>- <span>คอร์ส A</span>: เลือกได้ 2 วัน (จันทร์ - ศุกร์)</span>
                          <span>15.00 น. - 18.00 น.</span>
                        </li>
                        <li>
                          <span>- <span>คอร์ส B</span>: วันเสาร์ (ช่วงเช้า)</span>
                          <span>9.00 น. - 13.00 น.</span>
                        </li>
                        <li>
                          <span>- <span>คอร์ส C</span>: วันเสาร์ (ช่วงบ่าย)</span>
                          <span>13.00 น. - 17.00 น.</span>
                        </li>
                        <li>
                          <span>- <span>คอร์ส D</span>: วันอาทิตย์ (ช่วงเช้า)</span>
                          <span>9.00 น. - 13.00 น.</span>
                        </li>
                        <li>
                          <span>- <span>คอร์ส E</span>: วันอาทิตย์ (ช่วงบ่าย)</span>
                          <span>13.00 น. - 17.00 น.</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}

        {(grade.value === 'secondary' || grade.value === 'all') && (
          <div className={styles.course}>
            <h3>PRO TEEN</h3>
            {courseList.teen.map((c, index) => {
              return (
                <section
                  className={styles.section}
                  key={index}
                >
                  <div className={styles.course_section_title}>
                    <h4>{c.name}</h4>
                    <div className={styles.course_section_title__second_line}>
                      <p>{c.subject}</p>
                      <span>{c.time}</span>
                    </div>
                  </div>

                  <div className={styles.grade}>
                    <ul>
                      {c.grade.map((g, index) => (
                        <li key={index}>
                          <p>{g.name}</p><span>{g.price.toLocaleString()} บาท/เดือน</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {(grade.value === 'high' || grade.value === 'all') && (
          <div className={styles.course}>
            <h3>PRO HIGH</h3>
            {courseList.high.map((c, index) => {
              return (
                <section
                  className={styles.section}
                  key={index}
                >
                  <div className={styles.course_section_title}>
                    <h4>{c.name}</h4>
                    <div className={styles.course_section_title__second_line}>
                      <p>{c.subject}</p>
                      <span>{c.time}</span>
                    </div>
                  </div>

                  {c.name === 'PRO PHY, PRO CHEM, PRO BIO' ? (
                    <div className={styles.grade}>
                      <ul>
                        {c.grade.map((g, index) => (
                          <li key={index}>
                            <p>{g.name}</p><span>วิชาละ {g.price.toLocaleString()} บาท/เดือน</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className={styles.grade}>
                      <ul>
                        {c.grade.map((g, index) => (
                          <li key={index}>
                            <p>{g.name}</p><span>{g.price.toLocaleString()} บาท/เดือน</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      grade: query.grade ? query.grade : 'all'
    }
  }
}

export default CoursePage