import styled from 'styled-components'

import ButtonLink from '../../button-link'
import AvatarCard from '../avatar-card'

const Container = styled.div`
    margin-top: calc(var(--margin) * 4);

    > div:nth-child(2) {
        margin-bottom: var(--margin);
    }

    button {
        box-shadow: none;
    }
`;

const Title = styled.h2`
    margin-bottom: calc(var(--margin) * 2);

    @media(max-width: 989px) {
        margin-bottom: var(--margin);
    }

    @media(min-width: 990px) {
        font-size: 50px;
    }
`


const Component = ({ data }) => {
    return (
        <Container className='mtb max-width'>
            <Title>{data.complete.continue.title}</Title>
            <AvatarCard data={data.complete.continue.next} item={data.complete.continue} />
            <ButtonLink href={data.complete.continue.next.link} colour={data.colourOne}>Let's play!</ButtonLink>
        </Container>
    )
}

export default Component

