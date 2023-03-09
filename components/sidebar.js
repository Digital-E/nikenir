import { useState, useRef, useEffect } from "react"
import styled from "styled-components"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"

import Share from './share'


let Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  bottom: 50px;
  left: 20px;
  z-index: 998;

  transition: transform var(--transition-in) 1s;

  &.hide-sidebar {
    transform: translateX(-150%);
  }

  @media(max-width: 989px) {
    display: none;
  }
`
const Logo = styled.div`
  margin-bottom: 5px;

  img {

  }
`



export default function Header({}) {


  return (
    <>
    <Container className='sidebar hide-sidebar'>
      <Logo><img src='/images/logos/nikeimpact-side.svg'/></Logo>
      <Share />
    </Container>
    </>
  )
}
