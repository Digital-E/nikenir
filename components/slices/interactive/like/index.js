import { useEffect, useState, useRef, useContext } from 'react'
import { motion, useInView } from 'framer-motion'

import styled from 'styled-components'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import { store } from '../../../../store'

import Card from './card'

import InformationCard from '../../information-card'

import Hide from '../hide'

const Container = styled(motion.div)`

    &.clicked .text-two {
        opacity: 1 !important;
        transition: opacity var(--transition-in) 0s;
    }
`

const InnerContainer = styled.div`
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
    let [allItems, setAllItems] = useState(item.squares)
    let [selectedIndex, setSelectedIndex] = useState(0)

    let containerRef = useRef();

    let isInView = useInView(containerRef, {
        margin: "0px 0px -100px 0px",
        once: true
    })

    let hideWrapperRef = useRef();

    let killScroll = () => {
        scrollTo.kill()
        window.removeEventListener("wheel", killScroll)
        window.removeEventListener("touchmove", killScroll)
    }

    let triggerConfetti = (e, index) => {
        confetti({
            spread: 360,
            ticks: 500,
            gravity: 1,
            decay: 0.94,
            startVelocity: 30,
            count: 100,
            scalar: 3,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            shapes: ["image"],
            shapeOptions: {
              image: [{
                  src: `${process.env.basePath}/images/like/heart-fill-red.png`,
                  width: 32,
                  height: 32
                }
              ]
            },
          });     
    }

    useEffect(() => {
        // Preload confetti
        confetti({
            spread: 360,
            ticks: 500,
            gravity: 1,
            decay: 0.94,
            startVelocity: 30,
            count: 0,
            scalar: 3,
            origin: { x: 0, y: 0 },
            shapes: ["image"],
            shapeOptions: {
              image: [{
                  src: `${process.env.basePath}/images/like/heart-fill-red.png`,
                  width: 32,
                  height: 32
                }
              ]
            },
        });
    }, [])

    let hasClicked = (e, index) => {
        let items = JSON.parse(JSON.stringify(allItems))

        items.forEach(item => item.clicked = false)
        setAllItems(items)

        items[index].clicked = true
        setAllItems(items)

        setSelectedIndex(index)

        setHasInteracted(true)

        triggerConfetti(e, index);
        
        // Scroll To Bottom of Info Card

        setTimeout(() => {
            let informationContainerBottom = hideWrapperRef.current.getBoundingClientRect().bottom
            let informationMarginBottom = window.innerWidth > 989 ? 70 : 30
            scrollTo = gsap.to(window, {duration: 1, ease: "power2.inOut", scrollTo: `+=${informationContainerBottom - window.innerHeight + 20 - informationMarginBottom}`, onComplete: () => killScroll()})

            window.addEventListener("wheel", killScroll)
            window.addEventListener("touchmove", killScroll)
        }, 500)
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
                {
                    item.squares.map((item, index) => <Card data={item} index={index} allItems={allItems} hasClicked={(e, index) => hasClicked(e, index)} hasInteracted={hasInteracted} />)
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