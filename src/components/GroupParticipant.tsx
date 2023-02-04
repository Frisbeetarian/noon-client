import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { addParticipants, removeParticipants } from '../store/groups'
import { PlusSquareIcon } from '@chakra-ui/icons'

const GroupParticipant = ({ participant }) => {
  const dispatch = useDispatch()
  const [participantsColor, setParticipantsColor] = useState('')

  return (
    <Flex
      className="p-2 py-4 md:py-2 cursor:pointer items-center justify-between border-b hover:text-green-500 text-white cursor-pointer"
      style={{ backgroundColor: participantsColor }}
      onClick={() => {
        if (participantsColor === '') {
          setParticipantsColor('green')
          dispatch(addParticipants(participant.uuid))
        } else {
          setParticipantsColor('')
          dispatch(removeParticipants(participant.uuid))
        }
      }}
    >
      {participant.username}

      <PlusSquareIcon className="" />
    </Flex>
  )
}

export default GroupParticipant
