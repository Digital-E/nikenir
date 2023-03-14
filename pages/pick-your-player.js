import { useEffect, useContext } from 'react'
import styled from 'styled-components'

import { store } from "../store"

// Components
import Footer from '../components/footer'
import Layout from '../components/layout'

import CharacterCarousel from '../components/slices/character-carousel'

const FooterWrapper = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;

    @media(max-width: 989px) {
      footer {
        display: none;
      }
    }
`

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    min-height: 100vh;

    @media(max-width: 989px) {
        margin-top: 65px;
    }
`

export default function Component() {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context; 

  useEffect(() => {
    if(window.innerWidth < 990) {
      dispatch({type: "update message", value: 'Swipe to Pick Your Player'})
    } else {
      dispatch({type: "update message", value: 'Pick Your Player'})
    }
    dispatch({type: "update colour", value: 'transparent'})
    dispatch({type: "update progress", value: 0})
    dispatch({type: "update back link", value: '/'})
    dispatch({type: "update gradient index", value: 0})

    window.scrollTo(0, 0)
    document.querySelector('body').classList.add('lock-scroll')

    setTimeout(() => {
      document.querySelector('header').classList.remove('hide-header')

      document.querySelector('.sidebar').classList.remove('hide-sidebar')

    }, 250)

    return () => {
      document.querySelector('body').classList.remove('lock-scroll')
    }
  }, [])

  return (
    <Layout title={`Pick Your Player | Nike Impact Report`} content={`Pick Your Player | Nike Impact Report`}>
      <Container>
        <CharacterCarousel />
        {/* <FooterWrapper>
            <Footer />
        </FooterWrapper> */}
      </Container>
    </Layout>
  )
}
