import styled from 'styled-components'

// Components
import Notification from '../components/notification'
import Layout from '../components/layout'

const Container = styled.div`
  background: red;
`


export default function Home() {
  return (
    <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
      <Container>
        Nike
      </Container>
      {/* <Notification /> */}
    </Layout>
  )
}
