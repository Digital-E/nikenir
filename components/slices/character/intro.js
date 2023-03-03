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

export default function Component({ data }) {
    let gallery = useRef();
    let flickity;
    let [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {

    }, [])
    
    return (
        <Container className='max-width'>
            <Title>{data.character.intro.title}</Title>
            <Image><img src='/images/avatars/People_03 6.png' /></Image>
            <ButtonWrapper>
                <Button>Let's play!</Button>
            </ButtonWrapper>
            <Bubble>
                <Text>
                    The personal choices we make now can help shape a better future for everyone. <br /><br />
                    Sorry, hi, I’m Theo, these issues just get me really fired up! I genuinely think that if we can each think of ourselves as part of a greater whole, fewer people are going to feel left out!
                </Text>
            </Bubble>
        </Container>
    )
}