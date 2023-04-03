import { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import { motion, useAnimationControls, useInView } from 'framer-motion'

import { useMediaQuery } from 'react-responsive'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import { store } from '../../../../store'

import Card from './card'

import InformationCard from '../../information-card'

import Hide from '../hide'

const Container = styled(motion.div)`
    position: relative;

    &.clicked .text-two {
        opacity: 1 !important;
        transition: opacity var(--transition-in) 0s;
    }

`

const InnerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`

const Text = styled.div`
    position: relative;
    text-align: center;
`

const TextTwo = styled.div`
    text-align: center;
    opacity: 0;
    transition: opacity var(--transition-in);
`

const DragElement = styled(motion.div)`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    margin: 0 auto;
    cursor: pointer;
    touch-action: none;
    z-index: 2;

    img {
      cursor: pointer;
      pointer-events: none;
      width: 100%;
    }

    &.dragging {
      pointer-events: none;
    }

    @media(max-width: 989px) {
        width: 150px;
    }
`

let variants = {
    'show': {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: 0.1
        }
    },
    'hide': {
        opacity: 0,
        y: 0
    }
}

const HideWrapper = styled.div``

let scrollTo = null;

export default function Component({ item, data }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context; 

    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState([])
    let [dragActive, setDragActive] = useState(true)
    let [isDragging, setIsDragging] = useState(false)
    let mouseOverIndex = useRef(0);
    let [selectedIndex, setSelectedIndex] = useState(0)

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    })

    let containerRef = useRef();

    let isInView = useInView(containerRef, {
        margin: "0px 0px -100px 0px",
        once: true
    })    

    let hideWrapperRef = useRef();

    const controls = useAnimationControls();

    let dragElementRef = useRef();

    let killScroll = () => {
      scrollTo.kill()
      window.removeEventListener("wheel", killScroll)
      window.removeEventListener("touchmove", killScroll)
    }

    useEffect(() => {
      setAllItems(item.squares)
      controls.start({ x: '-45%', y: '-50%'})

      gsap.fromTo(dragElementRef.current.children[0],{y: 0}, {y: -5 , duration: 0.5, yoyo: true, ease: "power1.inOut", repeat: -1});

      dragElementRef.current.removeAttribute('tabindex')
    }, [])

    useEffect(() => {
        let hasInteractedCount = 0

        allItems.forEach(item => {
            if(item.clicked === true) {
                hasInteractedCount += 1;
            }
        })

        if(hasInteractedCount === 0) {
            setHasInteracted(false)
        } else {
            setHasInteracted(true)
        }
    }, [allItems])

    let hasClicked = (e, index) => {
        let items = JSON.parse(JSON.stringify(allItems))

        items[index].clicked = true
        setAllItems(items)
    }

    let clicked = (e) => {

      controls.start({ scale: 1.5 })

      setTimeout(() => {
          controls.start({ scale: 1.1 })
      }, 50)
  }
    
  let onDragStart = () => {
    dragElementRef.current.classList.add("dragging")
    setIsDragging(true)
  }

  let onDragEnd = () => {
    dragElementRef.current.classList.remove("dragging")
    setIsDragging(false)


    if(mouseOverIndex.current === 0) {
      setSelectedIndex(0)

      hasClicked(null, 0)
      controls.start({ x: isDesktop ? '-105%' : '-110%', y: '-50%'})

        // Scroll To Bottom of Info Card
        setTimeout(() => {
            let informationContainerBottom = hideWrapperRef.current.getBoundingClientRect().bottom
            let informationMarginBottom = window.innerWidth > 989 ? 70 : 30
            scrollTo = gsap.to(window, {duration: 1, ease: "power2.inOut", scrollTo: `+=${informationContainerBottom - window.innerHeight + 20 - informationMarginBottom}`, onComplete: () => killScroll()})
            window.addEventListener("wheel", killScroll)
            window.addEventListener("touchmove", killScroll)
        }, 500)
        
    } else if (mouseOverIndex.current === 1) {
      setSelectedIndex(1)

      hasClicked(null, 1)
      controls.start({ x: isDesktop ? '5%' : '10%', y: '-50%'})

        // Scroll To Bottom of Info Card
        setTimeout(() => {
            let informationContainerBottom = hideWrapperRef.current.getBoundingClientRect().bottom
            let informationMarginBottom = window.innerHeight > 989 ? 70 : 30
            scrollTo = gsap.to(window, {duration: 1, ease: "power2.inOut", scrollTo: `+=${informationContainerBottom - window.innerHeight + 20 - informationMarginBottom}`, onComplete: () => killScroll()})
            window.addEventListener("wheel", killScroll)
            window.addEventListener("touchmove", killScroll)
        }, 400)

    } else if(mouseOverIndex.current === null) {
      controls.start({ x: '-45%', y: '-50%'})
        setHasInteracted(false)
    }
  }

  let toggleMouseOver = (index) => {
    setTimeout(() => {
      mouseOverIndex.current = index
    }, 30)
  }

  let mouseOverForce = (index) => {
    mouseOverIndex.current = index
    onDragEnd()
  }

  useEffect(() => {
      if(hasInteracted) {
          dispatch({type: "update progress", value: state.progress += 1})
      } else {
          if(state.progress !== 0) {
              dispatch({type: "update progress", value: state.progress -= 1})
          }
      }
  }, [hasInteracted]) 

    return (
        <Container 
          variants={variants} 
          initial='hide' 
          animate={isInView ? 'show' : 'hide'} 
          ref={containerRef}         
          className={hasInteracted ? 'clicked mtb-2 max-width-2' : 'mtb-2 max-width-2'}
        >
            <Text className='text-one mtb-2 palatino-x-small'>
                <span>{item.title}</span>
            </Text>
            <InnerContainer className='inner-container'>
                <DragElement
                  aria-hidden='true'
                  ref={dragElementRef}
                  onClick={(e) => {clicked(e)}}
                  onPointerDown={(e) => e.target.releasePointerCapture(e.pointerId)}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  whileHover={{scale: 1.1 }}
                  whileTap={{ scale: 1.5 }}
                  animate={controls}
                  onDragStart={() => onDragStart()}
                  onDragEnd={() => onDragEnd()}
                  drag={dragActive}
                  // dragConstraints={{
                  //   top: -50,
                  //   left: -150,
                  //   right: 150,
                  //   bottom: 210,
                  // }}
                  dragSnapToOrigin={true}
                  dragMomentum={false}
                >
                  <img src={item.img} />
                </DragElement>
                {
                    allItems.map((item, index) => 
                    <Card 
                      data={item} 
                      index={index} 
                      allItems={allItems} 
                      // hasClicked={(e, index) => hasClicked(e, index)} 
                      hasInteracted={hasInteracted} 
                      isDragging={isDragging}
                      mouseOver={(index) => toggleMouseOver(index)}
                      mouseOverForce={(index) => mouseOverForce(index)}
                      />)
                }
            </InnerContainer>
            <TextTwo className='text-two mtb-2 palatino-x-small'>You picked</TextTwo>
            <HideWrapper ref={hideWrapperRef}>
                <Hide hasInteracted={hasInteracted}>
                    <InformationCard item={item} data={data} selectedIndex={selectedIndex} />
                </Hide>
            </HideWrapper>
        </Container>
    )
}