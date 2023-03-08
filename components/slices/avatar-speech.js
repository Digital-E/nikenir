
import styled from 'styled-components'



const Container = styled.div`
    position: relative;
    display: flex;
    z-index: 1;

    svg {
        fill:#fff;
        fill-opacity:0.6000000238418579;
        backdrop-filter: blur(10px);
        height: 0;
    }
`

const Image = styled.div`
    img {
        width: 30vw;
        transform: rotateY(180deg);
    }

    @media(max-width: 989px) {
        width: 50%;
        
        img {
            width: 100%;
        }
    }
`

const Bubble = styled.div`
    position: absolute;
    height: fit-content;
    left: 40%;
    margin-right: 15px;
    bottom: 95%;
    

    @media(min-width: 990px) {
        width: 100%;
        left: auto;
        right: -75%;
        margin-right: auto;
    }
`

const BubbleInner = styled.div`
    padding: var(--padding);
    border-radius: var(--border-radius) var(--border-radius) var(--border-radius) 0;
    background: var(--background);
    backdrop-filter: blur(10px);
`


const Text = styled.p``

const Tail = styled.div`
    position: absolute;
    bottom: -30.1px;
    left: 0;
    height: 30px;
    width: 30px;
    background: rgb(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    clip-path: url(#clipPath);
    //clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
`



export default function Component({ data, text }) {

    return (
        <Container>
            <Image><img src={data.avatar} /></Image>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.73 28.05">
                <clipPath id="clipPath">
                    <path d="M37.73.33a27,27,0,0,0-21.8,11.12L3.62,28.38A2,2,0,0,1,0,27.2V0"/>
                    {/* <circle cx="40" cy="35" r="35" /> */}
                </clipPath>
            </svg>
            <Bubble>
                <BubbleInner>
                    <Text>{text[0]}</Text>
                </BubbleInner>
                <Tail />
            </Bubble>
        </Container>
    )
}