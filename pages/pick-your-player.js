import { useEffect } from 'react'
import styled from 'styled-components'

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



export default function Home() {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('header').classList.remove('hide-header')

      document.querySelector('.hide-sidebar').classList.remove('hide-sidebar')
    }, 250)
  }, [])

  return (
    <Layout title={`Nike Impact Report | Pick Your Player`} content={`Nike Impact Report | Pick Your Player`}>
      <Container>
        <CharacterCarousel />
      </Container>
    </Layout>
  )
}
