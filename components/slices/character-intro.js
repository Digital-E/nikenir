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
        margin: 0 auto;
    }

    @media(max-width: 989px) {
        margin-bottom: 20px;
    }
`


const Title = styled.h1`
    margin: 0 var(--margin);

    @media(min-width: 989px) {
        max-width: 40%;
    }
`

const ButtonWrapper = styled(motion.div)`
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

let variants = {
    'show': {
        opacity: 1,
        y: 0,
    },
    'hide': {
        opacity: 0,
        y: '100%'
    }
}

export default function Component({ item, data }) {
    let containerRef = useRef();
    let [showSpeech, setShowSpeech] = useState(false);
    let [showButton, setShowButton] = useState(false);
    let [screenHeight, setScreenHeight] = useState(0);

    let resize = () => {
        setScreenHeight(window.innerHeight)
    }

    useEffect(() => {
        // window.scrollTo(0, 0)
        if(window.scrollY === 0) {
            document.addEventListener('wheel', disableScroll, {passive: false})
            document.addEventListener('touchmove', disableScroll, { passive:false });
        }

        setScreenHeight(window.innerHeight)

        window.addEventListener('resize', resize)

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
    
    return (
        <Container ref={containerRef} height={screenHeight}>
            <Title>{data.intro.title}</Title>
            <AvatarWrapper>
                <AvatarSpeech data={data} text={data.intro.text} disableInView={true} activate={showSpeech} toggleFinished={() => {}}/>
            </AvatarWrapper>
            <ButtonWrapper 
                onClick={() => scrollDown()} 
                variants={variants}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                animate={showButton ? 'show' : 'hide'}
                >
                <Button>Let's play!</Button>
            </ButtonWrapper>
        </Container>
    )
}