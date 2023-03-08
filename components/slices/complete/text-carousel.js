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
    padding: 20px 15px 60px 15px;
    margin-top: calc(var(--margin) * 2);

    @media(max-width: 989px) {
        margin-top: var(--margin);
    }
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

    @media(max-width: 989px) {
        .flickity-page-dots {
            bottom: -75px;
        }
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
    margin: var(--margin) 0 calc(var(--margin) * 2) 0;
`

const ButtonWrapper = styled.div`
    button {
        box-shadow: none;
    }

    @media(max-width: 989px) {
        margin: 0 10px;
    }
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
            pageDots: true,
            cellAlign: "center",
            percentPosition: true,
            wrapAround: true,
            fade: false,
            resize: true
        })


        flickity.on('staticClick', (e, cellIndex) => {
            if(e.offsetX < gallery.current.getBoundingClientRect().width / 2) {
                flickity.previous()
            } else {
                flickity.next()
            }
        })

        flickity.on('change', (cellIndex) => {
            setSelectedIndex(cellIndex + 1)
        })
    }, [])

    return (
        <Container className='container-background' colourOne={data.colourOne}>
            <Number className='palatino-x-small'>{selectedIndex} / {data.complete.more.text.length}</Number>
            <Carousel ref={gallery}>
                {data.complete.more.text.map(item => 
                <Slide>
                    <Text className='body-x-large'>{item}</Text>
                </Slide>
                )}
            </Carousel>
            <ButtonWrapper>
                <Button>Read More</Button>
            </ButtonWrapper>
        </Container>
    )
}

export default Component

