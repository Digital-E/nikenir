import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Card from './card'

import InformationCard from '../../information-card'

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

export default function Component({ item, data }) {
    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(item.squares)
    let [selectedIndex, setSelectedIndex] = useState(0)

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

    let undo = () => {
        let items = JSON.parse(JSON.stringify(allItems))
        items.forEach(item => item.clicked = false)
        setAllItems(items)

        setHasInteracted(false)
    }
    

    return (
        <Container className={hasInteracted ? 'clicked max-width' : 'max-width'}>
            <Text className='text-one mtb-2 palatino-x-small'>
                <span>Tap spam to make your choice</span>
            </Text>
            <InnerContainer className='inner-container'>
                {
                    item.squares.map((item, index) => <Card data={item} index={index} allItems={allItems} hasClicked={(e, index) => hasClicked(e, index)} hasInteracted={hasInteracted} />)
                }
            </InnerContainer>
            <TextTwo className='text-two mtb-2 palatino-x-small'>You picked</TextTwo>
            <InformationCard item={item} data={data} selectedIndex={selectedIndex} />
        </Container>
    )
}