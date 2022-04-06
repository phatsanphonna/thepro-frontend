import { useEffect } from 'react'
import HeaderText from '@/components/HeaderText/HeaderText.component'
import Layout from '@/components/Layout/Layout.component'
import Metadata from '@/components/Metadata.component'
import { useAuth } from '@/libs/auth/auth.lib'
import { useRouter } from 'next/router'

type Props = {}

const DashboardPage = () => {
  const router = useRouter()
  useAuth(router)

  useEffect(() => {
  },[])
  return (
    <>
      <Metadata title='Dashboard | THE PRO TUTOR' />

      <Layout>
        <HeaderText>Dashboard</HeaderText>


      </Layout>

    </>
  )
}

export default DashboardPage