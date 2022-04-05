import Head from 'next/head'
import React from 'react'

type Props = {
  title: string | null
  description?: string
}

const Metadata = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title} | THE PRO</title>
      <meta name='description' content={description} />
      <link rel='icon' href='./favicon.ico' />
    </Head>
  )
}

export default Metadata