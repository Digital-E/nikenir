
import styled from 'styled-components'

import TextCarousel from './text-carousel'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.colourOne} !important;
    margin: 0 auto;
`

const RowOne = styled.div`
    position: relative;
    display: flex;
`

const RowTwo = styled.div`
`

const ColOne = styled.div``

const Avatar = styled.div`
    width: 70px;
    margin-top: -10px;

    img {
        width: 100%;
    }
`

const ColTwo = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    left: 0;
`

const Title = styled.h3`
    max-width: 60%;
    text-align: center;

    @media(max-width: 989px) {
        max-width: 49%;
    }
`


const Text = styled.p``

const TextCarouselWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: var(--margin);
    border-radius: 20px;
    background: ${props => props.colourTwo} !important;

    > p:nth-child(1) {
        margin-bottom: 5px;
    }
`


export default function Component({ item, data, selectedIndex }) {

    return (
        <Container className='max-width container-background' colourOne={data.colourOne}>
        <RowOne>
            <ColOne>
                <Avatar>
                    <img src={data.avatar}/>
                </Avatar>
            </ColOne>

            <ColTwo>
                <Title>{item.information[selectedIndex]?.title}</Title>
            </ColTwo>
        </RowOne>

        <RowTwo>
            <Text className='body-large'>
                {item.information[selectedIndex]?.text[0]}
            </Text>
            <TextCarouselWrapper className='container-background' colourTwo={data.colourTwo}>
                <Text className='palatino-x-small'>Did you know ?</Text>
                <TextCarousel data={item.information[selectedIndex]?.text} />
                {/* <Text className='body-large'>{item.information[selectedIndex]?.text[1]}</Text> */}
            </TextCarouselWrapper>
        </RowTwo>
        </Container>
    )
}