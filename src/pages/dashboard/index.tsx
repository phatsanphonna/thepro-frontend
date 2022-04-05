import React, { useEffect } from 'react'
import HeaderText from '@/components/HeaderText/HeaderText.component'
import Layout from '@/components/Layout/Layout.component'
import Metadata from '@/components/Metadata.component'

type Props = {}

const DashboardPage = () => {

  useEffect(() => {
    console.log(localStorage.getItem('jwt'))
  }, [])

  return (
    <>
      <Metadata title='Dashboard | THE PRO' />

      <Layout>
        <HeaderText>Dashboard</HeaderText>


      </Layout>

    </>
  )
}

export default DashboardPage