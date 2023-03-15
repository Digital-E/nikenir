import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'

import AvatarCard from './avatar-card'


const Container = styled.div`
    margin: 40px auto 0 auto;

    @media(max-width: 989px) {
        margin: 80px auto 0 auto; 
        padding: 0 var(--margin);
    }
`

const Number = styled.p`
`

const Title = styled.h2`
    @media(min-width: 990px) {
        font-size: 50px;
    }
`

const AvatarCardWrapper = styled(motion.div)``


let variants = {
    'show': {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: 0.1
        }
    },
    'hide': {
        opacity: 0,
        y: 20
    }
}

export default function Component({ item, data }) {
    let cardRef = useRef()
    let isInView = useInView(cardRef, {
        margin: "0px 0px -200px 0px"
    })


    return (
        <Container className='margin max-width'>
            <Number className='palatino-small'>{item.number}</Number>
            <Title>{item.title}</Title>
            <AvatarCardWrapper
                variants={variants} 
                initial='hide' 
                animate={isInView ? 'show' : 'hide'}
                ref={cardRef}
            >
                <AvatarCard item={item} data={data} />
            </AvatarCardWrapper>
        </Container>
    )
}