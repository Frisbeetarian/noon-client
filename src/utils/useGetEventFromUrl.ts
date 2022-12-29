import { useEventQuery } from '../generated/graphql'
import { useGetIntId } from './useGetIntId'

export const useGetEventFromUrl = () => {
  const intId = useGetIntId()
  console.log('int id', intId)

  return useEventQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  })
}
