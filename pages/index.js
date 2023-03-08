import { useEffect, useContext } from 'react'
import styled from 'styled-components'

import { store } from '../store'

// Components
import Layout from '../components/layout'
import Intro from '../components/intro'



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
      <Container>
        <Intro />
      </Container>
    </Layout>
  )
}
