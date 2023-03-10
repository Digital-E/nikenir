import styled from 'styled-components'

import Ticker from './ticker'
import AvatarSpeech from '../avatar-speech'

import Reward from '../complete/reward'

const Container = styled.div`
    position: relative;
    height: 100%;
    overflow: hidden;
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
        height: fit-content;
        width: fit-content;
        margin-left: -10vw;

        // > div {
        //     margin-left: -15vw;
        //     margin-right: 15vw;
        // }

        > div:nth-child(1) > div:nth-child(3) {
            width: calc(100% - 10vw);
            left: 75%;
            right: auto;
        }

        // img {
        //     max-width: 30vw;
        // }
    }
`

const RewardWrapper = styled.div`

    @media(max-width: 989px) {
        padding-top: 0;
        margin: calc(var(--margin) * 4) var(--margin) 0 var(--margin);
    }

    @media(min-width: 990px) {
        margin-left: 205px;
        min-width: 425px;

        > div {
            margin: 0;
        }
    }
`


const StickyWrapper = styled.div`
    margin: 100px 0 0 0;

    @media(min-width: 990px) {
        margin: 0 auto;
        display: flex;
        width: 100%;
        max-width: 890px;
    }
`




export default function Component({ data }) {

    
    return (
        <Container>
            <InnerContainer>
                <Text><span className='large-headline'>{data.complete.praise.title}</span></Text>
                <StickyWrapper>
                    <AvatarSpeechWrapper>
                        <AvatarSpeech data={data} text={data.complete.praise.text}/>
                    </AvatarSpeechWrapper>
                    <RewardWrapper>
                        <Reward data={data} />
                    </RewardWrapper>
                </StickyWrapper>
                <Ticker data={data} />
            </InnerContainer>
        </Container>
    )
}