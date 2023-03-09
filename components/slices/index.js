import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { store } from '../../store'

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
    // Context
    const context = useContext(store);
    const { state, dispatch } = context; 

    let [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        if((state.progress === state.questionCount) && state.questionCount !== 0) {
            setUnlocked(true)
        }
    }, [state])

    return (
        <>
        <Intro data={data} />
        <Container>
            {data.slices.map(item => slice(item, data))}
            {
                unlocked ?
                <Complete data={data} />
                :
                <Pause data={data} />
            }
        </Container>
        </>
        )
}
