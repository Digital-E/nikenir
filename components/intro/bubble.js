import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import styled from 'styled-components'


const Container = styled(motion.div)`
    position: absolute;
    top: ${props => props.position.y}%;
    left: ${props => props.position.x}%;

`;

let MainBubble = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    width: 120px;
    height: 100px;
    transition: backdropFilter 0s !important;

    img {
        width: 80%;
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
    left: ${props => props.flip ? '115%' : '-30%' };
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
        <Container initial='hide' variants={mainBubbleVariants} animate={bubblesDisplayArray[index].show ? 'show' : 'hide'} ref={containerRef} position={bubblesDisplayArray[index].position}>  
            <BubbleOne variants={bubbleVariants} flip={bubblesDisplayArray[index].position.flip} />
            <BubbleTwo variants={bubbleVariants} flip={bubblesDisplayArray[index].position.flip} /> 
            <MainBubble variants={bubbleVariants}>
                <img src={bubblesDisplayArray[index].src} />
            </MainBubble>
        </Container>
    )
}

export default Component

