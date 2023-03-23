import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import AvatarSpeech from './avatar-speech/index'

import Button from '../button'


const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(${props => props.height}px - 130px);
    width: 80%;
    margin: 0 auto;
    margin-top: 130px;
    min-height: calc(100vh - 230px);

    &.hide-intro {
        display: none !important;
    }

    @media(max-width: 989px) {
        height: calc(${props => props.height}px - 105px);
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
        margin: 0 auto 50px auto;
    }

    @media(max-width: 989px) {
        width: fit-content;
        margin-bottom: 50px;
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
    z-index: 2;

    > button {
        position: relative;
        transform: translateY(150%);
    }
`

let disableScroll = (e) => {
    e.preventDefault()
}



export default function Component({ item, data }) {
    let containerRef = useRef();
    let buttonWrapperRef = useRef();
    let [showSpeech, setShowSpeech] = useState(false);
    let [showButton, setShowButton] = useState(false);
    let [screenHeight, setScreenHeight] = useState(0);

    let hasResizedOnce = useRef(false)

    let resize = () => {
        if(window.innerWidth > 576 && hasResizedOnce.current) {
            setScreenHeight(window.innerHeight)
        }

        hasResizedOnce.current = true
    }

    useEffect(() => {

        if(window.scrollY === 0) {
            document.addEventListener('wheel', disableScroll, {passive: false})
            document.addEventListener('touchmove', disableScroll, { passive:false });
        }

        setScreenHeight(window.innerHeight)

        window.addEventListener('resize', resize)

        setTimeout(() => {
            setScreenHeight(window.innerHeight)

            if(window.scrollY > 0) {
                document.removeEventListener('wheel', disableScroll, {passive: false})
                document.removeEventListener('touchmove', disableScroll, { passive:false });
            }
        }, 200)

        setTimeout(() => {
            setShowSpeech(true)

            setTimeout(() => {
                setShowButton(true)
            }, 1000)
        }, 2000)

        return () => {
            document.removeEventListener('wheel', disableScroll, {passive: false})
            document.removeEventListener('touchmove', disableScroll, { passive:false });
            window.removeEventListener('resize', resize)
        }
    }, [])

    let hideIntro = () => {
        // containerRef.current.classList.add('hide-intro')
        document.removeEventListener('wheel', disableScroll, {passive: false})
        document.removeEventListener('touchmove', disableScroll, { passive:false });
        // window.scrollTo(0, 0)
    }

    let scrollDown = () => {
        gsap.to(window, {duration: 1, ease: "power3.inOut", scrollTo: window.innerHeight, onComplete: () => hideIntro()})
    }

    useEffect(() => {
        if(showButton) {
            gsap.to(buttonWrapperRef.current.children[0], {y: 0, duration: 1, ease: "power3.inOut"})
        }
    }, [showButton])
    
    return (
        <Container ref={containerRef} height={screenHeight}>
            <Title>{data.intro.title}</Title>
            <AvatarWrapper>
                <AvatarSpeech avatar={data.avatar} data={data} text={data.intro.text} disableInView={true} activate={showSpeech} toggleFinished={() => {}}/>
            </AvatarWrapper>
            <ButtonWrapper 
                ref={buttonWrapperRef}
                onClick={() => scrollDown()} 
                >
                <Button>Let's play!</Button>
            </ButtonWrapper>
        </Container>
    )
}