import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import AvatarCard from './avatar-card'


const Container = styled.div`
    margin-top: 140px;
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