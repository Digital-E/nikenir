import { useState } from 'react'
import styled from 'styled-components'

import Card from './card'

const Container = styled.div`
    width: fit-content;

    &.clicked .text-two {
        opacity: 1 !important;
        transition: opacity var(--transition-in) 0.8s;
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
    }

    > span:not(:last-child) {
        position: absolute;
    }

    > span:last-child {
        opacity: 0;
    }
`

const InnerContainer = styled.div`
    margin: 120px 15px 0 15px;
`

const TextTwo = styled.div`
    text-align: center;
    margin: 0px 0;
    opacity: 0;
    transition: opacity var(--transition-in);
`

let data = [
    {
        title: 'Reduce your footprint',
        img: 'images/cross-cards/shoebox 1.png',
        gradient: 'linear-gradient(180.22deg, rgba(255, 255, 255, 0.7) 0.19%, rgba(255, 255, 255, 0.42) 67.56%, rgba(255, 255, 255, 0.161) 83.65%, rgba(255, 255, 255, 0) 96.42%)',
        clicked: false
    },
    {
        title: 'Buy it for life',
        img: 'images/cross-cards/pngegg 1.png',
        gradient: 'linear-gradient(180.22deg, rgba(162, 216, 239, 0.7) 0.19%, rgba(162, 216, 239, 0.56) 74.77%, rgba(162, 216, 239, 0.196) 85.79%, rgba(162, 216, 239, 0) 96.42%)',
        clicked: false
    },
    // {
    //     title: 'Reduce your footprint',
    //     img: 'images/cross-cards/shoebox 1.png',
    //     gradient: 'linear-gradient(180.22deg, rgba(255, 255, 255, 0.7) 0.19%, rgba(255, 255, 255, 0.42) 67.56%, rgba(255, 255, 255, 0.161) 83.65%, rgba(255, 255, 255, 0) 96.42%)',
    //     clicked: false
    // },
    // {
    //     title: 'Buy it for life',
    //     img: 'images/cross-cards/pngegg 1.png',
    //     gradient: 'linear-gradient(180.22deg, rgba(162, 216, 239, 0.7) 0.19%, rgba(162, 216, 239, 0.56) 74.77%, rgba(162, 216, 239, 0.196) 85.79%, rgba(162, 216, 239, 0) 96.42%)',
    //     clicked: false
    // }
]

export default function Component() {
    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(data)



    let hasClicked = (index) => {
        let items = JSON.parse(JSON.stringify(allItems))
        items[index].clicked = true
        setAllItems(items)

        setHasInteracted(true)
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
                <span>You decide to</span>
                <span onClick={() => undo()}>Undo</span>
            </Text>
            <InnerContainer className='inner-container'>
                {
                    data.map((item, index) => <Card data={item} index={index} allItems={allItems} hasClicked={(index) => hasClicked(index)} hasInteracted={hasInteracted} />)
                }
            </InnerContainer>
            <TextTwo className='text-two palatino'>You picked</TextTwo>
        </Container>
    )
}