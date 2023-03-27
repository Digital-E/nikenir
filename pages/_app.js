import '../styles/normalize.css'
import '../styles/globals.css'
import '../styles/flickity.css'
import '../styles/flickity-fade.css'

import { useEffect } from 'react'
import Script from 'next/script'
import { motion, AnimatePresence } from "framer-motion"


import { StateProvider } from "../store"

// import CookieConsent from "react-cookie-consent"

import Header from '../components/header'

import Sidebar from '../components/sidebar'

import Notification from '../components/notification'

import BackgroundGradient from '../components/background-gradient-code-canvas'

import DeviceRotation from '../components/device-rotation'

import { credits } from "../lib/credits"


let colors = [
  [
    '#00FC00',
    '#00C457',
    '#95FF61'
  ],
  [
    '#00FC00',
    '#FFB800',
    '#FFB800',
  ],
  [
    '#00FC00',
    '#C2BCEB',
    '#C2BCEB',
  ],
  [
    '#00FC00',
    '#A2D8EF',
    '#A2D8EF'
  ],
]

let dataInit = [
  {color: colors[0][0], rotate: -50},
  {color: colors[0][1], rotate: 20},
  {color: colors[0][2], rotate: -70},
  {color: colors[0][0], rotate: -30},
  {color: colors[0][1], rotate: -50},
  {color: colors[0][2], rotate: -20},
  {color: colors[0][0], rotate: -70},
]


let dataOne = [
  {color: colors[1][0], rotate: -50},
  {color: colors[1][1], rotate: 20},
  {color: colors[1][2], rotate: -70},
  {color: colors[1][0], rotate: -30},
  {color: colors[1][1], rotate: -50},
  {color: colors[1][2], rotate: -20},
  {color: colors[1][0], rotate: -70},
]

let dataTwo = [
  {color: colors[2][0], rotate: -50},
  {color: colors[2][1], rotate: 20},
  {color: colors[2][2], rotate: -70},
  {color: colors[2][0], rotate: -30},
  {color: colors[2][1], rotate: -50},
  {color: colors[2][2], rotate: -20},
  {color: colors[2][0], rotate: -70},
]

let dataThree = [
  {color: colors[3][0], rotate: -50},
  {color: colors[3][1], rotate: 20},
  {color: colors[3][2], rotate: -70},
  {color: colors[3][0], rotate: -30},
  {color: colors[3][1], rotate: -50},
  {color: colors[3][2], rotate: -20},
  {color: colors[3][0], rotate: -70},
]

let dataAll = [
  dataInit,
  dataOne,
  dataTwo,
  dataThree
]


function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
    }, 250)

    // Credits

//     console.clear();

//     console.log(`
// ${credits}
// samuelbassett.xyz
// Design + Development
// https://samuelbassett.xyz
//     `)

  },[])

  let desktopVariants = {
    pageInitial: {
      opacity: 0
    },
    pageAnimate: {
      opacity: 1,
      transition: {
        duration: 1
      }
    },
    pageExit: {
      opacity: 0,
      filter: "blur(20px)",
      transition: {
        opacity: {
          duration: 0.5
        },
        filter: {
          duration: 0.5,
        }
      }
    }
  }

  useEffect(() => {

    setTimeout(() => {

      let prevUrl = window.sessionStorage.getItem('prevUrl')
      
      if(prevUrl !== router.asPath) {
          window.scrollTo(0, 0);
        }

        window.sessionStorage.setItem('prevUrl', router.asPath)

        // Disable pinch zoom

        document.addEventListener('touchmove', function(event) {
          if(event.scale !== 1) {
            event.preventDefault()
          }
        }, {passive: false})
    }, 500)
  }, [router.asPath])
  

  return (
    <StateProvider>
      {/* Google Analytics */}
      <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-ZLVSQKJ2S0' />

      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZLVSQKJ2S0');
          `
        }} 
      />

      {/* tsParticles Confetti New */}
      <Script strategy='beforeInteractive' src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.9.3/tsparticles.confetti.bundle.min.js" />

      {/* tsParticles */}
      <Script strategy='beforeInteractive' src="https://cdn.jsdelivr.net/npm/tsparticles@2.9.3/tsparticles.bundle.min.js" />   

      <Script strategy='beforeInteractive' src="/scripts/scratchcard.min.js" />  

      <Header />
      <Sidebar />
      <Notification />
      <BackgroundGradient data={dataAll}/>
      <DeviceRotation />
      {/* <CookieConsent
        buttonText={pageProps.data?.menuData.cookieaccept}
        declineButtonText={pageProps.data?.menuData.cookierefuse}
        enableDeclineButton
        cookieName={"ContrechampsCHCookieConsent"}
        onAccept={() => {
          // gtag('consent', 'update', {
          //   'analytics_storage': 'granted'
          // });
        }}
        onDecline={() => {}}
        >
        <Body content={pageProps.data?.menuData.cookietext} />
      </CookieConsent> */}
        <AnimatePresence mode='wait'>   
          <motion.div key={router.asPath} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={desktopVariants}>             
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
    </StateProvider>
  )
}

export default MyApp
