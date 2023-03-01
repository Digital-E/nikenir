import styled from 'styled-components'

// Components
import Notification from '../components/notification'
import Layout from '../components/layout'

// Interactive
import CrossCards from '../components/slices/interactive/cross-cards'
import TapSpam from '../components/slices/interactive/tap-spam'
import TapSpamTwo from '../components/slices/interactive/tap-spam-two'
import TapSpamThree from '../components/slices/interactive/tap-spam-three'
import Drag from '../components/slices/interactive/drag'
import Like from '../components/slices/interactive/like'


// Components
import PraiseTickers from '../components/slices/praise-tickers'
import CharacterCarousel from '../components/slices/character-carousel'

const Container = styled.div``


export default function Home() {
  return (
    <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
      <Container>
      {/* <CrossCards /> */}
      <CharacterCarousel />
      {/* <TapSpam /> */}
      {/* <TapSpamTwo /> */}
      <TapSpamThree />
      <Drag />
      <Like />
      <PraiseTickers />
      {/* <Notification /> */}
      </Container>
    </Layout>
  )
}
