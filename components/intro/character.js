import styled from 'styled-components'

import Bubble from './bubble'

import Image from '../image'

const Container = styled.div`
    position: absolute;
    top: ${props => props.data.desktop.y}%;
    left: ${props => props.data.desktop.x}%;
    width: ${props => props.data.desktop.width}px;

    @media(max-width: 989px) {
        top: ${props => props.data.mobile.y}%;
        left: ${props => props.data.mobile.x}%;
        width: ${props => props.data.mobile.width}px; 
    }
`;




const Component = ({ data, index, bubbles, bubblesDisplayArray }) => {


    return (          
        <Container data={data}>         
            <Image src={data.src} priority={true} />
            <Bubble data={data} index={index} bubbles={bubbles} bubblesDisplayArray={bubblesDisplayArray} />
        </Container>
    )
}

export default Component

