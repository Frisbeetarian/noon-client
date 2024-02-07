import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
  description: `Noon – Open source, secure, free communication platform.`,
  image: 'https://noon.tube/static/images/noon-banner.png',
  type: 'website',
}

export default class Document extends NextDocument {
  // static async getInitialProps(ctx) {
  //   const initialProps = await NextDocument.getInitialProps(ctx)
  //   const { asPath } = ctx.ctx.router
  //   return { ...initialProps, asPath }
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <link href="/static/favicons/site.webmanifest" rel="manifest" />
          <link
            href="/static/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />

          <link
            color="#4a9885"
            href="/static/favicons/safari-pinned-tab.svg"
            rel="mask-icon"
          />

          <meta content="#ffffff" name="theme-color" />
          <meta content="#ffffff" name="msapplication-TileColor" />
          <meta
            content="/static/favicons/browserconfig.xml"
            name="msapplication-config"
          />
          <meta
            content="vnMaHDjyCuf7dKrZrYXWZNwaVrwQthzJLqhaTw5pLjU"
            name="google-site-verification"
          />
          <meta
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            name="robots"
          />

          <meta name="robots" content="follow, index" />
          <meta content={meta.description} name="description" />
          {/*<meta*/}
          {/*  property="og:url"*/}
          {/*  content={`https://noon.tube${this.props.asPath}`}*/}
          {/*/>*/}
          {/*<link*/}
          {/*  rel="canonical"*/}
          {/*  href={`https://noon.tube${this.props.asPath}`}*/}
          {/*/>*/}
          <meta property="og:type" content={meta.type} />
          <meta property="og:site_name" content="Noon" />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
        </Head>

        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
