import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { gsap }  from  "gsap"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Ticker from './ticker'
import AvatarSpeech from '../avatar-speech'

import Reward from '../complete/reward'

const anime = require('animejs').default

const Container = styled.div`
    position: relative;
    height: 100%;
    // overflow: hidden;

    .ml2 {
        font-weight: 900;
        font-size: 3.5em;
    }

    .ml2 .letter {
        display: inline-block;
        line-height: 1em;
    } 
`

const InnerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    z-index: 0;
`

const Text = styled.div`
    position: relative;
    text-align: center;
    margin: 0 var(--margin);
    // top: 200px;
    z-index: -1;

    span {
        font-size: 120px;
    }

    @media(min-width: 990px) {
        span {
            font-size: 18vw;
        }
    }
`

const AvatarSpeechWrapper = styled(motion.div)`
    @media(min-width: 990px) {
        height: fit-content;
        width: fit-content;
        margin-left: -10vw;

        > div:nth-child(1) > div:nth-child(3) {
            width: calc(100% - 10vw);
            left: 75%;
            right: auto;
        }
    }
`

const RewardWrapper = styled(motion.div)`

    @media(max-width: 989px) {
        padding-top: 0;
        margin: calc(var(--margin) * 4) var(--margin) 0 var(--margin);
    }

    @media(min-width: 990px) {
        margin-left: 205px;
        min-width: 425px;

        > div {
            margin: 0;
        }
    }
`


const StickyWrapper = styled.div`
    position: relative;
    margin: -50px 0 0 0;

    @media(min-width: 990px) {
        margin: -200px auto 0 auto;
        display: flex;
        width: 100%;
        max-width: 890px;
    }
`

const ArrowContainer = styled(motion.div)`
    position: absolute;
    left: 50%;
    bottom: -20px;
    transform: translateX(-50%);
    cursor: pointer;

    @media(max-width: 989px) {
        bottom: 0;
    }
`

const Arrow = styled.div`
    text-align: center;
    cursor: pointer;

    > img {
        cursor: pointer;
    }
`


let textAnimation = null;

let variants = {
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

let arrowVariants = {
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


export default function Component({ data, unlock }) {
    let containerRef = useRef();
    let avatarSpeechWrapperRef = useRef();
    let rewardWrapperRef = useRef();
    let arrowRef = useRef();

    let [avatarReveal, setAvatarReveal] = useState(false);
    let [rewardReveal, setRewardReveal] = useState(false);
    let [arrowReveal, setArrowReveal] = useState(false);


    let isInView = useInView(containerRef, {
        once: true
    })

    let initTextEffect = () => {
        var textWrapper = document.querySelector('.ml2');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");   

        textAnimation = anime.timeline({
            loop: false,
            complete: function(anim) {
                setAvatarReveal(true)
            }
        })
        .add({
            targets: '.ml2 .letter',
            translateX: 40,
            opacity: 0,
            duration: 0,
        })
        .add({
            targets: '.ml2 .letter',
            translateX: [40,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 500 + 30 * i
        })

        textAnimation.pause();
    }

    useEffect(() => {
        initTextEffect();

        // Arrow Animation
        gsap.fromTo(arrowRef.current,{y: 0}, { y: -5 , duration: 0.5, yoyo: true, ease: "power2.inOut", repeat: -1});
    }, [])

    useEffect(() => {
        if(isInView) {
            textAnimation.play();
        }
    }, [isInView])

    let toggleFinished = () => {
        setRewardReveal(true)

        setTimeout(() => {
            setArrowReveal(true)
            unlock()
            setTimeout(() => {
                scrollDown()
            }, 10)
        }, 1000)
    }

    let scrollDown = () => {
        gsap.to(window, {duration: 2, ease: "power3.inOut", scrollTo: {y: "max"}})
    }
    
    return (
        <Container ref={containerRef}>
            <InnerContainer>
                <Text><span className='large-headline ml2'>{data.complete.praise.title}</span></Text>
                <StickyWrapper>
                    <AvatarSpeechWrapper 
                        initial='hide'
                        variants={variants}
                        animate={avatarReveal ? 'show' : 'hide'}
                        ref={avatarSpeechWrapperRef}>
                        <AvatarSpeech data={data} text={data.complete.praise.text} disableInView={true} activate={avatarReveal} toggleFinished={() => toggleFinished()}/>
                    </AvatarSpeechWrapper>
                    <RewardWrapper 
                        initial='hide'
                        variants={variants}
                        animate={rewardReveal ? 'show' : 'hide'}                    
                        ref={rewardWrapperRef}>
                        <Reward data={data} />
                    </RewardWrapper>
                </StickyWrapper>
                <Ticker data={data} />
            </InnerContainer>
            <ArrowContainer 
            initial='hide'
            variants={arrowVariants}
            animate={arrowReveal ? 'show' : 'hide'}
            onClick={() => scrollDown()}>
                <Arrow ref={arrowRef}>
                    <img src='/images/icons/ui-arrow-20.svg' />
                </Arrow>
            </ArrowContainer> 
        </Container>
    )
}