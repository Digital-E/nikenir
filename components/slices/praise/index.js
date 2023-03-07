import styled from 'styled-components'

import Ticker from './ticker'
import AvatarSpeech from '../avatar-speech'

const Container = styled.div`
    position: relative;
    height: 100%;
    overflow: hidden;

    @media(max-width: 989px) {
        height: 100vh;
    }
`

const InnerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    z-index: 0;
`

const Text = styled.div`
    text-align: center;
    margin: 0 var(--margin);

    span {
        font-size: 120px;
    }

    @media(min-width: 990px) {
        span {
            font-size: 18vw;
        }
    }
`

const AvatarSpeechWrapper = styled.div`
    @media(min-width: 990px) {
        width: fit-content;
        margin: 0 auto;
    }
`



export default function Component({ data }) {

    
    return (
        <Container>
            <InnerContainer>
                <Text><span className='large-headline'>{data.complete.praise.title}</span></Text>
                <AvatarSpeechWrapper>
                    <AvatarSpeech data={data} text={data.complete.praise.text}/>
                </AvatarSpeechWrapper>
            </InnerContainer>
            <Ticker data={data} />
        </Container>
    )
}