import HeaderText from '@/components/HeaderText/HeaderText.component'
import Layout from '@/components/Layout/Layout.component'
import Metadata from '@/components/Metadata.component'
import { NextPage } from 'next'

const PaymentPage: NextPage = () => {
  return (
    <>
      <Metadata title='ขั้นตอนการชำระเงิน | สถาบันกวดวิชา THE PRO TUTOR' />

      <Layout>
        <HeaderText>ขั้นตอนการชำระเงิน</HeaderText>

        <div className='w-full'>
          <ol>
            <li>
              <h4 className='font-medium text-lg'>1. ดูรายละเอียดคอร์ส หรือ ติดต่อสอบถาม</h4>
            </li>
          </ol>
        </div>
      </Layout>
    </>
  )
}

export default PaymentPage