import { useState } from 'react'
import styled from 'styled-components'

import Praise from '../praise'
import Reward from './reward'
import More from './more'
import Next from './next-round'

const Container = styled.div`
    margin: 200px 0 0 0;
    // overflow: hidden;

    @media(max-width: 989px) {
        margin: 120px 0 0 0;
    }
`

const RowOne = styled.div``


const RowTwo = styled.div`
    margin-bottom: 100px;

    @media(min-width: 990px) {
        display: flex;
        justify-content: center;
        flex-direction: row;
        height: calc(100vh - 130px);
        margin-top: 130px;
        margin-bottom: 0;

        > div {
            margin-left: 20px;
            margin-right: 20px;
        }
    }


    @media(max-width: 989px) {
        padding: 0 var(--margin);
    }
`

const RewardWrapperMobile = styled.div`
    margin-top: 80px;
    @media(min-width: 990px) {
        display: none;
    }
`



export default function Component({ data }) {
    let [unlocked, setUnlocked] = useState(false);

    return (
        <Container>
            <RowOne>
                <Praise data={data} unlock={() => setUnlocked(true)} />
            </RowOne>
            {
                unlocked ?
                <RowTwo>
                    <RewardWrapperMobile>
                        <Reward data={data} />
                    </RewardWrapperMobile>
                    <More data={data} />
                    <Next data={data} />
                </RowTwo>
                :
                null
                
            }
        </Container>
    )
}