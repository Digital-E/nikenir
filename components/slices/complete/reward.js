import styled from 'styled-components'

import Share from '../../share'


const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: white;
    padding: 60px 15px;
`

const Image = styled.div`
    width: 225px;
    
    img {
        width: 100%;
    }
`
const Text = styled.p`
    text-align: center;
    width: 80%;
    margin: var(--margin) 0 calc(var(--margin) / 2) 0;
`

const Title = styled.h3`

`

const ShareWrapper = styled.div`
    position: absolute;
    top: var(--padding);
    right: var(--padding);
`



export default function Component({ data }) {

    return (
        <Container className='container-background max-width center'>
            <ShareWrapper>
                <Share />
            </ShareWrapper>
            <Image>
                <img src={data.complete.reward.image} />
            </Image>
            <Text className='palatino-medium'>{data.complete.reward.text}</Text>
            <Title>{data.role}</Title>
        </Container>
    )
}