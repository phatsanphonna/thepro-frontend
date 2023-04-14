import HeaderText from '@/components/HeaderText/HeaderText.component';
import Layout from '@/components/Layout/Layout.component';
import Metadata from '@/components/Metadata.component';
import styles from '@/styles/pages/reviewPage.module.css';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const reviewList = [
  '/promotion_pictures/pm_review_64_1.jpg',
  '/promotion_pictures/pm_review_64_2.jpg',
  '/promotion_pictures/pm_review_63_1.jpg',
  '/promotion_pictures/pm_review_63_2.jpg',
  '/promotion_pictures/pm_review_61_1.jpg',
  '/promotion_pictures/pm_review_61_2.jpg',
]

const ReviewPage: NextPage = () => {
  return (
    <>
      <Metadata title='รีวิว | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR' />

      <Layout>
        <HeaderText>รีวิว</HeaderText>

        <Review />
      </Layout>
    </>
  )
}

const Review: React.FC = () => {
  const [isMoreInfoShown, setIsMoreInfoShown] = useState(false)

  const [width, setWidth] = useState(768)

  useEffect(() => {
    setWidth(window.innerWidth)

    if (window.innerWidth > 768) {
      setIsMoreInfoShown(true)
    }
  }, [])

  return (
    <div className={styles.review}>
      <div className={[styles.wrapper, styles.review__layout].join(' ')}>
        <div className={styles.review_grid}>
          {reviewList.map((review, index) => {
            if (isMoreInfoShown || width > 768) {
              return (
                <div className={styles.review_pics} key={index}>
                  <Image
                    className='rounded'
                    alt='PM Review'
                    layout='fill'
                    objectFit='cover'
                    src={review}
                  />
                </div>
              )
            } else {
              if (index >= 3) { return }

              return (
                <div className={styles.review_pics} key={index}>
                  <Image
                    className='rounded'
                    alt='PM Review'
                    layout='fill'
                    objectFit='cover'
                    src={review}
                  />
                </div>
              )
            }
          })}
        </div>
        {(!isMoreInfoShown) && (
          <div className={styles.chevron}>
            <ChevronDownIcon
              width={40}
              onClick={() => setIsMoreInfoShown(true)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewPage