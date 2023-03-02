import styled from 'styled-components'

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
  return (
    <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
      <Container>
        <Intro />
      </Container>
    </Layout>
  )
}
