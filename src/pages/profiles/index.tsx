import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'

import { useDispatch, useSelector } from 'react-redux'
import { getUnresolvedBugs, loadBugs } from '../../store/bugs'

const Profiles = ({}) => {
  const dispatch = useDispatch()
  const bugs = useSelector(getUnresolvedBugs)

  useEffect(() => {
    dispatch(loadBugs())
  }, [])

  console.log('BUGS: ', bugs)

  return (
    <Layout>
      <header>Profiles Page</header>
    </Layout>
  )
}

export default Profiles
