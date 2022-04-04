import React from 'react'
import styles from './ProductCard.component.module.css'

import Button from '../Button/Button.component'
import Link from 'next/link'

type Props = {
  title: string
  shortDescription: string
  price: number
  slug: string
}

const ProductCard: React.FC<Props> = ({ title, shortDescription, price, slug }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__header}>
        <Link href={`/course/${slug}`} passHref>
          <a>
            <h4>{title}</h4>
          </a>
        </Link>
      </div>

      <p>{shortDescription}</p>

      <div className={styles.productCard__footer}>
        <Link href={`/course/${slug}`} passHref>
          <a>
            <Button type='outline-primary'>ดูคอร์สนี้</Button>
          </a>
        </Link>
        <p>{price}฿</p>
      </div>
    </div>
  )
}

export default ProductCard