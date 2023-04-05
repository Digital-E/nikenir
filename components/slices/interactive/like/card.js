import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useAnimationControls } from "framer-motion"
import styled from 'styled-components'

const Image = styled.div`
    position: absolute;
    left: calc(var(--margin));
    bottom: calc(var(--margin));
    width: calc(var(--margin) * 2);
    height: calc(var(--margin) * 2);

    img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    img:nth-child(2) {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transform: scale(0);
        transition: transform 0.5s, opacity 0.3s;
    }
`

const Container = styled(motion.button)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(50% - calc(var(--margin) * 2 - 8px));
    padding-bottom: calc(50% - calc(var(--margin) * 2 - 6px));
    margin: 0 calc(var(--margin) / 2);
    background: transparent;

    * {
        cursor: pointer;
    }

`

const InnerContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px dashed #1A1A1A;
    border-radius: 27px;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;

    &.liked ${Image} {
        img:nth-child(2) {
            opacity: 1;
            transform: scale(1.3);
        }
    }
`


const ImageTwo = styled.div`
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;

    img {
        width: 100%;
        opacity: 0;
        transform: scale(0);
        transition: 0.5s;
    }

    &.liked img {
        opacity: 1;
        transform: scale(1.3);
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

export default function Component({ data, index, allItems, hasClicked, hasInteracted, selectedIndex }) {

    const controls = useAnimationControls();

    let clicked = (e) => {
        controls.start({ scale: 1.3 })
        setTimeout(() => {
            controls.start({ scale: 1.02 })
            hasClicked(e, index);
        }, 50)
    }


    return (
        <Container 
            aria-label='select a box'
            aria-checked={index === selectedIndex ? 'true' : 'false'}
            onClick={(e) => {clicked(e)}} 
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileHover={{scale: 1.02}}
            animate={controls}
            >
            <InnerContainer className={allItems[index].clicked && hasInteracted ? `liked` : ``}>
                <Title>{data.title}</Title>
                <Image aria-hidden="true">
                    <img aria-hidden="true" src={`${process.env.basePath}/images/like/heart.svg`} />
                    <img aria-hidden="true" src={`${process.env.basePath}/images/like/heart-fill.svg`} />
                </Image>
            </InnerContainer>
            <ImageTwo
                aria-hidden="true"
                className={allItems[index].clicked && hasInteracted ? `liked` : ``}
                // animate={allItems[index].clicked && hasInteracted ? 'show' : 'hide'}
                // variants={imageVariants}
            >
                <img aria-hidden="true" src={data.img} />
            </ImageTwo>
        </Container>
    )
}