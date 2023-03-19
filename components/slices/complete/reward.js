import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'


import Share from '../../share'


const Container = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: white;
    padding: 60px 15px;   

    @media(max-width: 989px) {
        padding: 60px 15px 60px 15px;
    }

    @media(min-width: 990px) {
        min-width: 425px;
    }
`

const Image = styled.div`
    width: 225px;
    margin-bottom: 25px;
    
    img {
        display: block;
        height: 211px;
        margin: 0 auto;
    }
`
const Text = styled.p`
    margin: 10px 0 0 0;    
    text-align: center;
    width: 80%;
`

const Title = styled.h2`
    text-align: center;
    margin: 0;

    @media(max-width: 989px) {
        margin: 0;
    }
`

const ShareWrapper = styled.div`
    position: absolute;
    top: var(--padding);
    right: var(--padding);
`

let variants = {
    'show': {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3
        }
    },
    'hide': {
        opacity: 0,
        y: 20
    }
}


export default function Component({ data, share }) {
    let containerRef = useRef()
    let imageRef = useRef()
    let animationRef = useRef()

    let isInView = useInView(containerRef, {
        margin: "0px 0px 0px 0px",
        once: true
    })

    useEffect(() => {
        if(isInView) {
            animationRef.current = gsap.fromTo(imageRef.current.children[0],{scale: 1}, {scale: 1.05 , duration: 1.5, yoyo: true, ease: "power2.inOut", repeat: -1});
        } else {
            animationRef.current?.kill()
        }
    }, [isInView])
    

    return (
        <Container 
            ref={containerRef}
            className='container-background max-width center'
        >
            {share === false ?
                null
                :
                <ShareWrapper>
                    <Share link={data.complete.reward.link} />
                </ShareWrapper>
            }
            <Image ref={imageRef}>
                <img src={data.complete.reward.image} />
            </Image>
            <Title>{data.complete.reward.title}</Title>
            <Text className='palatino-small'>{data.complete.reward.text}</Text>
        </Container>
    )
}