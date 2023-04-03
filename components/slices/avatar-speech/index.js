import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import Image from '../../image'

import Bowser from "bowser";

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
    z-index: 0;
    width: fit-content;

    img {
        // width: ${props => props.data.intro.desktop.avatarWidth}vw;
        height:  ${props => props.data.intro.desktop.avatarHeight}vh;
        width: auto;
    }


        
    @media(max-width: 989px) and (min-height: 1000px) {
        width: ${props => props.data.intro.mobile.avatarWidth}vw;
        margin-left: ${props => props.data.intro.mobile.avatarLeft}%;
        bottom: ${props => props.data.intro.mobile.avatarBottom}vw;
        
        img {
            height: auto;
            width: 100%;
        }
    }

    @media(max-width: 576px) {
        width: ${props => props.data.intro.mobile.avatarWidth}vw;
        margin-left: ${props => props.data.intro.mobile.avatarLeft}%;
        bottom: ${props => props.data.intro.mobile.avatarBottom}vw;
        
        img {
            height: auto;
            width: 100%;
        }
    }

`

const ImageWrapperDesktop = styled.div`
    display: none;

    @media(min-width: 990px) {
        display: block
    }
`

const ImageWrapperMobile = styled.div`
    display: block;

    @media(min-width: 990px) {
        display: none
    }
`


const Bubble = styled(motion.div)`
    position: absolute;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);

    // @media(min-width: 990px) {
        width: ${props => props.smallBubble ? '222px': '427px'};
        height: ${props => props.smallBubble ? '227.5px': '162.5px'};
        // bottom: ${props => props.data.intro.desktop.bubbleBottom}vw;
        // left: ${props => props.data.intro.desktop.bubbleLeft}vw;
        bottom: ${props => props.data.intro.desktop.bubbleBottom}%;
        left: ${props => props.data.intro.desktop.bubbleLeft}%;
        clip-path: ${props => props.smallBubble ? 'url(#clipPathMobile)' : 'url(#clipPathDesktop)'};
    // }


    @media(max-width: 989px) and (min-height: 1000px) {
        width: 222px;
        height: 227.5px;
        bottom: ${props => props.data.intro.mobile.bubbleBottom}vw;
        left: ${props => props.data.intro.mobile.bubbleLeft}vw;
        // right: ${props => props.data.intro.mobile.bubbleRight}vw;
        clip-path: url(#clipPathMobile);
    }

    @media(max-width: 576px) {
        width: 222px;
        height: 227.5px;
        bottom: ${props => props.data.intro.mobile.bubbleBottom}vw;
        left: ${props => props.data.intro.mobile.bubbleLeft}vw;
        // right: ${props => props.data.intro.mobile.bubbleRight}vw;
        clip-path: url(#clipPathMobile);
    }

    }
`


const BubbleInner = styled.div`
    position: relative;
    padding: var(--padding) var(--padding) 30px var(--padding);
    height: 100%;
`

const PortalReplay = styled(motion.div)`
    position: absolute;
    // bottom: calc(${props => props.data.intro.desktop.bubbleBottom}vw);
    // left: calc(${props => props.data.intro.desktop.bubbleLeft}vw + 405px);
    bottom: ${props => props.data.intro.desktop.bubbleBottom}%;
    left: calc(${props => props.data.intro.desktop.bubbleLeft}% + 405px);

    @media(max-width: 989px) and (min-height: 1000px) {
        bottom: calc(${props => props.data.intro.mobile.bubbleBottom}vw + 5px);
        left: calc(${props => props.data.intro.mobile.bubbleLeft}vw + 200px);
    }
    

    @media(max-width: 576px) {
        bottom: calc(${props => props.data.intro.mobile.bubbleBottom}vw + 5px);
        left: calc(${props => props.data.intro.mobile.bubbleLeft}vw + 200px);
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


export default function Component({ data, avatar, avatarCrop, text, smallBubble, disableInView, activate, toggleFinished, instantReveal }) {
    let containerRef = useRef()
    let portalRef = useRef()
    let isInView = useInView(containerRef)
    let [startType, setStartType] = useState(false)
    let [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        // if(Bowser.getParser(window.navigator.userAgent).parsePlatform().type === 'desktop') {
        //     setIsDesktop(true)
        // }
    }, [])

    useEffect(() => {
        if(disableInView) return

        if(isInView) {
            if(instantReveal === true) return setStartType(true)
            setTimeout(() => {
                setStartType(true)
            }, 2000)
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
            <ImageWrapper className='avatar-image-wrapper' data={data}>
                <ImageWrapperDesktop>
                    <Image src={avatar} priority={true} />
                </ImageWrapperDesktop>
                <ImageWrapperMobile>
                    <Image src={avatarCrop} priority={true} />
                </ImageWrapperMobile>
            </ImageWrapper>
            <PortalReplay id="portal-replay" data={data} ref={portalRef} variants={bubbleVariants} initial='hide' animate={startType ? 'show' : 'hide'} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0">
                <clipPath id="clipPathDesktop">
                    <path d="M0 27C0 12.0883 12.0883 0 27 0H400C414.912 0 427 12.0883 427 27V102.246C427 117.151 414.923 129.236 400.019 129.246L50.2326 129.493C44.0438 129.498 38.0443 131.628 33.2386 135.528L3.26022 159.854C1.95299 160.915 0 159.985 0 158.301V118.136V27Z" />
                </clipPath>
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0">
                <clipPath id="clipPathMobile">
                    <path d="M0 27C0 12.0883 12.0883 0 27 0H195C209.912 0 222 12.0883 222 27V165.735C222 180.632 209.935 192.714 195.038 192.735L36.2419 192.961C26.8596 192.974 18.1568 197.857 13.2562 205.858L3.70549 221.45C2.65101 223.172 0 222.425 0 220.406V181.096V27Z" fill="white" fillOpacity="0.6"/>
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