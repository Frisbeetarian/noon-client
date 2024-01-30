import axios from 'axios'
import React from 'react'
import { NextPageContext } from 'next'

const createAxiosInstance = (ctx?: NextPageContext) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    withCredentials: true,
    headers: {
      ...(typeof window === 'undefined' && ctx?.req?.headers.cookie
        ? { Cookie: ctx.req.headers.cookie }
        : { Cookie: ctx?.req?.headers.cookie }),
    },
  })

  return axiosInstance
}

export const withAxios = (PageComponent) => {
  const WithAxiosComponent = ({ ...props }) => {
    const axiosInstance = props.axios || createAxiosInstance()

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
