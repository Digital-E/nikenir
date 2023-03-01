import styled from 'styled-components'

// Components
import Notification from '../components/notification'
import Layout from '../components/layout'

// Interactive
import CrossCards from '../components/slices/interactive/cross-cards'
import TapSpam from '../components/slices/interactive/tap-spam'
import Drag from '../components/slices/interactive/drag'
import Like from '../components/slices/interactive/like'


// Slices
import PraiseTickers from '../components/slices/praise-tickers'

const Container = styled.div`
  height: 200vh;
`



export default function Home() {
  return (
    <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
      <Container>
      {/* <CrossCards /> */}
      <TapSpam />
      <Drag />
      <Like />
      <PraiseTickers />
      {/* <Notification /> */}
      </Container>
    </Layout>
  )
}
