import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 360px;
    height: 210px;
    border-radius: 20px;
    background: ${props => props.gradient};
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    transform: perspective(400px) rotateX(325deg);
    transform-style: preserve-3d;
    margin-top: -105px;
    // mask-image: linear-gradient(to bottom, black 90%, transparent 100%);

    transition: transform var(--transition-in), height 1s 0s, opacity 1s 0.5s, margin-top 1s 0s;

    :hover {
        transform: perspective(400px) rotateX(325deg) translateY(-10px);
    }

    &.hide {
        transition: height 1s 0.3s, opacity 0.5s, margin-top 1s 0.4s;
        height: 0;
        opacity: 0;
        margin-top: 0px;
    }

    &.has-interacted .close-button {
        pointer-events: none;
    }

    .tick, &.has-interacted .hide .tick  {
        display: none;
    }

    &.has-interacted .close {
        display: none;
    }

    &.has-interacted .tick {
        display: block;
    }
`

const Close = styled.div`
    position: absolute;
    width: 20px;
    left: 0;
    top: 0;
    margin: 30px;
    cursor: pointer;

    img {
        width: 100%;
    }
`

const Title = styled.h3`
    text-transform: uppercase;
    text-align: center;
    margin: 30px 70px 10px 70px;
    width: 60%;
    cursor: default;
`

const Image = styled.div`
    width: 40%;

    img {
        width: 100%;
    }
`


export default function Component({ data, index, allItems, hasClicked, hasInteracted }) {


    return (
        <Container gradient={data.gradient} className={allItems[index].clicked ? `hide` : `show ${hasInteracted && 'has-interacted'}`}>
            <Close onClick={() => {hasClicked(index)}} className='close-button'>
                <img className='close' src='images/cross-cards/close.svg' />
                <img className='tick' src='images/cross-cards/tick.svg' />
            </Close>
            <Title>{data.title}</Title>
            <Image>
                <img src={data.img} />
            </Image>
        </Container>
    )
}