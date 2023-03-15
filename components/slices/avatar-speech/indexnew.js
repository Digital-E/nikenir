import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import Image from '../../image'

import Typewriter from './typewriter'


const Container = styled.div`
    position: relative;
    display: flex;
    z-index: 1;

    > svg {
        height: 0 !important;
        width: 0 !important;
    }
`

const ImageWrapper = styled.div`
    img {
        width: 30vw;
        transform: rotateY(180deg);
    }

    @media(max-width: 989px) {
        width: 70%;
        margin-left: -20%;
        
        img {
            width: 100%;
        }
    }
`

const Bubble = styled(motion.div)`
    position: absolute;
    height: fit-content;
    left: 30%;
    bottom: 95%;
    margin-right: 15px;
    

    @media(min-width: 990px) {
        width: 80%;
        left: auto;
        bottom: 90%;
        right: -55%;
        margin-right: auto;
    }

    @media(max-width: 989px) {
        min-width: calc(70% - 15px);
    }
`


const BubbleInner = styled.div`
    position: relative;
    min-height: 53px;
    padding: var(--padding);
    border-radius: var(--border-radius) var(--border-radius) var(--border-radius) 0;
    background: var(--background);
    backdrop-filter: blur(10px);
    clip-path: url(#clipPath);

    height: 140px;
    width: 427px;
`

const BubbleBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`


const Tail = styled.div`
    position: absolute;
    bottom: -30px;
    left: 0px;
    height: 30px;
    width: 61px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    clip-path: url(#clipPath);
    // clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
`


let bubbleVariants = {
    'show': {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: 0.1
        }
    },
    'hide': {
        opacity: 0,
        y: 20
    }
}


export default function Component({ data, text, disableInView, activate, toggleFinished }) {
    let containerRef = useRef()
    let isInView = useInView(containerRef)
    let [startType, setStartType] = useState(false)

    useEffect(() => {
        if(disableInView) return

        if(isInView) {
            setTimeout(() => {
                setStartType(true)
            }, 500)
        }
    }, [isInView])

    useEffect(() => {
        if(activate) {
            setTimeout(() => {
                setStartType(true)
            }, 500)
        }
    }, [activate])

    let toggleFinishedFunc = () => {
        if(activate) {
            toggleFinished()
        }
    }

    return (
        <Container ref={containerRef}>
            <ImageWrapper><Image src={data.avatar} priority={true} /></ImageWrapper>
            <svg width="427" height="140" viewBox="0 0 427 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="clipPath">
                    <path d="M0 27C0 12.0883 12.0883 0 27 0H400C414.912 0 427 12.0883 427 27V81.7463C427 96.6506 414.923 108.736 400.019 108.746L50.2326 108.993C44.0438 108.998 38.0443 111.128 33.2386 115.028L3.26022 139.354C1.95299 140.415 0 139.485 0 137.801V97.6364V27Z" fill="white"/>
                </clipPath>
            </svg>              
            <Bubble variants={bubbleVariants} initial='hide' animate={startType ? 'show' : 'hide'}>
                <BubbleInner>
                    {/* <BubbleBackground>                      
                    </BubbleBackground> */}
                    <Typewriter data={text} start={startType} toggleFinishedFunc={() => toggleFinishedFunc()}/>
                </BubbleInner>
            </Bubble>
        </Container>
    )
}