import { useEffect, useContext } from 'react'
import styled from 'styled-components'

import { store } from "../store"

// Components
import Layout from '../components/layout'

import CharacterCarousel from '../components/slices/character-carousel'



const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    margin-top: 130px;
    overflow: hidden;

    @media(max-width: 989px) {
        margin-top: 65px;
    }
`

export default function Component() {
    // Context

    const context = useContext(store);
    const { state, dispatch } = context; 

  useEffect(() => {
    dispatch({type: "update message", value: 'Pick your player'})
    dispatch({type: "update colour", value: 'transparent'})
    dispatch({type: "update progress", value: 0})

    setTimeout(() => {
      document.querySelector('header').classList.remove('hide-header')

      document.querySelector('.sidebar').classList.remove('hide-sidebar')
    }, 250)
  }, [])

  return (
    <Layout title={`Pick Your Player | Nike Impact Report`} content={`Pick Your Player | Nike Impact Report`}>
      <Container>
        <CharacterCarousel />
      </Container>
    </Layout>
  )
}
