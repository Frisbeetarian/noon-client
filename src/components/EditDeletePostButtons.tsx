import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'
import { useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'

interface EditDeletePostButtonsProps {
  id: number
  creatorId: number
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const meData = useSelector(getLoggedInUser)
  const [deletePost] = useDeletePostMutation()

  if (meData?.me?.id !== creatorId) {
    return null
  }

  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label="edit post"
        />
      </NextLink>

      <IconButton
        // colorScheme="red"
        icon={<DeleteIcon />}
        aria-label="delete post"
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({
                id: 'Post:' + id,
              })
            },
          })
        }}
      />
    </Box>
  )
}
