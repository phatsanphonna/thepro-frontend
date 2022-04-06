import type { NextPage } from 'next'
import styles from '../../styles/pages/course/coursePage.module.css'

import Layout from '@/components/Layout/Layout.component'
import HeaderText from '@/components/HeaderText/HeaderText.component'
import Metadata from '@/components/Metadata.component'
import ProductCard from '@/components/course/ProductCard/ProductCard.component'

type Props = {}

const CoursePage: NextPage = (props: Props) => {
  return (
    <>
      <Metadata title='คอร์สเรียนทั้งหมด | THE PRO TUTOR' />
      <Layout>

        <HeaderText>คอร์สเรียนทั้งหมด</HeaderText>

        <div className={styles.grid}>
          <ProductCard title='ไตเติ้ล' shortDescription='คำอธิบายแบบสั้น ๆ' price={500} slug='TP001' />
        </div>
      </Layout>
    </>
  )
}

export default CoursePage