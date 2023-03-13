import { useEffect } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'

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

const AvatarSpeechWrapper = styled.div`
    @media(min-width: 990px) {
        height: fit-content;
        width: fit-content;
        margin-left: -10vw;

        // > div {
        //     margin-left: -15vw;
        //     margin-right: 15vw;
        // }

        > div:nth-child(1) > div:nth-child(3) {
            width: calc(100% - 10vw);
            left: 75%;
            right: auto;
        }

        // img {
        //     max-width: 30vw;
        // }
    }
`

const RewardWrapper = styled.div`

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




export default function Component({ data }) {

    useEffect(() => {
        var textWrapper = document.querySelector('.ml2');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    //     anime.timeline({loop: true})
    //     .add({
    //         targets: '.ml2 .letter',
    //         scale: [4,1],
    //         opacity: [0,1],
    //         translateZ: 0,
    //         easing: "easeOutExpo",
    //         duration: 950,
    //         delay: (el, i) => 70*i
    //     }).add({
    //         targets: '.ml2',
    //         opacity: 0,
    //         duration: 1000,
    //         easing: "easeOutExpo",
    //         delay: 1000
    //     });      

        anime.timeline({loop: true})
        .add({
            targets: '.ml2 .letter',
            translateX: [40,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 500 + 30 * i
        }).add({
            targets: '.ml2 .letter',
            translateX: [0,-30],
            opacity: [1,0],
            easing: "easeInExpo",
            duration: 1100,
            delay: (el, i) => 100 + 30 * i
        });
    }, [])    
    
    return (
        <Container>
            <InnerContainer>
                <Text><span className='large-headline ml2'>{data.complete.praise.title}</span></Text>
                <StickyWrapper>
                    <AvatarSpeechWrapper>
                        <AvatarSpeech data={data} text={data.complete.praise.text}/>
                    </AvatarSpeechWrapper>
                    <RewardWrapper>
                        <Reward data={data} />
                    </RewardWrapper>
                </StickyWrapper>
                <Ticker data={data} />
            </InnerContainer>
        </Container>
    )
}