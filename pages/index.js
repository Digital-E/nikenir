import { useEffect, useContext } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { store } from '../store'

// Components
import Layout from '../components/layout'
import Intro from '../components/intro'

// Images
import characterOne1 from '../public/images/avatars/carousel/ines/ines-0.png'
import characterOne2 from '../public/images/avatars/carousel/ines/ines-1.png'
import characterOne3 from '../public/images/avatars/carousel/ines/ines-2.png'
import characterOne4 from '../public/images/avatars/carousel/ines/ines-3.png'
import characterOne5 from '../public/images/avatars/carousel/ines/ines-4.png'
import characterOne6 from '../public/images/avatars/carousel/ines/ines-5.png'

import characterTwo1 from '../public/images/avatars/carousel/theo/theo-0.png'
import characterTwo2 from '../public/images/avatars/carousel/theo/theo-1.png'
import characterTwo3 from '../public/images/avatars/carousel/theo/theo-2.png'
import characterTwo4 from '../public/images/avatars/carousel/theo/theo-3.png'
import characterTwo5 from '../public/images/avatars/carousel/theo/theo-4.png'
import characterTwo6 from '../public/images/avatars/carousel/theo/theo-5.png'


import characterThree1 from '../public/images/avatars/carousel/ivy/ivy-0.png'
import characterThree2 from '../public/images/avatars/carousel/ivy/ivy-1.png'
import characterThree3 from '../public/images/avatars/carousel/ivy/ivy-2.png'
import characterThree4 from '../public/images/avatars/carousel/ivy/ivy-3.png'
import characterThree5 from '../public/images/avatars/carousel/ivy/ivy-4.png'
import characterThree6 from '../public/images/avatars/carousel/ivy/ivy-5.png'

import gradientOne from '../public/images/carousel-gradients/gradient1.png'
import gradientTwo from '../public/images/carousel-gradients/gradient3.png'
import gradientThree from '../public/images/carousel-gradients/gradient2.png'

let preloadAssets = [
  characterOne1,
  characterOne2,
  characterOne3,
  characterOne4,
  characterOne5,
  characterOne6,
  characterTwo1,
  characterTwo2,
  characterTwo3,
  characterTwo4,
  characterTwo5,
  characterTwo6,
  characterThree1,
  characterThree2,
  characterThree3,
  characterThree4,
  characterThree5,
  characterThree6,
  gradientOne,
  gradientTwo,
  gradientThree
]


const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`



export default function Home() {
  // Context

  const context = useContext(store);
  const { state, dispatch } = context; 

  useEffect(() => {
    dispatch({type: "update colour", value: 'transparent'})
    dispatch({type: "update progress", value: 0})

    document.querySelector('header').classList.add('hide-header')

    document.querySelector('.sidebar').classList.add('hide-sidebar')
  }, [])

  return (
    // <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
    <Layout title={`Nike Impact Game - Your Move`} content={`Alongside the publishing of Nike’s 2022 Impact Report, this is a digital experience that invites youth to engage and imagine a path to a fairer, greener, and healthier future while learning more about how we are creating bigger change.`}>
      <Head>
        {
          preloadAssets.map(item => (
            <link
              rel="preload"
              href={item.src}
              as="image"
            />
          ))
        }
      </Head>      
      <Container>
        <Intro />
      </Container>
    </Layout>
  )
}
