import styled from 'styled-components'


// Components
import Intro from './character-intro'


const Container = styled.div`
    position: relative;
    height: 850px;
`


export default function Component({ data }) {

    
    return (
        <Container>
            <Intro data={data} />
        </Container>
    )
}