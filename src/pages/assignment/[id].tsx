import Footer from '@/components/Footer/Footer.component';
import Metadata from '@/components/Metadata.component';
import Navbar from '@/components/Navbar/Navbar.component';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.component';
import { ServerAxios } from '@/libs/http';
import styles from '@/styles/pages/assignmentById.module.css';
import { DocumentIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/20/solid';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

interface Material {
  id: string;
  name: string;
  type: 'FILE' | 'VIDEO';
  location: string;
}

interface Teacher {
  firstname: string;
  lastname: string;
  nickname?: string;
  id: string;
}

interface Lesson {
  id: string;
  title: string;
  descripton?: any;
  materialsId: string[];
  materials: Material[];
  lastUpdated: string;
  teacherId: string;
  teacher: Teacher;
}

interface Assignment {
  id: string;
  assignDate: Date;
  expireDate: Date;
  isFinished: boolean;
  assignToId: string;
  lessonId: string;
  lesson: Lesson;
}

type Props = {
  assignment: Assignment
}

const CourseWatchPage: NextPage<Props> = ({ assignment }) => {
  const [currentVideo, setCurrentVideo] = useState<string | null>(
    assignment.lesson.materials.find((m) => m.type === 'VIDEO')?.location || null
  )

  const formatLastUpdated = new Intl.DateTimeFormat('th-TH', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  })
    .format(new Date(assignment.lesson.lastUpdated))

  const changeVideo = (id: string) => {
    setCurrentVideo(id);
  }

  return (
    <>
      <Metadata
        title={`${assignment.lesson.title || 'บทเรียน'} | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR`}
      />

      <Navbar />

      <div className={styles.layout}>
        <div className={styles.root}>
          <div className='container mx-auto w-full'>
            <div className='pt-24 py-10 h-full'>
              <h2 className='font-bold text-2xl md:text-4xl text-white mb-8 px-4'>
                {assignment.lesson.title}
              </h2>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-2 px-4 md:px-0 h-full'>
                <div className='w-full h-full aspect-video'>
                  <VideoPlayer source={currentVideo || ''} />
                </div>
                <section className='lg:px-8 py-4 lg:py-2 text-white flex flex-col gap-4 w-full'>
                  <div className='bg-white text-black p-4 rounded flex flex-row items-center gap-2'>
                    <UserCircleIcon width={52} height={52} />
                    <div className='flex flex-col'>
                      <h6 className='font-medium text-large md:text-xl'>
                        {assignment.lesson.teacher.firstname} {assignment.lesson.teacher.lastname} {
                        assignment.lesson.teacher.nickname && (
                          `(${assignment.lesson.teacher.nickname})`
                        )}
                      </h6>
                      <p>อัพเดทล่าสุด: {formatLastUpdated}</p>
                    </div>
                  </div>

                  {/* {assignment.lesson.descripton && (
                  <div className='border p-4 rounded flex flex-col gap-2'>
                    <h4 className='font-medium text-2xl underline'>
                      คำอธิบาย
                    </h4>
                    <article className='prose prose-base'>
                      {assignment.lesson.descripton}
                    </article>
                  </div>
                )} */}

                  <div className='border p-4 rounded flex flex-col gap-2 w-full'>
                    <h4 className='font-medium text-2xl underline'>
                      เอกสารประกอบการเรียน
                    </h4>
                    <ul className='grid grid-cols-1'>
                      {assignment.lesson.materials.map((material, index) => {
                        if (material.type === 'FILE') {
                          return (

                            <li key={index}>
                              <a
                                key={index}
                                href={`${process.env.NEXT_PUBLIC_URL}/api/file/${material.id}`}
                                target='_blank'
                                rel="noreferrer"
                                className='h-full inline-flex gap-2 items-center cursor-pointer hover:underline'
                              >
                                <DocumentIcon width={20} height={20} />
                                {material.name}
                              </a>
                            </li>

                          )
                        } else {
                          return (
                            <li
                              key={index}
                              onClick={() => changeVideo(material.location)}
                              className='inline-flex gap-2 items-center cursor-pointer hover:underline'
                            >
                              <VideoCameraIcon width={20} height={20} />
                              {material.name}
                            </li>
                          )
                        }
                      })}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, params }) => {
  const { status, data } = await ServerAxios.get<Assignment>(
    `/assignment/${params!.id}`, {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie
    },
    validateStatus: () => true
  })

  console.log(JSON.stringify(data, null, 4));
  
  if (status === 404) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      assignment: data
    }
  }
}

export default CourseWatchPage