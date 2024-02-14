import React from 'react'
import { NextPageContext } from 'next'
import axios from 'axios'

const createAxiosInstance = (ctx?: NextPageContext) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    withCredentials: true,
    headers: {
      ...(typeof window === 'undefined' && ctx?.req?.headers.cookie
        ? { Cookie: ctx.req.headers.cookie }
        : {}),
    },
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('error from hoc:', error.response)

      if (error.response && error.response.status === 429) {
        // store.dispatch(
        //   rateLimitDetected({
        //     isRateLimited: true,
        //     message: error.data.error,
        //     retryAfter: error.data.retryAfter,
        //     refresh: new Date().getTime(),
        //   })
        // )
      } else {
        // store.dispatch(resetRateLimit())
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export const withAxios = (PageComponent) => {
  const WithAxiosComponent = ({ ...props }) => {
    const axiosInstance = props.axios || createAxiosInstance(props.ctx)

    return <PageComponent {...props} axios={axiosInstance} />
  }

  WithAxiosComponent.getInitialProps = async (ctx: NextPageContext) => {
    const axiosInstance = createAxiosInstance(ctx)

    let pageProps = {}
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps({
        ...ctx,
        axios: axiosInstance,
      })
    }

    return { ...pageProps, axios: axiosInstance, dispatch: ctx.store?.dispatch }
  }

  return WithAxiosComponent
}

export default withAxios
