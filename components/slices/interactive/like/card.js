import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useAnimationControls } from "framer-motion"
import styled from 'styled-components'

const Image = styled.div`
    position: absolute;
    left: calc(var(--margin) / 2);
    bottom: calc(var(--margin) / 2);
    width: var(--margin);
    height: var(--margin);

    img {
        position: absolute;
        width: 100%;
    }

    img:nth-child(2) {
        opacity: 0;
        transform: scale(0);
        transition: transform 0.5s, opacity 0.3s;
    }
`

const Container = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(50% - var(--margin));
    margin: 0 calc(var(--margin) / 4);
    border: 1px dashed #1A1A1A;
    border-radius: 27px;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
    padding-bottom: calc(50% - var(--margin) - 2px);

    * {
        cursor: pointer;
    }

    &.liked ${Image} {
        img:nth-child(2) {
            opacity: 1;
            transform: scale(1.5);
        }
    }
`

const Title = styled.h3`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    padding: var(--padding);
`


export default function Component({ data, index, allItems, hasClicked, hasInteracted }) {


    const controls = useAnimationControls();

    let clicked = (e) => {
        controls.start({ scale: 2 })
        setTimeout(() => {
            controls.start({ scale: 1.02 })
            hasClicked(e, index);
        }, 50)
    }


    return (
        <Container 
            onClick={(e) => {clicked(e)}} 
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileHover={{scale: 1.02}}
            animate={controls}
            className={allItems[index].clicked &&  hasInteracted ? `liked` : ``}
            >
            <Title>{data.title}</Title>
            <Image>
                <img src='/images/like/heart.svg' />
                <img src='/images/like/heart.png' />
            </Image>
        </Container>
    )
}