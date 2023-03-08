import { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import { motion, useAnimationControls } from 'framer-motion'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import { store } from '../../../../store'

import Card from './card'

import InformationCard from '../../information-card'

import Hide from '../hide'

const Container = styled.div`
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
    width: 250px;
    margin: 0 auto;
    cursor: pointer;
    touch-action: none;
    z-index: 2;

    img {
      cursor: pointer;
      width: 100%;
    }

    &.dragging {
      pointer-events: none;
    }
`

const HideWrapper = styled.div``


export default function Component({ item, data }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context; 

    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(item.squares)
    let [dragActive, setDragActive] = useState(true)
    let [isDragging, setIsDragging] = useState(false)
    let mouseOverIndex = useRef(null);

    let hideWrapperRef = useRef();

    const controls = useAnimationControls();

    let dragElementRef = useRef();

    useEffect(() => {
      controls.start({ x: '-50%', y: '-50%'})
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

      controls.start({ scale: 2 })
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
      hasClicked(null, 0)
      controls.start({ x: '-85%', y: '-50%'})

        // Scroll To Bottom of Info Card
        setTimeout(() => {
            let informationContainerBottom = hideWrapperRef.current.getBoundingClientRect().bottom
            gsap.to(window, {duration: 1, ease: "power2.inOut", scrollTo: `+=${informationContainerBottom - window.innerHeight + 20 - 70}`})
        }, 400)
        
    } else if (mouseOverIndex.current === 1) {
      hasClicked(null, 1)
      controls.start({ x: '-5%', y: '-50%'})

        // Scroll To Bottom of Info Card
        setTimeout(() => {
            let informationContainerBottom = hideWrapperRef.current.getBoundingClientRect().bottom
            gsap.to(window, {duration: 1, ease: "power2.inOut", scrollTo: `+=${informationContainerBottom - window.innerHeight + 20 - 70}`})
        }, 400)

    } else if(mouseOverIndex.current === null) {
      controls.start({ x: '-50%', y: '-50%'})
        setHasInteracted(false)
    }
  }

  let toggleMouseOver = (index) => {
    setTimeout(() => {
      mouseOverIndex.current = index
    }, 30)
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
        <Container className={hasInteracted ? 'clicked mtb-2 max-width-2' : 'mtb-2 max-width-2'}>
            <Text className='text-one mtb-2 palatino-x-small'>
                <span>{item.title}</span>
            </Text>
            <InnerContainer className='inner-container'>
                <DragElement
                  ref={dragElementRef}
                  onClick={(e) => {clicked(e)}}
                  onPointerDown={(e) => e.target.releasePointerCapture(e.pointerId)}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  whileHover={{scale: 1.1 }}
                  whileTap={{ scale: 2 }}
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
                  <img src='/images/drag/air-jordan-1-low-se-older-shoes-f9r9bX 1.png' />
                </DragElement>
                {
                    item.squares.map((item, index) => 
                    <Card 
                      data={item} 
                      index={index} 
                      allItems={allItems} 
                      hasClicked={(e, index) => hasClicked(e, index)} 
                      hasInteracted={hasInteracted} 
                      isDragging={isDragging}
                      mouseOver={(index) => toggleMouseOver(index)}
                      />)
                }
            </InnerContainer>
            <TextTwo className='text-two mtb-2 palatino-x-small'>You picked</TextTwo>
            <HideWrapper ref={hideWrapperRef}>
                <Hide hasInteracted={hasInteracted}>
                    <InformationCard item={item} data={data} selectedIndex={mouseOverIndex.current !== null ? mouseOverIndex.current : 0} />
                </Hide>
            </HideWrapper>
        </Container>
    )
}