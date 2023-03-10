import styled from 'styled-components'

import Praise from '../praise'
import Reward from './reward'
import More from './more'
import Next from './next-round'

const Container = styled.div`
    margin: 200px 0 0 0;

    @media(max-width: 989px) {
    }
`

const RowOne = styled.div``


const RowTwo = styled.div`
    margin-bottom: 100px;

    @media(min-width: 990px) {
        display: flex;
        justify-content: center;
        flex-direction: row;
        margin-top: 130px;
        margin-bottom: 200px;

        > div {
            margin-left: 20px;
            margin-right: 20px;
        }
    }


    @media(max-width: 989px) {
        padding: 0 var(--margin);
    }
`



export default function Component({ data }) {

    return (
        <Container>
            <RowOne>
                <Praise data={data} />
            </RowOne>
            <RowTwo>
                <More data={data} />
                <Next data={data} />
            </RowTwo>
        </Container>
    )
}