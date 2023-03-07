import styled from 'styled-components'

import Button from '../../button'
import AvatarCard from '../avatar-card'

const Container = styled.div`
    margin-top: calc(var(--margin) * 4);
`;

const Title = styled.h2`
    margin-bottom: calc(var(--margin) * 2);

    @media(max-width: 989px) {
        margin-bottom: var(--margin);
    }
`


const Component = ({ data }) => {

    return (
        <Container className='mtb max-width'>
            <Title>{data.complete.continue.title}</Title>
            <AvatarCard data={data} item={data.complete.continue} />
            <Button colour={data.colourOne}>Let's play!</Button>
        </Container>
    )
}

export default Component

