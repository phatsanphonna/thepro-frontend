import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout/Layout.component'
import Metadata from '../components/Metadata.component'
import { setLoading } from '../redux/features/loading.feature'


const HomePage: NextPage = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Metadata title='หน้าหลัก' />

      <Layout>
        <button onClick={()=> {dispatch(setLoading(true))}}>click 1</button>
        <button onClick={()=> {dispatch(setLoading(false))}}>click 2</button>
      </Layout>
    </>
  )
}

export default HomePage
