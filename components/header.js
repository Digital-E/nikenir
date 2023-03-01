import { useState, useRef, useEffect } from "react"
import styled from "styled-components"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"


let Container = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 30px);
  max-width: 360px;
  height: 60px;
  padding: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  z-index: 998;
`

const Arrow = styled.div`
  display: flex;
  flex-basis: 25%;

  img {
    cursor: pointer;
  }
`

const Text = styled.div`
  flex-basis: 50%;
  text-align: center;
  margin-top: 2px;
`

const ScrollIndicatorWrapper = styled.div`
  display: flex;
  flex-basis: 25%;
`


const ScrollIndicator = styled.div`
  position: relative;
  margin-left: auto;
`

const Logo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
const Circle = styled.div`
  display: flex;

  svg {
    position: sticky;
    transform: rotate(-90deg);
  }

  svg circle {
    stroke: rgba(0,0,0,0.1);
    stroke-width: 3.5px;
    stroke-linecap: round;
    fill: transparent;
  }

  svg .progress-bar {
    stroke: url(#grad);
    transition: stroke-dashoffset 0 ease-in-out; 
    // filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
  }
`



let progressBar = null;
let totalLength = 0;

export default function Header({}) {

  let headerRef = useRef();
  let progressBarRef = useRef();
  const { scrollYProgress } = useScroll()

  let setProgress = (latest) => {
    progressBarRef.current.style.strokeDashoffset = totalLength - latest * totalLength;
  }

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest)
  })

  useEffect(() => {
    progressBar = document.querySelector('.progress-bar');
    totalLength = progressBar.getTotalLength();

    progressBarRef.current.style.strokeDasharray = totalLength;
    progressBarRef.current.style.strokeDashoffset = totalLength;

    setProgress(scrollYProgress.prev)
  }, []);

  return (
    <>
    <Container ref={headerRef}>
      <Arrow><img src='/images/icons/ui-arrow.svg' /></Arrow>
      <Text>
        <span className='futura'>Planet Protector</span>
      </Text>
      <ScrollIndicatorWrapper>
        <ScrollIndicator>
          <Circle>
            <svg class="complete" width="40" height="40" viewport="0 0 20 20" xmlns="https://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad">
                <stop offset="0%" stop-color="#fbc2eb"></stop>
                <stop offset="100%" stop-color="#a6c1ee"></stop>
              </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="15"></circle>
              <circle class="progress-bar" cx="20" cy="20" r="15" ref={progressBarRef}></circle>
            </svg>      
          </Circle>
          <Logo><img src='/images/nike logo.svg' /></Logo>
        </ScrollIndicator>
      </ScrollIndicatorWrapper>
    </Container>
    </>
  )
}
