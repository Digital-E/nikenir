import { useEffect, useState, useRef } from 'react'
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
`


export default function Component({ item, data }) {

    return (
        <Container className='margin max-width'>
            <Number className='palatino-small'>{item.number}</Number>
            <Title>{item.title}</Title>
            <AvatarCard item={item} data={data} />
        </Container>
    )
}