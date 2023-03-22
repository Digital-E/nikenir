import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

import { motion } from 'framer-motion'
import { gsap } from 'gsap'

import Image from '../../image'

const Container = styled.div`
    position: relative;

    img {
        display: none;
    }

    .show-frame {
        display: block;
    }
`



export default function Component({ data, index, hoveredIndex }) {
    let containerRef = useRef();
    let sequenceIndex = useRef(0);
    let animationRef = useRef();

    function update() {
        Array.from(containerRef.current.children).forEach(item => {
            item.classList.remove('show-frame')
        })


        Array.from(containerRef.current.children)[Math.round(sequenceIndex.current)]?.classList.add('show-frame')
    }

    useEffect(() => {
        Array.from(containerRef.current.children)[0].classList.add('show-frame')
    }, [])

    useEffect(() => {
        if(hoveredIndex === index) {
            animationRef.current = gsap.to(sequenceIndex, {current: 5, duration: 0.3, onUpdate: update})
        } else if(sequenceIndex.current > 0) {
            animationRef.current = gsap.to(sequenceIndex, {current: 0, duration: 0.3, onUpdate: update})
        }
    }, [hoveredIndex])

    return (
        <Container ref={containerRef}>
            {
                data.map(item => <Image src={item} priority={true} />)
            }
        </Container>
    )
}