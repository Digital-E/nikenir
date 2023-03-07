import styled from 'styled-components'

import Praise from '../praise'
import Reward from './reward'
import More from './more'
import Next from './next-round'

const Container = styled.div``


export default function Component({ data }) {

    return (
        <Container>
            <Praise data={data} />
            <Reward data={data} />
            <More data={data} />
            <Next data={data} />
        </Container>
    )
}