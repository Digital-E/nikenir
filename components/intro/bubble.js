import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
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
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    width: 90px;
    height: 75px;
    transition: backdropFilter 0s !important;

    img {
        width: 80%;
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
    }
}

let bubbleVariants = {
    'show': {
        opacity: 1,
        y: 0
        // transition: {
        // }
    },
    'hide': {
        opacity: 0,
        y: 10
    }
}

const Component = ({ data, index, bubbles, bubblesDisplayArray }) => {

    let containerRef = useRef();

    return (          
        <Container initial='hide' variants={mainBubbleVariants} animate={bubblesDisplayArray[index].show ? 'show' : 'hide'} ref={containerRef} data={bubblesDisplayArray[index]}>  
            <BubbleOne variants={bubbleVariants} flip={bubblesDisplayArray[index].desktop.flip} />
            <BubbleTwo variants={bubbleVariants} flip={bubblesDisplayArray[index].desktop.flip} /> 
            <MainBubble variants={bubbleVariants}>
                <img src={bubblesDisplayArray[index].src} />
            </MainBubble>
        </Container>
    )
}

export default Component

