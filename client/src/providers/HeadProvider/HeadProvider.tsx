import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { FC, ReactNode } from 'react'

import Favicons from './Favicons'
import { accentColor, bgColor } from '@/config/constant.config'

const HeadProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NextNProgress
        color={accentColor}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />

      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0"
        />

        <Favicons />

        <meta name="theme-color" content={bgColor} />
        <meta name="msapplication-navbutton-color" content={bgColor} />
        <meta name="apple-mobile-web-app-status-bar-style" content={bgColor} />
      </Head>

      {children}
    </>
  )
}
export default HeadProvider
