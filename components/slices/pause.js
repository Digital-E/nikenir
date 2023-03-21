import styled from 'styled-components'

import AvatarSpeech from './avatar-speech/index'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto 0 auto;
    height: calc(100vh - 55px);

    @media(max-width: 989px) {
        height: calc(100vh - 120px);
    }
`

const Title = styled.h2`
    margin: 105px var(--margin) 0 var(--margin);
`

const TitleWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
`


const AvatarSpeechWrapper = styled.div`
    width: fit-content;

    @media(min-width: 990px) {
        margin: 0 auto;
    }
`


export default function Component({ data }) {

    return (
        <Container>
            <TitleWrapper className='max-width-3'>
                <Title>{data.pause.title}</Title>
            </TitleWrapper>
            <AvatarSpeechWrapper>
                <AvatarSpeech avatar={data.avatar} data={data} text={data.pause.text} />
            </AvatarSpeechWrapper>
        </Container>
    )
}