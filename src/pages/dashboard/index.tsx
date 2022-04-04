import React from 'react'
import HeaderText from '../../components/HeaderText/HeaderText.component'
import Layout from '../../components/Layout/Layout.component'
import Metadata from '../../components/Metadata.component'

type Props = {}

const DashboardPage = () => {
  return (
    <>
      <Metadata title='Dashboard' />

      <Layout>
        <HeaderText>Dashboard</HeaderText>

        
      </Layout>

    </>
  )
}

export default DashboardPage