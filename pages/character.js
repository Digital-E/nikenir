import styled from 'styled-components'

// Components
import Layout from '../components/layout'
import Character from '../components/slices/character'



const Container = styled.div``


export default function Home() {
  return (
    <Layout title={`Character`} content={`Character`}>
      <Container>
        <Character />
      </Container>
    </Layout>
  )
}
