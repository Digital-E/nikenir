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
        position: absolute;
    }
`

const ImageWrapper = styled.div`
    position: relative;
    z-index: 999;

    img {
        width: 32.5vw;
        transform: rotateY(180deg);
    }

    @media(max-width: 989px) {
        width: 80%;
        margin-left: -20%;
        
        img {
            width: 100%;
        }
    }
`

const Bubble = styled(motion.div)`
    position: absolute;
    height: fit-content;
    left: 37%;
    bottom: 90%;
    margin-right: 15px;
    

    @media(min-width: 990px) {
        width: 80%;
        left: auto;
        bottom: 87%;
        right: -46%;
        margin-right: auto;
    }

    @media(max-width: 989px) {
        min-width: calc(53% - 15px);
    }
`


const BubbleInner = styled.div`
    position: relative;
    min-height: 53px;
    padding: var(--padding);
    border-radius: var(--border-radius) var(--border-radius) var(--border-radius) 0;
    // background: var(--background);
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
`

const Tail = styled.div`
    position: absolute;
    bottom: -30px;
    left: -0.3px;
    height: 30px;
    width: 70px;
    // background: rgba(255, 255, 255, 0.6);
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
            setStartType(true)
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 30">
                <clipPath id="clipPath">
                    {/* <path d="M37.73.33a27,27,0,0,0-21.8,11.12L3.62,28.38A2,2,0,0,1,0,27.2V0"/> */}
                    <path d="M4.88103 29.0714L41 0H0V26.7343C0 29.254 2.91819 30.6512 4.88103 29.0714Z"/>
                    {/* <path d="M20.5 16.5L4.88103 29.0714C2.91819 30.6512 0 29.254 0 26.7343V0H36H41H63.5C55 0.833333 34.5 5.3 20.5 16.5Z" /> */}
                    {/* <path d="M4.88103 29.0714L41 0H0V26.7343C0 29.254 2.91819 30.6512 4.88103 29.0714Z" /> */}
                    {/* <polygon class="triangle" stroke="white" strokeWidth="10" stroke-linejoin="round" points="20,0 0,40 40,40"/> */}
                    {/* <circle cx="40" cy="35" r="35" /> */}
                </clipPath>
            </svg>
            <Bubble variants={bubbleVariants} initial='hide' animate={startType ? 'show' : 'hide'}>
                <BubbleInner>
                    <Typewriter data={text} start={startType} toggleFinishedFunc={() => toggleFinishedFunc()}/>
                </BubbleInner>
                <Tail />
            </Bubble>
        </Container>
    )
}