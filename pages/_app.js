import '../styles/normalize.css'
import '../styles/globals.css'
import '../styles/flickity.css'
import '../styles/flickity-fade.css'

import { useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from "framer-motion"


import { StateProvider } from "../store"

// import CookieConsent from "react-cookie-consent"

import Header from '../components/header'

import Sidebar from '../components/sidebar'

import BackgroundGradientCode from '../components/background-gradient-code-canvas'

import { credits } from "../lib/credits"


const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/gradients/PLANET_GRAIDENT_02 2.png');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
`



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
    '#A2D8EF',
    '#A2D8EF'
  ],
  [
    '#00FC00',
    '#C2BCEB',
    '#C2BCEB',
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
  

  return (
    <StateProvider>
      <Header />
      <Sidebar />
      {/* <Background /> */}
      <BackgroundGradientCode data={dataAll}/>
      {/* <GradientWrapper>
        <BackgroundGradientCode data={dataThree} />
      </GradientWrapper> */}
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
