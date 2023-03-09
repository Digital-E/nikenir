import styled from 'styled-components'

import TextCarousel from './text-carousel'
import ReadMore from './read-more'


const Container = styled.div`
    margin-top: calc(var(--margin) * 4);
`

const Title = styled.h2`
    @media(min-width: 990px) {
        font-size: 50px;
    }
`


export default function Component({ data }) {

    return (
        <Container className='max-width center'>
            <Title>{data.complete.more.title}</Title>
            <TextCarousel data={data} />
            <ReadMore data={data} />
        </Container>
    )
}