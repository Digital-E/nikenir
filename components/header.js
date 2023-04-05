import { useState, useRef, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { motion, useAnimationControls } from 'framer-motion'
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
    top: calc(50% + 2px);
    transform: translate(-50%, -50%);
  }

  > span:nth-child(2) {
    position: absolute;
    left: 50%;
    top: calc(50% + 2px);
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  > span {
    transition: filter 1s, opacity 0.5s;
    white-space: nowrap;
  }
`

const ScrollIndicatorWrapper = styled.div`
  display: flex;
  flex-basis: 25%;
`


const ScrollIndicator = styled(motion.div)`
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
    stroke: ${props => props.colour};
    transition: stroke 0.5s, stroke-dashoffset 0.3s ease-in-out, rotate 0.5s; 
    transform-origin: center center;
  }
`



let progressBar = null;
let totalLength = 0;
let hasLoaded = 0;

export default function Header({}) {
  // Context
  const context = useContext(store);
  const { state, dispatch } = context;

  const controls = useAnimationControls();

  let [colour, setColour] = useState('')
  let [messageOne, setMessageOne] = useState('')
  let [messageTwo, setMessageTwo] = useState('')

  let headerRef = useRef();
  let headerTextRef = useRef();
  let progressBarRef = useRef();
  let transitionCount = useRef(0);


  let setProgress = () => {

    let progress = state.progress / state.questionCount
    if(progress > 1) {
      progress = 1;

      progressBarRef.current.style.strokeDashoffset = totalLength - progress * totalLength

    } else {
      progressBarRef.current.style.strokeDashoffset = totalLength - progress * totalLength

      if(progress === 1) {
        setTimeout(() => {
          document.querySelector('.progress-bar').style.transition = 'stroke 0.5s, stroke-dashoffset 0.7s ease-in-out, transform 1s'
          
          progressBarRef.current.style.strokeDashoffset = totalLength
          
          document.querySelector('.progress-bar').style.transform = 'rotateZ(-360deg)'
    
          controls.start({ scale: 1.2 })
    
          setTimeout(() => {
              controls.start({ scale: 1 })
          }, 200)
    
          setTimeout(() => {
    
            progressBarRef.current.style.strokeDashoffset = 0
            
              setTimeout(() => {
                document.querySelector('.progress-bar').style.transition = 'stroke 0.5s, stroke-dashoffset 0.3s ease-in-out, transform 1s'
              }, 300)
          }, 700)
        }, 300)
      }
    }
  }

  useEffect(() => {
    progressBar = document.querySelector('.progress-bar');
    totalLength = progressBar.getTotalLength();

    progressBarRef.current.style.strokeDasharray = totalLength;
    progressBarRef.current.style.strokeDashoffset = totalLength;
    

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
      headerTextRef.current.children[0].style.opacity = 0
      setTimeout(() => {
        headerTextRef.current.children[1].style.opacity = 1
      }, 300)
    } else {
      setMessageOne(state.message)

      changeFontClass(headerTextRef.current.children[0], state.message)
      setTimeout(() => {
        headerTextRef.current.children[0].style.opacity = 1
      }, 300)
      headerTextRef.current.children[1].style.opacity = 0
    }

    setTimeout(() => {
      transitionCount.current += 1;
    }, 500)
    
  }, [state.message])

  useEffect(() => {
    setProgress()
  }, [state.progress])

  useEffect(() => {
    setColour(state.colour)
  }, [state.colour])



  return (
    <>
    <Container ref={headerRef} className='hide-header max-width-header hide-on-rotate'>
      <Link href={state.backLink}><Arrow><img aria-label="click link to move back" src={`${process.env.basePath}/images/icons/ui-arrow.svg`} /></Arrow></Link>
      <Text ref={headerTextRef}>
        <span>{messageOne}</span>
        <span>{messageTwo}</span>
      </Text>
      <ScrollIndicatorWrapper>
        <ScrollIndicator 
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          animate={controls}
        >
          <Circle colour={colour}>
            <svg aria-hidden='true' className="complete" width="40" height="40" viewport="0 0 20 20" xmlns="https://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="15"></circle>
              <circle className="progress-bar" cx="20" cy="20" r="15" ref={progressBarRef}></circle>
            </svg>      
          </Circle>
          <Logo><img aria-hidden='true' src={`${process.env.basePath}/images/logos/nike logo.svg`} /></Logo>
        </ScrollIndicator>
      </ScrollIndicatorWrapper>
    </Container>
    </>
  )
}
