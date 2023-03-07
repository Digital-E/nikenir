import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import AvatarSpeech from './avatar-speech'

import Button from '../button'



const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 130px);
    width: 80%;
    margin: 0 auto;

    @media(max-width: 989px) {
        height: 100vh;
        width: 100%;
    }
`

const AvatarWrapper = styled.div`

    @media(min-width: 990px) {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 0 auto;
    }
`


const Title = styled.h1`
    margin: 0 var(--margin);

    @media(min-width: 989px) {
        max-width: 50%;
    }
`

const ButtonWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0;
    width: 100%;
    margin: 0 auto 20px auto;
    padding: 0 40px;
`

export default function Component({ item, data }) {

    useEffect(() => {

    }, [])
    
    return (
        <Container>
            <Title>{data.intro.title}</Title>
            <AvatarWrapper>
                <AvatarSpeech data={data} text={data.intro.text} />
            </AvatarWrapper>
            <ButtonWrapper>
                <Button>Let's play!</Button>
            </ButtonWrapper>
        </Container>
    )
}