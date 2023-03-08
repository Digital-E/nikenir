import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import styled from 'styled-components'

import Button from '../../button'

let Flickity = null

if(typeof window !== 'undefined') {
    Flickity = require('flickity');
    require('flickity-fade');
}


const Container = styled(motion.div)`
    width: 100%;
    background: ${props => props.colourOne} !important;
`;

const Number = styled.div``

const Carousel = styled.div`
    outline: none !important;

    .flickity-slider {
        transform: none !important;
    }

    .flickity-page-dots {
        bottom: -95px;
    }

    .flickity-page-dots .dot {
        width: 8px;
        height: 8px;
        margin: 0 5px;
    }

`

const Slide = styled.div`
    width: 100%;

    transform: none !important;
    opacity: 0;
    // transition: opacity 0.7s 0s;
    transition: 0;

    &.is-selected {
        opacity: 1;
        // transition: opacity 0.7s 0.5s;
        transition: 0;
    }
`

const Text = styled.p`
    margin: 0;
`






const Component = ({ data }) => {
    let gallery = useRef();
    let flickity = null;
    let [selectedIndex, setSelectedIndex] = useState(1);

    useEffect(() => {
        if(flickity !== null) return

        flickity = new Flickity(gallery.current, {
            prevNextButtons: false,
            autoPlay: 3000,
            pageDots: false,
            cellAlign: "center",
            percentPosition: true,
            wrapAround: true,
            // fade: true,
            resize: true
        })


        flickity.on('staticClick', (cellIndex) => {
            flickity.next()
        })

        flickity.on('change', (cellIndex) => {
            setSelectedIndex(cellIndex + 1)
        })
    }, [])

    return (
        <Container colourOne={data.colourOne}>
            {/* <Number className='palatino-x-small'>{selectedIndex} / {data.complete.more.text.length}</Number> */}
            <Carousel ref={gallery}>
                {data.map(item => 
                <Slide>
                    <Text className='body-large'>{item}</Text>
                </Slide>
                )}
            </Carousel>
        </Container>
    )
}

export default Component

