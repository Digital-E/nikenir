import styled from "styled-components"

let Container = styled.footer`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`

const Logo = styled.div`
  position: relative;
  cursor: none;
  pointer-events: none;
  user-select: none;

  div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }

  > img:nth-child(1) {
    opacity: 0;
  }


  @keyframes hide-one {
    0%, 24.9% { visibility: visible }
    25%, 50%, 100% { visibility: hidden }
  }

  @keyframes hide-two {
    0%, 24.9% { visibility: hidden }
    25%, 49% { visibility: visible }
    50%, 100% { visibility: hidden }
  }

  @keyframes hide-three {
    0%, 49.9% { visibility: hidden }
    50%, 74% { visibility: visible }
    75%, 100% { visibility: hidden }
  }

  @keyframes hide-four {
    0%, 74.9% { visibility: hidden }
    75%, 99% { visibility: visible }
    100% { visibility: hidden }
  }

  .logo-roll-1 {
      animation: hide-one 4s normal infinite;
  }

  .logo-roll-2 {
    animation: hide-two 4s normal infinite;
  }

  .logo-roll-3 {
    animation: hide-three 4s normal infinite;
  }

  .logo-roll-4 {
    animation: hide-four 4s normal infinite;
  }

  @media(min-width: 990px) {
    margin-left: -10px;
  }
  
`

const Row = styled.div`
  display: flex;
  margin-top: 40px;
  height: 100%;

  @media(max-width: 989px) {
    flex-direction: column;
    margin-top: 60px;
  }
`

const ColLeft = styled.div`
  flex-basis: 50%;

  @media(max-width: 989px) {
    flex-basis: auto;
  }
`

const ColRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;

  .medium-text {
    margin-bottom: 10px;
  }

  @media(max-width: 989px) {
    flex-basis: auto;
    margin-top: 50px;
  }
`

const Credits = styled.div`
  margin-top: auto;

  a {
    width: fit-content;
  }

  * {
    margin: 0;
  }

  p a:first-child {
    text-decoration: underline
  }

  @media(max-width: 989px) {
    margin: 60px 0 120px 0;
  }
`
const Links = styled.div`
  display: flex;
  flex-direction: column;

  a {
    width: fit-content;
  }

  * {
    margin: 0 0 10px 0;
  }
`



export default function Footer({ data, dataBis }) {

  return (
    <Container className="padding"> 
    </Container>
  )
}
