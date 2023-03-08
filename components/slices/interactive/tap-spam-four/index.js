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

const HideWrapper = styled.div`
    padding-bottom: 70px;
`

export default function Component({ item, data }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context; 

    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(item.squares)
    let [selectedIndex, setSelectedIndex] = useState(0)

    let hideWrapperRef = useRef();

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
            gsap.to(window, {duration: 1, ease: "power2.inOut", scrollTo: `+=${informationContainerBottom - window.innerHeight + 20 - 70}`})
        }, 400)   

        } else {
            if(state.progress !== 0) {
                dispatch({type: "update progress", value: state.progress -= 1})
            }
        }
    }, [hasInteracted])
    

    return (
        <Container className={hasInteracted ? 'clicked mtb-2 max-width-2' : 'mtb-2 max-width-2'}>
            <Text className='text-one mtb-2 palatino-x-small'>
                <span>Tap spam to make your choice</span>
            </Text>
            <InnerContainer className='inner-container'>
                {
                    item.squares.map((item, index) => <Card data={item} index={index} allItems={allItems} hasClicked={(e, index) => hasClicked(e, index)} hasInteracted={hasInteracted} dataAll={data} />)
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