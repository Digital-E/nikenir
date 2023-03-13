import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'


import Share from '../../share'


const Container = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: white;
    padding: 60px 15px 45px 15px;   

    @media(max-width: 989px) {
        padding: 60px 15px 60px 15px;
    }

    @media(min-width: 990px) {
        min-width: 425px;
    }
`

const Image = styled.div`
    width: 225px;
    
    img {
        width: 100%;
    }
`
const Text = styled.p`
    text-align: center;
    width: 80%;
    margin: var(--margin) 0;
`

const Title = styled.h3`
    margin: var(--margin) 0;

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


export default function Component({ data }) {
    let containerRef = useRef()
    let isInView = useInView(containerRef, {
        margin: "0px 0px -50% 0px",
        once: true
    })

    return (
        <Container 
            initial='hide'
            variants={variants}
            animate={isInView ? 'show' : 'hide'}
            ref={containerRef} 
            className='container-background max-width center'
        >
            <ShareWrapper>
                <Share />
            </ShareWrapper>
            <Image>
                <img src={data.complete.reward.image} />
            </Image>
            <Text className='palatino-medium'>{data.complete.reward.text}</Text>
            <Title>{data.role}</Title>
        </Container>
    )
}