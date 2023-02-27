import styled from 'styled-components'

// Components
import Notification from '../components/notification'
import Layout from '../components/layout'

// Interactive
import CrossCards from '../components/interactive/cross-cards'

const Container = styled.div`
  height: 200vh;
`



export default function Home() {
  return (
    <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
      <Container>
      <CrossCards />
      {/* <Notification /> */}
      </Container>
    </Layout>
  )
}
