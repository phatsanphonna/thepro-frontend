import Head from 'next/head'

type Props = {
  title: string | null
  description?: string
}

const defaultDescription =
  `สถาบันกวดวิชาที่เพิ่มความรู้ ครอบคลุม และยั่งยืนที่สุด
รับสอนพิเศษ คณิตศาสตร์ วิทยาศาสตร์ ม.ต้น ฟิสิกส์ เคมี ชีววิทยา
ตั้งแต่ ป.5 - ม.6 สอนสดและออนไลน์ โดยทีมครูจากมหาวิทยาลัยดัง
ปูพื้นฐานแน่น เน้นลงมือทำ สามารถนำไปต่อยอดได้ ทั้งในการเรียนและการงาน`

const Metadata = ({ title, description = defaultDescription }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='./favicon.ico' />
      <meta itemProp='image' content='./thumbnail.jpg' />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="./thumbnail.jpg" />
      <meta property="og:image" content="./thumbnail.jpg" />
    </Head>
  )
}

export default Metadata