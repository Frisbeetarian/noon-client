import React, { useEffect, useState } from 'react'
import { Wrapper } from '../../components/Wrapper'
import { useLoginMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { Layout } from '../../components/Layout'

const Conference: React.FC<{}> = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  return (
    <Layout variant="small">
      <h1>Conference</h1>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Conference)
