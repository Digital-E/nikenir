import { useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    #wave {
        position:relative;
        text-align:center;
        width:30px;
        height:20px;
        margin-left: auto;
        margin-right: auto;

        .dot {
            display:inline-block;
            width:2px;
            height:2px;
            // border-radius:50%;
            margin-right:2px;
            background:#303131;
            // animation: wave 1.3s linear infinite;
            animation: wave 1.5s linear infinite;

            &:nth-child(1) {
                // animation-delay: -1.1s;
                animation-delay: 0s;
            }

            &:nth-child(2) {
                // animation-delay: -1.1s;
                animation-delay: 0.5s;
            }

            &:nth-child(3) {
                // animation-delay: 2s;
                animation-delay: 1s;
            }
        }
    }

    @keyframes wave {
        0%, 60%, 100% {
            transform: initial;
        }

        30% {
            transform: translateY(-4px);
        }
    }
`


export default function Component({}) {
    let containerRef = useRef()


    return (
        <Container>
            <div id="wave">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </Container>
    )
}