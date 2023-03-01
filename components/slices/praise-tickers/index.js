import styled from 'styled-components'

import Ticker from './ticker'

const Container = styled.div`
    position: relative;
`

const InnerContainer = styled.div``

const Text = styled.div`
    text-align: center;
`

const Image = styled.div`
    img {
        width: 100%;
    }
`


let data = {
    tickerText: 'A spring in your step',
    message: 'Well done',
    img: '/images/avatars/mg_fr_05 1.png',
    background: 'rgba(253, 216, 0, 0.7)'
}

export default function Component() {

    
    return (
        <Container className='max-width'>
            <Ticker data={data} />
            <InnerContainer>
                <Text><span className='large-headline'>{data.message}</span></Text>
                <Image><img src={data.img}/></Image>
            </InnerContainer>
            <Ticker data={data} secondary={true}/>
        </Container>
    )
}