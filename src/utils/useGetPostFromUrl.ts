import { usePostQuery } from '../generated/graphql'
import { useGetIntId } from './useGetIntId'

const intId = useGetIntId()

export const useGetPostFromUrl = () => {
  return usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  })
}
