import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { gsap }  from  "gsap"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"

import Ticker from './ticker'
import AvatarSpeech from '../avatar-speech/index'

import Reward from '../complete/reward'

gsap.registerPlugin(ScrollToPlugin);

const anime = require('animejs').default

const Container = styled.div`
    position: relative;
    height: 100%;
    margin-bottom: 150px;


    .ml2 .letter {
        display: inline-block;
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
    position: absolute;
    text-align: center;
    margin: 100px var(--margin) 0 var(--margin);
    z-index: -1;

    span {
        font-size: 120px;
        padding: 0 5px;
    }

    @media(min-width: 990px) {
        position: relative;
        margin: 0 var(--margin);

        span {
            font-size: 18vw;
        }

        .br-mobile {
            display: none;
        }
    }

    @media(max-width: 989px) {
        margin: 100px 0 0 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;

         span {
            padding: 0 2px;
        }
    }
`

const AvatarSpeechWrapper = styled(motion.div)`
    height: fit-content;
    width: fit-content;

    img {
        height: auto;
    }

    @media(min-width: 990px) {
        position: absolute;
        height: fit-content;
        width: fit-content;
        left: ${props => props.data.complete.praise.desktop.avatarLeft}px;
        bottom: -180px;

        > div > div {
            transform: rotateY(${props => props.data.complete.praise.mobile.flip ? '-180deg' : '0'});
        }

        .avatar-speech-bubble {
            bottom: ${props => props.data.complete.praise.desktop.bubbleBottom}%;
            left: ${props => props.data.complete.praise.desktop.bubbleLeft}%;
        }

        #portal-replay {
            bottom: calc(${props => props.data.complete.praise.desktop.bubbleBottom}% + 5px);
            left: calc(${props => props.data.complete.praise.desktop.bubbleLeft}% + 200px);
        }

        img {
            width: 724px;
            height: auto;
        }
    }



    @media(max-width: 989px) {
        > div {
            bottom: -15vw;
        }

        > div > div {
            margin-left: ${props => props.data.complete.praise.mobile.avatarLeft}%;
            transform: rotateY(${props => props.data.complete.praise.mobile.flip ? '-180deg' : '0'});
        }

        > div > div:nth-child(1) {
            bottom: 0;
        }

        .avatar-image-wrapper {
            width: ${props => props.data.complete.praise.mobile.avatarWidth}vw;
        }

        .avatar-speech-bubble {
            bottom: ${props => props.data.complete.praise.tablet.bubbleBottom}vw;
            left: ${props => props.data.complete.praise.mobile.bubbleLeft}vw;
        }

        #portal-replay {
            bottom: calc(${props => props.data.complete.praise.tablet.bubbleBottom}vw + 5px);
            left: calc(${props => props.data.complete.praise.mobile.bubbleLeft}vw + 200px);
        }
    }



    @media(max-width: 576px) {
        > div {
            bottom: -15vw;
        }

        > div > div {
            margin-left: ${props => props.data.complete.praise.mobile.avatarLeft}%;
            transform: rotateY(${props => props.data.complete.praise.mobile.flip ? '-180deg' : '0'});
        }

        > div > div:nth-child(1) {
            bottom: 0;
        }

        .avatar-image-wrapper {
            width: ${props => props.data.complete.praise.mobile.avatarWidth}vw;
        }

        .avatar-speech-bubble {
            bottom: ${props => props.data.complete.praise.mobile.bubbleBottom}vw;
            // left: ${props => props.data.complete.praise.mobile.bubbleLeft}vw;
            left: auto;
            right: ${props => props.data.complete.praise.mobile.bubbleRight}vw
        }

        #portal-replay {
            bottom: calc(${props => props.data.complete.praise.mobile.bubbleBottom}vw + 5px);
            // left: calc(${props => props.data.complete.praise.mobile.bubbleLeft}vw + 200px);
            left: auto;
            right: calc(${props => props.data.complete.praise.mobile.bubbleRight}vw + 0px);
        }
    }
`

const RewardWrapper = styled(motion.div)`
    align-self: center;

    @media(max-width: 989px)  {
        padding-top: 0;
        margin: calc(var(--margin) * 4) var(--margin) 0 var(--margin);
        display: none;
    }

    @media(min-width: 990px) {
        min-width: 425px;
        margin-left: auto;

        > div {
            margin: 0;
        }
    }
`


const StickyWrapper = styled.div`
    position: relative;
    z-index: 1;

    @media(min-width: 990px) {
        margin: -200px auto 0 auto;
        display: flex;
        align-items: flex-end;
        width: 100%;
        max-width: 890px;
    }

    @media(max-width: 989px)  {
        bottom: 0;
        height: 100%;
        display: flex;
        align-items: flex-end;
    }
`

const ArrowContainer = styled(motion.div)`
    position: absolute;
    left: 50%;
    bottom: -80px;
    transform: translateX(-50%);
    cursor: pointer;

    @media(max-width: 989px)  {
        bottom: 20px;
    }
`

const Arrow = styled.button             `
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
        var textWrapperReplace = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        var textWrapperSplit = textWrapperReplace.split('')

        textWrapperSplit.splice(58, 0, '<br class="br-mobile" />')
        
        var textWrapperJoin = textWrapperSplit.join('')

        textWrapper.innerHTML = textWrapperJoin
        

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
        gsap.fromTo(arrowRef.current,{x: '-50%', y: 0}, {x: '-50%', y: -5 , duration: 0.5, yoyo: true, ease: "power2.inOut", repeat: -1});
    }, [])

    useEffect(() => {
        if(isInView) {
            textAnimation.play();

            setTimeout(() => {
                setRewardReveal(true)
            }, 4000)
        }
    }, [isInView])

    let toggleFinished = () => {

        setTimeout(() => {
            setArrowReveal(true)
            unlock()
        }, 1000)
    }

    let scrollDown = () => {
        if(window.innerWidth < 576) {
            let y = window.scrollY + containerRef.current.getBoundingClientRect().bottom - 15
            gsap.to(window, {duration: 2, ease: "power3.inOut", scrollTo: {y: y}})
        } else {
            gsap.to(window, {duration: 2, ease: "power3.inOut", scrollTo: {y: "max"}})
        }
    }
    
    return (
        <Container ref={containerRef}>
            <InnerContainer>
                <Text><span className='large-headline ml2'>{data.complete.praise.title}</span></Text>
                <StickyWrapper>
                    <AvatarSpeechWrapper 
                        smallBubble={true}
                        // initial='hide'
                        // variants={variants}
                        // animate={avatarReveal ? 'show' : 'hide'}
                        data={data}
                        ref={avatarSpeechWrapperRef}>
                        <AvatarSpeech avatar={data.complete.praise.avatar} data={data} text={data.complete.praise.text} smallBubble={true} disableInView={true} activate={avatarReveal} toggleFinished={() => toggleFinished()}/>
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
                <Arrow ref={arrowRef} aria-label='press the arrow button to move forward'>
                    <img src={`${process.env.basePath}/images/icons/ui-arrow-20.svg`} />
                </Arrow>
            </ArrowContainer> 
        </Container>
    )
}