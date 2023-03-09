import styled from 'styled-components'
import Meta from './meta'


const Container = styled.div``


export default function Layout({ preview, children, title, content }) {


  return (
    <>
      <Meta title={title} content={content}/>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}
