import styled from 'styled-components'

// Components
import Layout from '../components/layout'
import BackgroundGradientVideo from '../components/background-gradient-video'
import BackgroundGradientCode from '../components/background-gradient-code'



const Container = styled.div`
    position: absolute;
    height: 200vh;
    width: 100vw;
`



export default function Home() {
  return (
    <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
      <Container>
        <BackgroundGradientCode />
        <BackgroundGradientVideo />
      </Container>
    </Layout>
  )
}
