import React from 'react'
import axios from 'axios'
import { NextPageContext } from 'next'

import { rateLimitDetected } from '../store/ui'
import store from '../store/store'

const createAxiosInstance = (ctx?: NextPageContext) => {
  // console.log('next public url env: ', process.env.NEXT_PUBLIC_URL)
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
        if (store) {
          store.dispatch(
            rateLimitDetected({
              isRateLimited: true,
              message: error.data.error,
              retryAfter: error.data.retryAfter,
              refresh: new Date().getTime(),
            })
          )
        }
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

    return { ...pageProps, axios: axiosInstance }
  }

  return WithAxiosComponent
}

export default withAxios
