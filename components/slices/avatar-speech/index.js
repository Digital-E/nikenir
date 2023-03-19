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
    width: fit-content;

    img {
        width: ${props => props.data.intro.desktop.width}vw;
        transform: rotateY(180deg);
    }

    @media(max-width: 989px) {
        width: ${props => props.data.intro.mobile.width}vw;
        margin-left: -30%;
        
        img {
            width: 100%;
        }
    }
`

const Bubble = styled(motion.div)`
    position: absolute;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);

    @media(min-width: 990px) {
        width: ${props => props.smallBubble ? '222px': '427px'};
        height: ${props => props.smallBubble ? '227.5px': '162.5px'};
        bottom: ${props => props.data.intro.desktop.bottom}vw;
        left: ${props => props.data.intro.desktop.left}vw;
        clip-path: ${props => props.smallBubble ? 'url(#clipPathMobile)' : 'url(#clipPathDesktop)'};
    }

    @media(max-width: 989px) {
        width: 222px;
        height: 227.5px;
        bottom: ${props => props.data.intro.mobile.bottom}vw;
        left: ${props => props.data.intro.mobile.left}vw;
        clip-path: url(#clipPathMobile);
    }
`


const BubbleInner = styled.div`
    position: relative;
    padding: var(--padding) var(--padding) 30px var(--padding);
    height: 100%;
`

const PortalReplay = styled(motion.div)`
    position: absolute;
    bottom: calc(${props => props.data.intro.desktop.bottom}vw);
    left: calc(${props => props.data.intro.desktop.left}vw + 405px);

    @media(max-width: 989px) {
        bottom: calc(${props => props.data.intro.mobile.bottom}vw + 5px);
        left: calc(${props => props.data.intro.mobile.left}vw + 200px);
    }
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


export default function Component({ data, text, smallBubble, disableInView, activate, toggleFinished }) {
    let containerRef = useRef()
    let portalRef = useRef()
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
            <ImageWrapper data={data}><Image src={data.avatarCrop} priority={true} /></ImageWrapper>
            <PortalReplay data={data} ref={portalRef} variants={bubbleVariants} initial='hide' animate={startType ? 'show' : 'hide'} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0">
                <clipPath id="clipPathDesktop">
                    <path d="M0 27C0 12.0883 12.0883 0 27 0H400C414.912 0 427 12.0883 427 27V102.246C427 117.151 414.923 129.236 400.019 129.246L50.2326 129.493C44.0438 129.498 38.0443 131.628 33.2386 135.528L3.26022 159.854C1.95299 160.915 0 159.985 0 158.301V118.136V27Z" />
                </clipPath>
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0">
                <clipPath id="clipPathMobile">
                    <path d="M0 27C0 12.0883 12.0883 0 27 0H195C209.912 0 222 12.0883 222 27V165.735C222 180.632 209.935 192.714 195.038 192.735L36.2419 192.961C26.8596 192.974 18.1568 197.857 13.2562 205.858L3.70549 221.45C2.65101 223.172 0 222.425 0 220.406V181.096V27Z" fill="white" fill-opacity="0.6"/>
                </clipPath>
            </svg>                           
            <Bubble className='avatar-speech-bubble' data={data} smallBubble={smallBubble} variants={bubbleVariants} initial='hide' animate={startType ? 'show' : 'hide'}>
                <BubbleInner>
                    <Typewriter data={text} start={startType} toggleFinishedFunc={() => toggleFinishedFunc()} portalRef={portalRef} />
                </BubbleInner>
            </Bubble>
        </Container>
    )
}