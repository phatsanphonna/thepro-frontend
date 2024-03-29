import HeaderText from '@/components/HeaderText/HeaderText.component';
import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { courseList } from '@/libs/courseList.lib';
import styles from '@/styles/pages/course/coursePage.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Grade = {
  name: string;
  value: string;
}

const descriptionList = [
  'สอนสดที่ THE PRO เท่านั้น',
  'รับนักเรียนจำนวนจำกัด',
  'ทุกคอร์สหยุดเทศกาล สงกรานต์ และ ปีใหม่',
  'การขอชดเชย จะเป็นการชดเชยด้วยคลิปวิดีโอสอน ในวันที่ขาดเรียน ' +
  '(กรุณาแจ้งครูผู้สอน เพื่อขอชดเชย ทุกครั้งที่ขาด)'
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

          <div className='w-full md:w-1/6 flex flex-col md:flex-row justify-between items-center gap-2'>
            <a href="https://lin.ee/BdFh3Km" target='_blank' rel="noreferrer" className='w-full'>
              <button className='btn btn-primary w-full'>
                สมัครเรียน
              </button>
            </a>
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
                        <p>{c.description}</p>
                        <span>{c.time}</span>
                      </div>
                    </div>

                    <div className={styles.grade}>
                      <p>{c.grade}</p>
                      {c.name === 'PRO KIDS 2' ? (
                        <span className='md:text-lg flex flex-col text-right'>{
                          (c.price as string[]).map((info, index) => (
                            <span key={index}>{info}</span>
                          ))}
                        </span>
                      ) : (
                        <span className='md:text-lg'>{c.price.toLocaleString()} บาท/เดือน</span>
                      )}
                    </div>

                    <div className={styles.grade}>
                      <ul>
                        {c.subjects?.map((subject, index) => (
                          <li key={index}>
                            <p>{subject.name}</p>
                            <span className='flex flex-col items-end'>
                              {Array.isArray(subject.time) ? (
                                subject.time.map((t, index) => <span key={index}>{t}</span>)
                              ) : subject.time}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {c.specialTime && (
                      <>
                        <div className={styles.grade__time}>
                          <p>เลือกเรียนได้ตามเวลาดังนี้</p>
                          <ul>
                            <li>
                              <span>- <span>คอร์ส A</span>: เลือกได้ 2 วัน (จันทร์ - ศุกร์)</span>
                              <span>วันละ 2 ชั่วโมง (2 วัน/สัปดาห์)</span>
                            </li>
                            <li>
                              <span>- <span>คอร์ส B</span>: วันเสาร์ (ช่วงเช้า)</span>
                              <span>วันละ 4 ชั่วโมง (1 วัน/สัปดาห์)</span>
                            </li>
                            <li>
                              <span>- <span>คอร์ส C</span>: วันเสาร์ (ช่วงบ่าย)</span>
                              <span>วันละ 4 ชั่วโมง (1 วัน/สัปดาห์)</span>
                            </li>
                            <li>
                              <span>- <span>คอร์ส D</span>: วันอาทิตย์ (ช่วงเช้า)</span>
                              <span>วันละ 4 ชั่วโมง (1 วัน/สัปดาห์)</span>
                            </li>
                            <li>
                              <span>- <span>คอร์ส E</span>: วันอาทิตย์ (ช่วงบ่าย)</span>
                              <span>วันละ 4 ชั่วโมง (1 วัน/สัปดาห์)</span>
                            </li>
                          </ul>
                        </div>

                        <div className={styles.remarks}>
                          {c.remarks.map((remark, index) => (
                            <small key={index}>*{remark}*</small>
                          ))}
                        </div>
                      </>
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

                    <div className={c.name != 'PRE PRO 3' ? styles.grade : styles.grade_special}>
                      <p>{c.grade}</p>
                      {c.name == 'PRE PRO 3' || c.name == 'PRE PRO 1' ? (
                        <span className='md:text-lg flex flex-col text-right'>{
                          (c.price as string[]).map((info, index) => (
                            <span key={index}>{info}</span>
                          ))}</span>
                      ) : c.name.includes('PRE PRO 2') ? (
                        <span className='md:text-lg'>{c.price.toLocaleString()} บาท/เดือน</span>
                      ) : (
                        <span key={index}>{c.price} บาท/เดือน</span>
                      )}
                    </div>

                    <div className={styles.grade}>
                      <ul>
                        {c.subjects?.map((subject, index) => (
                          <li key={index}>
                            <p>{subject.name}</p>
                            <span className='flex flex-col lg:items-end'>
                              {Array.isArray(subject.time) ? (
                                subject.time.map((t, index) => <span key={index} className=''>{t}</span>)
                              ) : subject.time}
                            </span>
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
              <h3>PRO TGAT 1-3 (1,800 บาท/เดือน)</h3>
              <p>เรียน 1 วัน / สัปดาห์ (วันละ 4 ชั่วโมง)</p>
              <span className='font-medium'>*TGAT 1-3 จะเรียนในวันเดียวกัน</span>

              {courseList.tgat.map((c, index) => (
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
                      {c.desc.map((d, index) => (
                        <li key={index}>
                          <p>{d}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}

              {courseList.tgat23.map((c, index) => (
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
      </Layout >
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