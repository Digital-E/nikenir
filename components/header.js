import { useState, useRef, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Link  from './link'

import { store } from '../store'


let Container = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 30px);
  height: 60px;
  padding: 15px;
  overflow: hidden;
  background: var(--background);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: var(--backdrop-filter-blur);
  border-radius: var(--border-radius);
  z-index: 998;

  transition: transform var(--transition-in);

  &.hide-header {
    transform: translateX(-50%) translateY(-150%);
  }
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

  > span:nth-child(1) {
    position: absolute;
    left: 50%;
    top: calc(50% + 3px);
    transform: translate(-50%, -50%);
  }

  > span:nth-child(2) {
    position: absolute;
    left: 50%;
    top: 150%;
    transform: translate(-50%, -50%);
  }

  > span {
    transition: top 1s;
    white-space: nowrap;
  }
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
  left: calc(50% + 1px);
  top: calc(50% - 1px);
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
    // stroke: url(#grad);
    stroke: ${props => props.colour};
    transition: stroke 0.5s, stroke-dashoffset 0.3s ease-in-out; 
    // filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
  }
`



let progressBar = null;
let totalLength = 0;
let hasLoaded = 0;

export default function Header({}) {
  // Context
  const context = useContext(store);
  const { state, dispatch } = context;

  let router = useRouter();

  let [colour, setColour] = useState('')
  let [messageOne, setMessageOne] = useState('')
  let [messageTwo, setMessageTwo] = useState('')

  let headerRef = useRef();
  let headerTextRef = useRef();
  let progressBarRef = useRef();
  let transitionCount = useRef(0);
  // const { scrollYProgress } = useScroll()

  let setProgress = (latest) => {
    // progressBarRef.current.style.strokeDashoffset = totalLength - latest * totalLength;
    let progress = state.progress / state.questionCount
    if(progress > 1) {
      progress = 1;
      progressBarRef.current.style.strokeDashoffset = totalLength - progress * totalLength
    } else {
      progressBarRef.current.style.strokeDashoffset = totalLength - progress * totalLength
    }
  }

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   setProgress(latest)
  // })

  useEffect(() => {
    progressBar = document.querySelector('.progress-bar');
    totalLength = progressBar.getTotalLength();

    progressBarRef.current.style.strokeDasharray = totalLength;
    progressBarRef.current.style.strokeDashoffset = totalLength;

    // setProgress(scrollYProgress.prev)
  }, []);

  let changeFontClass = (el, message) => {
    if(message === 'Pick Your Player' || message === 'Swipe to Pick Your Player') {
      el.classList.remove('futura')
      el.classList.add('palatino-x-small')
    } else {
      el.classList.add('futura')
      el.classList.remove('palatino-x-small')
    }
  }

  useEffect(() => {
    if(hasLoaded < 2) {
      hasLoaded += 1
      changeFontClass(headerTextRef.current.children[0], state.message)
      return setMessageOne(state.message)
    }

    if(transitionCount.current % 2 === 0) {
      setMessageTwo(state.message)
    
      changeFontClass(headerTextRef.current.children[1], state.message)
      headerTextRef.current.children[0].style.top = '-100%'
      headerTextRef.current.children[1].style.top = 'calc(50% + 3px)'
    } else {
      setMessageOne(state.message)

      changeFontClass(headerTextRef.current.children[0], state.message)
      headerTextRef.current.children[0].style.top = 'calc(50% + 3px)'
      headerTextRef.current.children[1].style.top = '-100%'
    }

    setTimeout(() => {
      if(transitionCount.current % 2 === 0) {
        headerTextRef.current.children[0].style.transition = 'top 0s'
        headerTextRef.current.children[0].style.top = '150%'
        setTimeout(() => {
          headerTextRef.current.children[0].style.transition = 'top 1s'
        }, 500)
      } else {
        headerTextRef.current.children[1].style.transition = 'top 0s'
        headerTextRef.current.children[1].style.top = '150%'
        setTimeout(() => {
          headerTextRef.current.children[1].style.transition = 'top 1s'
        }, 500)
      }
      transitionCount.current += 1;
    }, 500)
    
  }, [state.message])

  useEffect(() => {
    setProgress()
  }, [state.progress])

  useEffect(() => {
    setColour(state.colour)
  }, [state.colour])

  // useEffect(() => {
  //   setBackLink(state.backLink)
  // }, [state.backLink])


  return (
    <>
    <Container ref={headerRef} className='hide-header max-width'>
      <Link href={state.backLink}><Arrow><img src='/images/icons/ui-arrow.svg' /></Arrow></Link>
      <Text ref={headerTextRef}>
        <span>{messageOne}</span>
        <span>{messageTwo}</span>
      </Text>
      <ScrollIndicatorWrapper>
        <ScrollIndicator>
          <Circle colour={colour}>
            <svg class="complete" width="40" height="40" viewport="0 0 20 20" xmlns="https://www.w3.org/2000/svg">
              {/* <defs>
                <linearGradient id="grad">
                <stop offset="0%" stop-color="#fbc2eb"></stop>
                <stop offset="100%" stop-color="#a6c1ee"></stop>
              </linearGradient>
              </defs> */}
              <circle cx="20" cy="20" r="15"></circle>
              <circle class="progress-bar" cx="20" cy="20" r="15" ref={progressBarRef}></circle>
            </svg>      
          </Circle>
          <Logo><img src='/images/logos/nike logo.svg' /></Logo>
        </ScrollIndicator>
      </ScrollIndicatorWrapper>
    </Container>
    </>
  )
}
