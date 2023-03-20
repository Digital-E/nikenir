import Head from 'next/head'
import {SITE_NAME} from '../lib/constants'

export default function Meta({ title, content }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"></meta>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${process.env.basePath}/favicon/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${process.env.basePath}/favicon/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${process.env.basePath}/favicon/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${process.env.basePath}/favicon/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${process.env.basePath}/favicon/safari-pinned-tab.svg`}
        color="#000000"
      />
      <link rel="shortcut icon" href={`${process.env.basePath}/favicon/favicon.ico`} />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content={`${process.env.basePath}/favicon/browserconfig.xml`} />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${process.env.basePath}/feed.xml`} />
      <title>{title}</title>
      <meta
        name="description"
        content={content}
      />

      {/* Fonts */}
      <link href="https://cdn.fonts.net/kit/50d84ed0-3292-11ec-a0c8-06f8b41bab72/50d84ed0-3292-11ec-a0c8-06f8b41bab72.css" rel="stylesheet" />

      {/* tsParticles Confetti New */}
      {/* <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.9.3/tsparticles.confetti.bundle.min.js" /> */}
      
      {/* tsParticles */}
      {/* <script src="https://cdn.jsdelivr.net/npm/tsparticles@2.9.3/tsparticles.bundle.min.js" /> */}

    </Head>
  )
}
