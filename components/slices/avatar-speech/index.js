import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'

import Typewriter from './typewriter'


const Container = styled.div`
    position: relative;
    display: flex;
    z-index: 1;

    > svg {
        fill:#fff;
        fill-opacity:0.6000000238418579;
        backdrop-filter: blur(10px);
        height: 0;
    }
`

const Image = styled.div`
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
`

const Tail = styled.div`
    position: absolute;
    bottom: -30.1px;
    left: 0;
    height: 30px;
    width: 30px;
    background: rgb(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    clip-path: url(#clipPath);
    //clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
`

let bubbleVariants = {
    'show': {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3
        }
    },
    'hide': {
        opacity: 0,
        y: 20
    }
}


export default function Component({ data, text }) {
    let containerRef = useRef()
    let isInView = useInView(containerRef)
    let [startType, setStartType] = useState(false)

    useEffect(() => {
        if(isInView) {
            setTimeout(() => {
                setStartType(true)
            }, 500)
        }
    }, [isInView])

    return (
        <Container ref={containerRef}>
            <Image><img src={data.avatar} /></Image>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.73 28.05">
                <clipPath id="clipPath">
                    <path d="M37.73.33a27,27,0,0,0-21.8,11.12L3.62,28.38A2,2,0,0,1,0,27.2V0"/>
                    {/* <circle cx="40" cy="35" r="35" /> */}
                </clipPath>
            </svg>
            <Bubble variants={bubbleVariants} initial='hide' animate={startType ? 'show' : 'hide'}>
                <BubbleInner>
                    <Typewriter data={text} start={startType} />
                </BubbleInner>
                <Tail />
            </Bubble>
        </Container>
    )
}