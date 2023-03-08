import styled from 'styled-components'

import Praise from '../praise'
import Reward from './reward'
import More from './more'
import Next from './next-round'

const Container = styled.div`
    margin-bottom: 200px;
`

const RowOne = styled.div``


const RowTwo = styled.div`
    @media(min-width: 990px) {
        display: flex;
        justify-content: center;
        flex-direction: row;

        > div {
            margin-left: 20px;
            margin-right: 20px;
        }
    }
`


export default function Component({ data }) {

    return (
        <Container>
            <RowOne>
                <Praise data={data} />
                <Reward data={data} />
            </RowOne>
            <RowTwo>
                <More data={data} />
                <Next data={data} />
            </RowTwo>
        </Container>
    )
}