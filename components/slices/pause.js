import styled from 'styled-components'

import AvatarSpeech from './avatar-speech'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 40px auto 0 auto;

    // @media(max-width: 989px) {
    //     height: 100vh;
    // }
`

const Title = styled.h2`
    margin: 0 15px 100px 15px;
`

const AvatarSpeechWrapper = styled.div`
    @media(min-width: 990px) {
        width: fit-content;
        margin: 0 auto;
    }
`


export default function Component({ data }) {

    return (
        <Container className='max-width-3'>
            <Title>{data.pause.title}</Title>
            <AvatarSpeechWrapper>
                <AvatarSpeech data={data} text={data.pause.text} />
            </AvatarSpeechWrapper>
        </Container>
    )
}