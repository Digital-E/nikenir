import styled from 'styled-components'
import Meta from './meta'


const Container = styled.div``


export default function Layout({ preview, children, title, content, OGImage }) {


  return (
    <>
      <Meta title={title} content={content} OGImage={OGImage}/>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}
