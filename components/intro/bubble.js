import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { gsap } from 'gsap'
import styled from 'styled-components'


const Container = styled(motion.div)`
    position: absolute;
    top: ${props => props.data.desktop.y}%;
    left: ${props => props.data.desktop.x}%;

    @media(max-width: 989px) {
        top: ${props => props.data.mobile.y}%;
        left: ${props => props.data.mobile.x}%;  
    }
`;

let MainBubble = styled(motion.div)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;

    @keyframes hover {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(-10%);
        }
    }

    animation: hover 2s ease-in-out alternate infinite;

    width: 90px;
    height: 75px;

    img {
        width: 90%;
    }


    @media(max-width: 989px) {
        width: 70px;
        height: 50px;
    }
`


let BubbleOne = styled(motion.div)`
    position: absolute;
    height: 13px;
    width: 13px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 999px;
    bottom: ${props => props.flip ? '-30%' : '-30%' };
    left: ${props => props.flip ? '120%' : '-30%' };

    @media(max-width: 989px) {
        height: 10px;
        width: 10px;
    }
`

let BubbleTwo = styled(motion.div)`
    position: absolute;
    height: 20px;
    width: 20px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 999px;
    bottom: ${props => props.flip ? '-15%' : '-15%' };
    left: ${props => props.flip ? '100%' : '-20%' };

    @media(max-width: 989px) {
        width: 15px;
        height: 15px;
    }
`


let mainBubbleVariants = {
    'show': {
        transition: {
            delayChildren: 0,
            staggerChildren: 0.2
        }
    },
    'hide': {
        transition: {
            staggerChildren: 0.1
        }
    }
}

let bubbleVariants = {
    'show': {
        opacity: 1,
        y: 0,
        transition: {
            opacity: {
                duration: 0.3
            },
            y: {
                duration: 2,
                type: 'spring',
                bounce: 0.6
            }
        }
    },
    'hide': {
        opacity: 0,
        y: 10,
        transition: {
            duration: 0.6,
            type: 'spring'
        }
    }
}

const Component = ({ data, index, bubbles, bubblesDisplayArray }) => {

    let containerRef = useRef();
    let animationRef = useRef();
    let mainBubbleRef = useRef();

    useEffect(() => {
        // animationRef.current = gsap.fromTo(mainBubbleRef.current,{top: 0}, { top: -30 , duration: 1, yoyo: true, ease: "power3.inOut", repeat: -1});
        // if(bubblesDisplayArray[index].show) {
        //     animationRef.current = gsap.fromTo(mainBubbleRef.current,{top: 0}, { top: -3 , duration: 1, yoyo: true, ease: "power3.inOut", repeat: -1});
        // } else {
        //     animationRef.current?.kill()
        // }
    }, [])

    return (          
        <Container initial='hide' variants={mainBubbleVariants} animate={bubblesDisplayArray[index].show ? 'show' : 'hide'} ref={containerRef} data={bubblesDisplayArray[index]}>  
            <BubbleOne variants={bubbleVariants} flip={bubblesDisplayArray[index].desktop.flip} />
            <BubbleTwo variants={bubbleVariants} flip={bubblesDisplayArray[index].desktop.flip} /> 
            <MainBubble ref={mainBubbleRef} variants={bubbleVariants}>
                <img src={bubblesDisplayArray[index].src} />
            </MainBubble>
        </Container>
    )
}

export default Component

