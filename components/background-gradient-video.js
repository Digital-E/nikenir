import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;

    video {
        position: absolute;
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`

let data = [
    {src: '/videos/A_Gradient_Blue_2560x2560px.mp4'},
    {src: '/videos/A_Gradient_Orange_2560x2560px.mp4'},
    {src: '/videos/A_Gradient_Purple_2560x2560px.mp4'}
]


export default function Component() {
    let backgroundIndexRef = useRef(0);
    let containerRef = useRef();
    let videoRef = useRef();

    let increment = () => {
            if(backgroundIndexRef.current === 2) {
                backgroundIndexRef.current = 0
            } else {
                backgroundIndexRef.current += 1
            }
            
            videoRef.current.src = data[backgroundIndexRef.current].src
    }
    
    useEffect(() => {
        document.querySelector('body').addEventListener('click', increment)
    }, [])

    return (
        <Container ref={containerRef}>
            <video muted autoPlay playsInline loop ref={videoRef} src={data[0].src}></video>
        </Container>
    )
}