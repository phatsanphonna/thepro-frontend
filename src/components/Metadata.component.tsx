import Head from 'next/head'

type Props = {
  title: string | null
  description?: string
}

const Metadata = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='./favicon.ico' />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="./thumbnail.jpg" />
    </Head>
  )
}

export default Metadata