import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import styled from 'styled-components'

const Container = styled.div`
    * {
        cursor: pointer;
    }
`;

const InnerContainer = styled.div`
    margin-top: calc(var(--margin) * 2);
    padding: 15px;
    background: black;
    width: 100%;
    border-radius: 20px;

    @media(max-width: 989px) {
        margin-top: calc(var(--margin));
    }
`;

const Text = styled.p`
    color: white;
`
const Logo = styled.div`
    margin-bottom: 10px;
`


const Component = ({ data }) => {

    return (
        <Container className='max-width center'>
            <a href={data.complete.more.link} target='_blank'>
                <InnerContainer className='container-background'>
                    <Logo><img src='/images/logos/nikeimpact.svg'/></Logo>
                    <Text className='palatino-x-small'>Click to read more...</Text>
                </InnerContainer>
            </a>
        </Container>
    )
}

export default Component

