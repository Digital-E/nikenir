import '../styles/normalize.css';
import '../styles/globals.css'
import '../styles/flickity.css'

import { useEffect } from 'react'
import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion"

import { StateProvider } from "../store"

// import CookieConsent from "react-cookie-consent"

import Header from '../components/header'
import Footer from '../components/footer'

import BackgroundGradientCode from '../components/background-gradient-code'

import { credits } from "../lib/credits"

const GradientWrapper = styled.div`
  > div {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
`


let colors = [
  [
    '#95FF61',
    '#00FC00',
    '#C2BCEB',
    '#8679e4'
  ],
  [
    '#95FF61',
    '#00FC00',
    '#A2D8EF',
    '#A2D8EF'
  ],
  [
    '#95FF61',
    '#00FC00',
    '#FFB800',
    '#FFB800'
  ]
]


let dataOne = [
  {color: colors[0][0], rotate: -50},
  {color: colors[0][1], rotate: 20},
  {color: colors[0][2], rotate: -70},
  {color: colors[0][3], rotate: -30},
  {color: colors[0][0], rotate: -50},
  {color: colors[0][1], rotate: -20},
  {color: colors[0][3], rotate: -70},
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
  

  return (
    <StateProvider>
      <Header />
      <GradientWrapper>
        <BackgroundGradientCode data={dataOne} />
      </GradientWrapper>
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
      {/* <Footer data={pageProps.data?.footerData}/> */}
    </StateProvider>
  )
}

export default MyApp
