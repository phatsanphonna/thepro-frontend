import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import styles from '@/styles/pages/course/coursePage.module.css'

import Layout from '@/components/Layout/Layout.component'
import HeaderText from '@/components/HeaderText/HeaderText.component'
import Metadata from '@/components/Metadata.component'
import ProductCard from '@/components/course/ProductCard/ProductCard.component'
import Dropdown from '@/components/Dropdown/Dropdown.component'

type CourseCategory = {
  name: string
  value: string
}

type CourseSlug = {
  name: string
  slug: string
}

const courseCategory: CourseCategory[] = [
  {
    name: 'ทั้งหมด',
    value: JSON.stringify({ name: 'ทั้งหมด', slug: 'all' })
  },
  {
    name: 'คณิตศาสตร์',
    value: JSON.stringify({ name: 'คณิตศาสตร์', slug: 'math' })
  },
  {
    name: 'ภาษาอังกฤษ',
    value: JSON.stringify({ name: 'ภาษาอังกฤษ', slug: 'english' })
  },
  {
    name: 'วิทยาศาสตร์ ม.ต้น',
    value: JSON.stringify({ name: 'วิทยาศาสตร์ ม.ต้น', slug: 'secondary-school-science' })
  },
  {
    name: 'วิทยาศาสตร์ ม.ปลาย',
    value: JSON.stringify({ name: 'วิทยาศาสตร์ ม.ปลาย', slug: 'high-school-science' })
  }
]

type Props = {}

const CoursePage: NextPage = (props: Props) => {
  const [
    courseSlug, setCourseSlug
  ] = useState<CourseSlug>({ name: 'ทั้งหมด', slug: 'all' })
  const [isFetching, setIsFetching] = useState(false)

  const router = useRouter()

  const fetchData = async (courseSlug: CourseSlug) => {
    setIsFetching(true)

    setCourseSlug(courseSlug)
    console.log(courseSlug);

    router.replace({
      query: {
        category: courseSlug.slug
      }
    }, undefined, {
      shallow: true
    })

    setIsFetching(false)
  }

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    await fetchData(JSON.parse(e.target.value))
  }

  return (
    <>
      <Metadata title='คอร์สเรียน | THE PRO TUTOR' />
      <Layout>

        <HeaderText>คอร์สเรียน{courseSlug.name}</HeaderText>

        <div className={styles.option}>
          <div className={styles.subject}>
            <p>วิชา :</p>
            <Dropdown
              valueList={courseCategory}
              onChange={handleChange}
              disabled={isFetching}
            />
          </div>
        </div>
        <hr className={styles.hr} />

        <div className={styles.grid}>
          <ProductCard
            title='TP001 | PROMATH TCAS65 ติวสอบวิชา PAT 1 คณิตศาสตร์ วิชาสามัญ คณิตศาสตร์ 1'
            shortDescription='คำอธิบายแบบสั้น ๆ'
            price={500}
            slug='TP001'
          />
          <ProductCard title='ไตเติ้ล' shortDescription='คำอธิบายแบบสั้น ๆ' price={500} slug='TP001' />
          <ProductCard title='ไตเติ้ล' shortDescription='คำอธิบายแบบสั้น ๆ' price={500} slug='TP001' />
          <ProductCard title='ไตเติ้ล' shortDescription='คำอธิบายแบบสั้น ๆ' price={500} slug='TP001' />
          <ProductCard title='ไตเติ้ล' shortDescription='คำอธิบายแบบสั้น ๆ' price={500} slug='TP001' />
        </div>
      </Layout>
    </>
  )
}

export default CoursePage