import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Button from '../../button'


const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 850px;
`

const Title = styled.h2`
    padding: 0 var(--padding);
`

const Text = styled.p``

const Image = styled.div`
    margin-bottom: 50px;

    img {
        transform: rotateY(180deg);
    }
`

const Bubble = styled.div`
    position: absolute;
    width: 50%;
    height: fit-content;
    padding: var(--padding);
    right: var(--padding);
    top: 5%;
    border-radius: var(--border-radius);
    background: var(--background);
    backdrop-filter: var(--backdrop-filter-blur);
`

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0 auto 20px auto;
    padding: 0 40px;
`

export default function Component({ item, data }) {
    let gallery = useRef();
    let flickity;
    let [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {

    }, [])
    
    return (
        <Container className='max-width'>
            <Title>{item.title}</Title>
            <Image><img src={data.avatar} /></Image>
            <ButtonWrapper>
                <Button>Let's play!</Button>
            </ButtonWrapper>
            <Bubble>
                <Text>{item.text[0]}</Text>
            </Bubble>
        </Container>
    )
}