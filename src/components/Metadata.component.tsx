import Head from 'next/head'

type Props = {
  title: string | null
  description?: string
}

const defaultDescription = [
  'สถาบันกวดวิชาเดอะโปร THE PRO TUTOR |',
  'รับสอนพิเศษ คณิตศาสตร์ วิทยาศาสตร์ ม.ต้น ฟิสิกส์ เคมี ชีววิทยา',
  'ตั้งแต่ ป.5 - ม.6 สอนสดและออนไลน์',
].join(' ')

const Metadata = ({ title, description = defaultDescription }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
  )
}

export default Metadata