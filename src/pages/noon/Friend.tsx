import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import Sidebar from './Sidebar'

function Friend() {
  const dispatch = useDispatch()

  return <div className=""></div>
}

export default Friend
