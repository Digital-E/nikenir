import { useEffect, useContext } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { store } from '../store'

// Components
import Layout from '../components/layout'
import Intro from '../components/intro'

// Images
import characterOne from '../public/images/avatars/carousel/ines.png'
import characterTwo from '../public/images/avatars/carousel/theo.png'
import characterThree from '../public/images/avatars/carousel/ivy.png'

import gradientOne from '../public/images/carousel-gradients/gradient1.png'
import gradientTwo from '../public/images/carousel-gradients/gradient3.png'
import gradientThree from '../public/images/carousel-gradients/gradient2.png'

let preloadAssets = [
  characterOne,
  characterTwo,
  characterThree,
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
    <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
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
