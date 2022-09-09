import { useRouter } from 'next/router'

export const useGetStringUuid = () => {
  const router = useRouter()
  // console.log('query uuid:', router.query)
  const stringUuid =
    typeof router.query.id === 'string' ? router.query.id : null

  return stringUuid
}
