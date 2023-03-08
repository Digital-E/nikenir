import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from "framer-motion"
import styled from 'styled-components'

const Container = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(50% - calc(var(--margin) * 2 - 8px));
    padding-bottom: calc(50% - calc(var(--margin) * 2 - 6px));
    margin: 0 calc(var(--margin) / 2);
    border: 1px dashed #1A1A1A;
    border-radius: 27px;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;

    * {
        cursor: pointer;
    }
`

const Title = styled.h3`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    margin: 0;
    padding: var(--padding);
    text-transform: uppercase;
    text-align: center;
`

export default function Component({ data, index, allItems, hasClicked, hasInteracted, isDragging, mouseOver }) {

    return (
        <Container
            onPointerEnter={() => mouseOver(index)}
            onPointerLeave={() => mouseOver(null)}
            // onPointerEnter={() => console.log("enter")}
            // onPointerLeave={() => console.log("leave")}
        >
            <Title>{data.title}</Title>
        </Container>
    )
}