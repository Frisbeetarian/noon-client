import { useCommunityQuery } from '../generated/graphql'
import { useGetIntId } from './useGetIntId'

export const useGetCommunityFromUrl = () => {
  const intId = useGetIntId()
  console.log('int id', intId)

  return useCommunityQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  })
}
