import HeaderText from '@/components/HeaderText/HeaderText.component';
import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import type { NextPage } from 'next';

const TutorsPage: NextPage = () => {
  return (
    <>
      <Metadata title='ติวเตอร์ประจำสถาบัน | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

      <Layout>
        <HeaderText>ติวเตอร์ประจำสถาบัน</HeaderText>

        
      </Layout>
    </>
  )
}

export default TutorsPage