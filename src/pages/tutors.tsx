import HeaderText from '@/components/HeaderText/HeaderText.component';
import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import { tutorProfiles } from '@/libs/tutorProfiles';
import type { NextPage } from 'next';
import Image from 'next/image';

const TutorsPage: NextPage = () => {
  return (
    <>
      <Metadata title='ติวเตอร์ประจำสถาบัน | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

      <Layout>
        <HeaderText>ติวเตอร์ประจำสถาบัน</HeaderText>

        <div className='flex flex-wrap justify-center gap-x-8 gap-y-2 lg:gap-y-4'>
          {tutorProfiles.map((profile, index) => (
            <div key={index} className='w-56 flex flex-col justify-start items-center'>
              <div className='transition-all relative w-56 h-80 m-2 select-none hover:shadow-lg hover:-translate-y-2'>
                <Image src={profile.pictures} alt={profile.name} layout='fill' className='rounded' loading='lazy' />
              </div>

              <div className='text-center w-full flex flex-col justify-center items-center'>
                <p className='font-bold text-lg'>{profile.name}</p>
                <span>{profile.subject}</span>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default TutorsPage