import HeaderText from '@/components/HeaderText/HeaderText.component';
import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { courseList } from '@/libs/courseList.lib';
import styles from '@/styles/pages/course/coursePage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  const foundGrade = gradeCategory.find((g => g.value === grade))
  return foundGrade || gradeCategory[0]
}

type Props = {
  grade: Grade
}

const CoursePage: NextPage<Props> = ({ grade: queryGrade }) => {
  const router = useRouter()

  const [grade, setGrade] = useState<Grade>(queryGrade)

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

          <div className='w-full md:w-1/3 flex flex-col md:flex-row justify-between items-center gap-2'>
            <a href="https://lin.ee/BdFh3Km" target='_blank' rel="noreferrer" className='w-full'>
              <button className='btn btn-primary w-full'>
                สมัครเรียน
              </button>
            </a>
            <Link href='/payment' passHref>
              <a className='w-full'>
                <button className='btn btn-pink w-full'>
                  ชำระเงิน
                </button>
              </a>
            </Link>
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

        {(grade.value === 'primary' || grade.value === 'all') && (
          <>
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
                      <p>{c.grade}</p>
                      <span className='md:text-lg'>{c.price.toLocaleString()} บาท/เดือน</span>
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

            <div className={styles.course}>
              <h3>PRE PRO</h3>

              {courseList.prePro.map((c, index) => {
                return (
                  <section
                    className={styles.section}
                    key={index}
                  >
                    <div className={styles.course_section_title}>
                      <h4>{c.name}</h4>
                      <div className={styles.course_section_title__second_line}>
                        <p>{c.description}</p>
                        <span>{c.time}</span>
                      </div>
                    </div>

                    <div className={styles.grade}>
                      <p>{c.grade}</p>
                      <span className='md:text-lg'>{c.price.toLocaleString()} บาท/เดือน</span>
                    </div>

                    <div className={styles.grade}>
                      <ul>
                        {c.subject.map((s, index) => (
                          <li key={index}>
                            <p>{s.name}</p>
                            <span>{s.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.remarks}>
                      {c.remarks.map((remark, index) => (
                        <small key={index}>*{remark}*</small>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </>
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

                  {c.special ? (
                    <>
                      <div className={styles.grade}>
                        <ul>
                          {c.grade.map((g, index) => (
                            <li key={index}>
                              <p>{g.name}</p>
                              {<span className='md:text-lg'>{g.time}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.remarks}>
                        <small>*อาจมีการเรียนเกินเวลาถ้านักเรียนทำไม่เสร็จ</small>
                      </div>
                    </>
                  ) : (
                    <div className={styles.grade}>
                      <ul>
                        {c.grade.map((g, index) => (
                          <li key={index}>
                            <p>{g.name}</p>
                            {<span className='md:text-lg'>{g.price.toLocaleString()} บาท/เดือน</span>}
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

        {(grade.value === 'high' || grade.value === 'all') && (
          <>
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
                              <p>{g.name}</p>
                              <span className='md:text-lg'>วิชาละ {g.price.toLocaleString()} บาท/เดือน</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className={styles.grade}>
                        <ul>
                          {c.grade.map((g, index) => (
                            <li key={index}>
                              <p>{g.name}</p>
                              <span className='md:text-lg'>{g.price.toLocaleString()} บาท/เดือน</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                )
              })}
            </div>

            <div className={styles.course}>
              <h3>PRO TGAT (1,639 บาท/เดือน)</h3>
              <p>เรียน 1 วัน / สัปดาห์ (วันละ 4 ชั่วโมง)</p>

              {courseList.tgat.map((c, index) => (
                <section
                  className={styles.section}
                  key={index}
                >
                  <div className={styles.course_section_title}>
                    <h4>{c.name}</h4>

                    <div className={styles.course_section_title__second_line}>
                      <p>{c.subject}</p>
                    </div>
                  </div>
                  <div className={styles.grade}>
                    <ul>
                      {c.desc.map((d, index) => (
                        <li key={index}>
                          <p>{d}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>

            <div className={styles.course}>
              <h3>PRO TCAS</h3>
              {courseList.tcas.map((c, index) => {
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

                    <div className='p-2 flex flex-col text-lg'>
                      <span key={index}>{c.desc}</span>
                    </div>
                  </section>
                )
              })}
            </div>
          </>
        )}
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryGrade = compareGrade(query.grade as string);

  return {
    props: {
      grade: queryGrade
    }
  }
}

export default CoursePage