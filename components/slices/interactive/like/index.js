import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Card from './card'

import InformationCard from '../../information-card'

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
    margin: var(--margin) auto;
`

const TextTwo = styled.div`
    text-align: center;
    margin: var(--margin) auto;
    opacity: 0;
    transition: opacity var(--transition-in);
`

let Hide = styled.div`
    display: none;

    &.show {
        display: block;
    }
`


export default function Component({ item, data }) {
    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(item.squares)
    let [selectedIndex, setSelectedIndex] = useState(0)

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
    }
    
    return (
        <Container className={hasInteracted ? 'clicked mtb-2 max-width' : 'mtb-2 max-width'}>
            <Text className='text-one mtb-2 palatino-x-small'>
                <span>Answer with a like</span>
            </Text>
            <InnerContainer className='inner-container'>
                {
                    item.squares.map((item, index) => <Card data={item} index={index} allItems={allItems} hasClicked={(e, index) => hasClicked(e, index)} hasInteracted={hasInteracted} />)
                }
            </InnerContainer>
            <Hide className={hasInteracted ? 'show' : ''}>
                <TextTwo className='text-two palatino-x-small'>You picked</TextTwo>
                <InformationCard item={item} data={data} selectedIndex={selectedIndex} />
            </Hide>
        </Container>
    )
}