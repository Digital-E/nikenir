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
    width: 100%;

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
    margin: 30px 0;
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

const HideWrapper = styled.div`
`
let scrollTo = null;

export default function Component({ item, data }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context; 

    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(item.squares)
    let [selectedIndex, setSelectedIndex] = useState(null)

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

    let triggerConfetti = (e) => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        });       
    }

    let hasClicked = (e, index) => {
        if(index === null) {
            let items = JSON.parse(JSON.stringify(allItems))

            items.forEach(item => item.clicked = false)

            setHasInteracted(false)

            return setAllItems(items)
        }

        setSelectedIndex(index)

        let items = JSON.parse(JSON.stringify(allItems))
        items[index].clicked = true
        setAllItems(items)

        setHasInteracted(true)

        // triggerConfetti(e);
    }

    useEffect(() => {
        if(hasInteracted) {
            dispatch({type: "update progress", value: state.progress += 1})
            
        // Scroll To Bottom of Info Card
        setTimeout(() => {
            let informationContainerBottom = hideWrapperRef.current.getBoundingClientRect().bottom
            let informationMarginBottom = window.innerWidth > 989 ? 70 : 30
            scrollTo = gsap.to(window, {duration: 1, ease: "power2.inOut", scrollTo: `+=${informationContainerBottom - window.innerHeight + 20 - informationMarginBottom}`, onComplete: () => killScroll()})
            window.addEventListener("wheel", killScroll)
            window.addEventListener("touchmove", killScroll)
        }, 500)   

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
                <span>Tap repeatedly to make your choice</span>
            </Text>
            <InnerContainer className='inner-container'>
                {
                    item.squares.map((item, index) => <Card data={item} index={index} allItems={allItems} hasClicked={(e, index) => hasClicked(e, index)} hasInteracted={hasInteracted} dataAll={data} selectedIndex={selectedIndex} />)
                }
            </InnerContainer>
            <TextTwo className='text-two mtb-2 palatino-x-small'>You picked</TextTwo>
            <HideWrapper ref={hideWrapperRef}>
                <Hide hasInteracted={hasInteracted}>
                    <InformationCard item={item} data={data} selectedIndex={selectedIndex !== null ? selectedIndex : 0} />
                </Hide>
            </HideWrapper>
        </Container>
    )
}