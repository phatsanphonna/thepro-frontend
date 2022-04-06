import React from 'react'
import Layout from '@/components/Layout/Layout.component'
import { useAuth } from '@/libs/auth/auth.lib'
import { useRouter } from 'next/router'

type Props = {}

const MePage = (props: Props) => {
  useAuth(useRouter())

  return (
    <>
      <Layout>

      </Layout>
    </>
  )
}

export default MePage