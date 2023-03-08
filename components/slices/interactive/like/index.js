import { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import { store } from '../../../../store'

import Card from './card'

import InformationCard from '../../information-card'

import Hide from '../hide'

const Container = styled.div`

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

const HideWrapper = styled.div``



export default function Component({ item, data }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context; 

    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(item.squares)
    let [selectedIndex, setSelectedIndex] = useState(0)

    let hideWrapperRef = useRef();

    let triggerConfetti = (e) => {
        // confetti({
        //     particleCount: 100,
        //     spread: 70,
        //     origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        // });
        confetti({
            spread: 360,
            ticks: 200,
            gravity: 1,
            decay: 0.94,
            startVelocity: 30,
            count: 100,
            scalar: 3,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            shapes: ["image"],
            shapeOptions: {
              image: [{
                  src: "/images/like/heart.png",
                  width: 32,
                  height: 32
                }
              ]
            },
          });        
    }

    let hasClicked = (e, index) => {
        let items = JSON.parse(JSON.stringify(allItems))

        items.forEach(item => item.clicked = false)
        setAllItems(items)

        items[index].clicked = true
        setAllItems(items)

        setSelectedIndex(index)

        setHasInteracted(true)

        triggerConfetti(e);
        
        // Scroll To Bottom of Info Card

        setTimeout(() => {
            let informationContainerBottom = hideWrapperRef.current.getBoundingClientRect().bottom
            gsap.to(window, {duration: 1, ease: "power2.inOut", scrollTo: `+=${informationContainerBottom - window.innerHeight + 20 - 70}`})
        }, 400)
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
                <span>Answer with a like</span>
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