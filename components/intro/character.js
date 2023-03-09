import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import styled from 'styled-components'


const Container = styled.div`
    position: absolute;
    top: ${props => props.data.desktop.y}%;
    left: ${props => props.data.desktop.x}%;
    width: ${props => props.data.desktop.width}px;

    @media(max-width: 989px) {
        top: ${props => props.data.mobile.y}%;
        left: ${props => props.data.mobile.x}%;
        width: ${props => props.data.mobile.width}px; 
    }
`;


let slideOneAnimation = {
    'show': {
        opacity: 1,
        x: '-50%',
        y: '-50%',
    },
    'hide': {
        opacity: 0,
        x: '-50%',
        y: '-200%',
        transition: {
            opacity: {
                duration: 0.5
            },
            y: {
                duration: 0.5 
            }
        }
    }
}

let slideOneAnimationBis = {
    'show': {
        opacity: 1,
        x: '-50%',
        y: '0%',
    },
    'hide': {
        opacity: 0,
        x: '-50%',
        y: '-200%',
        transition: {
            opacity: {
                duration: 1
            },
            y: {
                duration: 1.3
            }
        }
    }
}

let slideTwoAnimationParent = {
    'show': {
        transition: {
            delayChildren: 0,
            staggerChildren: 0.5
        }
    },
    'hide': {
    }
}

let slideTwoAnimation = {
    'show': {
        opacity: 1,
        // x: '-50%',
        // y: '-50%',
        transition: {
            duration: 1,
        }
    },
    'hide': {
        opacity: 0,
        // x: '-50%',
        // y: '-50%',
        transition: {
            opacity: {
                duration: 1
            },
            y: {
                duration: 1
            }
        }
    }
}

const Component = ({ data }) => {

    let containerRef = useRef();


    return (          
        <Container ref={containerRef} data={data}>         
            <img src={data.src} />
        </Container>
    )
}

export default Component

