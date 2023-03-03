import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'


// Components
import Intro from './intro'


const Container = styled.div`
    position: relative;
    height: 850px;
`

let data = [
    {
        character: {
            intro: {
                title: 'A SOCIETY IS ONLY AS CREATIVE AND HAPPY AS IT IS DIVERSE AND INCLUSIVE.'
            }
        }
    }
]


export default function Component() {

    
    return (
        <Container>
            <Intro data={data[0]} />
        </Container>
    )
}