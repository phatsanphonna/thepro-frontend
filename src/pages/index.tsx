import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import Layout from '@/components/Layout/Layout.component'
import Metadata from '@/components/Metadata.component'
import { setLoading } from '@/redux/features/loading.feature'
import Link from 'next/link'


const HomePage: NextPage = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Metadata title='หน้าหลัก | THE PRO' />

      <Layout>
        <button onClick={() => { dispatch(setLoading(true)) }}>click 1</button>
        <button onClick={() => { dispatch(setLoading(false)) }}>click 2</button>

        <Link href='/dashboard/course/watch' passHref>
          <a>
            go to video section
          </a>
        </Link>
      </Layout>
    </>
  )
}

export default HomePage
