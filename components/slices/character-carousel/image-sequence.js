import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from 'gsap'

import Image from '../../image'

const Container = styled.div`
    position: relative;

`

var delay = 0.05;

const InnerContainer = styled.div`
    img {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        visibility: hidden;
    }

    // .show-frame {
    //     display: block;
    // }

    // img:nth-child(1) {
    //     visibility: visible;
    // }

    img {
        display: block
    }

    @keyframes rotate-animation {
        0% {
            visibility: visible
        }
    }

    @keyframes rotate-animation-back {
        0% {
            visibility: visible
        }
    }

    &.rotate img {
        animation: rotate-animation ${delay}s
    }

    &.rotate img:nth-child(1) {
        visibility: hidden;
        animation: none;
        transition: visibility 0s ${delay * 2}s;
    }
    &.rotate img:nth-child(2) {
        animation-delay: ${delay * 2}s
    }
    &.rotate img:nth-child(3) {
        animation-delay: ${delay * 3}s
    }
    &.rotate img:nth-child(4) {
        animation-delay: ${delay * 4}s
    }
    &.rotate img:nth-child(5) {
        animation-delay: ${delay * 5}s
    }
    &.rotate img:nth-child(6) {
        visibility: visible;
        animation: none;
        transition: visibility 0s ${delay * 6}s;
    }

    // Back

    &.rotate-back img {
        animation: rotate-animation-back ${delay}s
    }

    &.rotate-back img:nth-child(1) {
        visibility: visible;
        animation: none;
        transition: visibility 0s ${delay * 6}s;
    }
    
    &.rotate-back img:nth-child(2) {
        animation-delay: ${delay * 5}s
    }
    &.rotate-back img:nth-child(3) {
        animation-delay: ${delay * 4}s
    }
    &.rotate-back img:nth-child(4) {
        animation-delay: ${delay * 3}s
    }
    &.rotate-back img:nth-child(5) {
        animation-delay: ${delay * 2}s
    }
    &.rotate-back img:nth-child(6) {
        visibility: hidden;
        animation: none;
        transition: visibility 0s ${delay * 2}s;
    }
`

const Placeholder = styled.div`
    position: relative;

    img {
        opacity: 0;
    }
`



export default function Component({ data, index, hoveredIndex }) {
    let containerRef = useRef();
    let isRotating = useRef(false);
    let timeout = useRef(null);
    let timeoutTwo = useRef(null);
    let requestRotateBack = useRef(false)
    let isRotatingEnd = useRef(false)

    useEffect(() => {
        if(window.innerWidth < 990) {
            if(hoveredIndex === index) {
                containerRef.current.classList.remove('rotate-back')
                containerRef.current.classList.add('rotate')
            } 
            else {
                containerRef.current.classList.remove('rotate')
                containerRef.current.classList.add('rotate-back')
            } 
        }
    }, [hoveredIndex])

    let mouseEnter = () => {

        if(!isRotating.current && !isRotatingEnd.current) {
            clearTimeout(timeout.current)

            isRotating.current = true
            containerRef.current.classList.remove('rotate-back')
            containerRef.current.classList.add('rotate')

            timeout.current = setTimeout(() => {
                isRotating.current = false
            }, 300)
        }
    }

    let mouseLeave = () => {

        if(!isRotating.current && !isRotatingEnd.current) {
            clearTimeout(timeout.current)

            isRotating.current = true
            containerRef.current.classList.add('rotate-back')
            containerRef.current.classList.remove('rotate')
    
            timeout.current = setTimeout(() => {
                isRotating.current = false
            }, 300)
        } 
        else {
            clearTimeout(timeoutTwo.current)

            isRotating.current = true
            isRotatingEnd.current = true

            timeoutTwo.current = setTimeout(() => {
                containerRef.current.classList.add('rotate-back')
                containerRef.current.classList.remove('rotate')
                isRotating.current = false
                isRotatingEnd.current = false
            }, 300)
        }
    }

    return (
        <Container
            onMouseEnter={() => mouseEnter()}
            onMouseLeave={() => mouseLeave()}
        >
            <Placeholder>
                <Image src={data[0]} priority={true} />
            </Placeholder>
            <InnerContainer ref={containerRef} className='rotate-back'>
                {
                    data.map(item => <img src={item.src}  />)
                }
            </InnerContainer>
        </Container>
    )
}