import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Card from './card'

const Container = styled.div`
    width: fit-content;

    &.clicked .text-two {
        opacity: 1 !important;
        transition: opacity var(--transition-in) 0s;
    }

    .text-one > span:nth-child(2) {
        opacity: 0;
    }

    &.clicked .text-one > span:nth-child(1) {
        opacity: 0;
    }

    &.clicked .text-one > span:nth-child(2) {
        opacity: 1;
        cursor: pointer;
    }
`

const Text = styled.div`
    position: relative;
    text-align: center;
    margin: 30px auto;
    height: 20px;

    > span {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        width: 100%;
    }

    > span:not(:last-child) {
        position: absolute;
    }

    > span:last-child {
        opacity: 0;
    }
`

const InnerContainer = styled.div`
    display: flex;
`

const TextTwo = styled.div`
    text-align: center;
    margin: 30px 0;
    opacity: 0;
    transition: opacity var(--transition-in);
`

let data = [
    {
        title: 'Be part of something bigger',
        img: 'images/cross-cards/shoebox 1.png',
        clicked: false
    },
    {
        title: 'Maximise your potential',
        img: 'images/cross-cards/pngegg 1.png',
        clicked: false
    },
]

export default function Component() {
    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(data)


    // useEffect(() => {
    //     if(hasInteracted) {
    //         confetti({
    //             particleCount: 100,
    //             spread: 70,
    //             origin: { x: 0, y: 0.1 },
    //           });
    //     }
    // }, [hasInteracted])

    let triggerConfetti = (e) => {
        
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        });        
    }

    let hasClicked = (e, index) => {
        let items = JSON.parse(JSON.stringify(allItems))
        items[index].clicked = true
        setAllItems(items)

        setHasInteracted(true)

        triggerConfetti(e);
    }

    let undo = () => {
        let items = JSON.parse(JSON.stringify(allItems))
        items.forEach(item => item.clicked = false)
        setAllItems(items)

        setHasInteracted(false)
    }
    

    return (
        <Container className={hasInteracted ? 'clicked' : ''}>
            <Text className='text-one palatino'>
                <span>Tap spam to make your choice</span>
                <span onClick={() => undo()}>Undo</span>
            </Text>
            <InnerContainer className='inner-container'>
                {
                    data.map((item, index) => <Card data={item} index={index} allItems={allItems} hasClicked={(e, index) => hasClicked(e, index)} hasInteracted={hasInteracted} />)
                }
            </InnerContainer>
            <TextTwo className='text-two palatino'>You picked</TextTwo>
        </Container>
    )
}