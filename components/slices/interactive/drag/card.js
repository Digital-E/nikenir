import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from "framer-motion"
import styled from 'styled-components'

const Container = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 170px;
    margin: 0 15px;
    border: 1px dashed #1A1A1A;
    border-radius: 27px;
    cursor: pointer;
    overflow: hidden;

    * {
        cursor: pointer;
    }
`

const Title = styled.h3`
    text-transform: uppercase;
    text-align: center;
    padding: 30px;
`

export default function Component({ data, index, allItems, hasClicked, hasInteracted, isDragging, mouseOver }) {

    const onDragOver = (e) => {
        // hasClicked(e, index)
    };

    useEffect(() => {

    }, [isDragging])

    return (
        <Container
            onMouseEnter={() => mouseOver(index)}
            onMouseLeave={() => mouseOver(null)}
        >
            <Title>{data.title}</Title>
        </Container>
    )
}