import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from 'gsap'

import Image from '../../image'

const Container = styled.div`
    position: relative;

`

const InnerContainer = styled.div`
    img {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
    }

    .show-frame {
        display: block;
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
    let sequenceIndex = useRef(0);
    let animationRef = useRef();

    function update(action) {

        if(containerRef.current === null) return

        if(action === 'forward') {
            Array.from(containerRef.current.children)[Math.round(sequenceIndex.current - 1)]?.classList.remove('show-frame')
        } else {
            Array.from(containerRef.current.children)[Math.round(sequenceIndex.current + 1)]?.classList.remove('show-frame')
        }

        Array.from(containerRef.current.children)[Math.round(sequenceIndex.current)]?.classList.add('show-frame')
    }

    useEffect(() => {
        Array.from(containerRef.current.children)[0].classList.add('show-frame')
    }, [])

    useEffect(() => {
        if(hoveredIndex === index) {
            clearInterval(animationRef.current)
            animationRef.current = setInterval(() => {
                sequenceIndex.current += 1;
                if(sequenceIndex.current === 6) {
                    return clearInterval(animationRef.current)
                }
                update('forward');
            }, 50)

        } 
        else if(sequenceIndex.current > 0) {
            clearInterval(animationRef.current)
            animationRef.current = setInterval(() => {
                sequenceIndex.current -= 1;
                if(sequenceIndex.current === 0) {
                    return clearInterval(animationRef.current)
                }
                update('back');
            }, 50)
        }
    }, [hoveredIndex])

    return (
        <Container>
            <Placeholder>
                <Image src={data[0]} priority={true} />
            </Placeholder>
            <InnerContainer ref={containerRef}>
                {
                    data.map(item => <img src={item.src}  />)
                }
            </InnerContainer>
        </Container>
    )
}