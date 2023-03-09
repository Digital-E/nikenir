import { useState } from 'react'
import styled from 'styled-components'

import Intro from './character-intro'
import Question from './question'
import Like from './interactive/like'
import Drag from './interactive/drag'
import TapSpam from './interactive/tap-spam-four'
import Pause from './pause'
import Complete from './complete'


const Container = styled.div`
    > div:first-child {
        margin-top: 120px;
    }

    @media(max-width: 989px) {
        > div:first-child {
            margin-top: 105px;
        }
    }
`


let slice = (item, data) => {
    switch(item.type) {
        case 'question':
            return <Question item={item} data={data} />;
        case 'like':
            return <Like item={item} data={data} />;
        case 'drag':
            return <Drag item={item} data={data} />;    
        case 'tap spam':
            return <TapSpam item={item} data={data} />;                     
        default:
            return null
    }
}

export default function Component({ data }) {

    return (
        <>
        <Intro data={data} />
        <Container>
            {data.slices.map(item => slice(item, data))}
            <Pause data={data} />
            <Complete data={data} />
        </Container>
        </>
        )
}
