import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

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
    margin-top: 130px;

    &.hide-intro {
        display: none !important;
    }

    @media(max-width: 989px) {
        height: calc(100vh - 105px);
        width: 100%;
        margin-top: 105px;
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
        max-width: 40%;
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
    z-index: 2;
`

let disableScroll = (e) => {
    e.preventDefault()
}

export default function Component({ item, data }) {
    let containerRef = useRef();

    useEffect(() => {
        // window.scrollTo(0, 0)
        if(window.scrollY === 0) {
            document.addEventListener('wheel', disableScroll, {passive: false})
            document.addEventListener('touchmove', disableScroll, { passive:false });
        }
    }, [])

    let hideIntro = () => {
        // containerRef.current.classList.add('hide-intro')
        document.removeEventListener('wheel', disableScroll, {passive: false})
        document.removeEventListener('touchmove', disableScroll, { passive:false });
        // window.scrollTo(0, 0)
    }

    let scrollDown = () => {
        gsap.to(window, {duration: 2, ease: "power2.inOut", scrollTo: window.innerHeight, onComplete: () => hideIntro()})
    }
    
    return (
        <Container ref={containerRef}>
            <Title>{data.intro.title}</Title>
            <AvatarWrapper>
                <AvatarSpeech data={data} text={data.intro.text} />
            </AvatarWrapper>
            <ButtonWrapper onClick={() => scrollDown()}>
                <Button>Let's play!</Button>
            </ButtonWrapper>
        </Container>
    )
}