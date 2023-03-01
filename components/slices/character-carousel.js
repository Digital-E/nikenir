import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Button from '../button'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    position: relative;
    overflow: hidden;
    height: 850px;
`

const Carousel = styled.div`
    outline: none !important;
`

const InnerContainer = styled.div``

const Card = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 85%;
    height: calc(850px - 300px);
    margin: 40px 10px 40px 10px;
    padding: 25px 15px;
    border-radius: 27px;
    background: ${props => props.data.background};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    cursor: pointer;

    * {
        cursor: pointer;
    }
`

const Title = styled.div`
    > h2:first-child {
        color: gray;
    }
`

const Text = styled.div`
    text-align: center;
`

const Image = styled.div`
    flex-grow: 1;
    margin-top: ${props => props.data.top}%;
    margin-left: ${props => props.data.left}%;
    width: ${props => props.data.width}%;

    img {
        width: 100%;
    }
`

const Information = styled.div`
    margin-top: 10px;
    p:first-child {
        font-size: 38px;
    }
`

const ButtonWrapper = styled.div`
    width: 85%;
    margin: 0 auto 20px auto;
`


let data = [
    {
        name: 'Theo',
        textOne: 'People Protector',
        textTwo: 'Community hero inspiring togetherness',
        img: '/images/avatars/MaxGuther_11-2.png',
        background: 'radial-gradient(101.96% 52.55% at 84.6% 50%, rgba(254, 194, 37, 0.9) 0%, rgba(255, 255, 255, 0) 76.07%)',
        width: 60,
        left: 35,
        top: -25
    },
    {
        name: 'Ivy',
        textOne: 'Climate Champion',
        textTwo: 'Planet protector empowering citizens of the world',
        img: '/images/avatars/mg_zc_03 1.png',
        background: 'radial-gradient(101.96% 52.55% at 84.6% 50%, rgba(254, 194, 37, 0.9) 0%, rgba(255, 255, 255, 0) 76.07%)',
        width: 80,
        left: 15,
        top: -20
    },
    {
        name: 'Ines',
        textOne: 'Active Activist',
        textTwo: 'Trusted coach who really listens',
        img: '/images/avatars/MaxGuther_12-2.png',
        background: 'radial-gradient(101.96% 52.55% at 84.6% 50%, rgba(254, 194, 37, 0.9) 0%, rgba(255, 255, 255, 0) 76.07%)',
        width: 45,
        left: 40,
        top: -25
    },    
]

export default function Component() {
    let gallery = useRef();
    let flickity;
    let [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            flickity = new Flickity(gallery.current, {
                prevNextButtons: false,
                pageDots: false,
                cellAlign: "center",
                percentPosition: true,
                wrapAround: true,
            })

            flickity.on('change', (cellIndex) => {
                setSelectedIndex(cellIndex)
            })
        }, 0)
    }, [])
    
    return (
        <Container className='max-width'>
            <Carousel ref={gallery}>
                {
                    data.map(item => 
                        <Card data={item}>
                            <Title>
                                <h2>Play <br/> With:</h2>
                                <h2>{item.name}</h2>
                            </Title>
                            <Image data={item}><img src={item.img} /></Image>
                            <Information>
                                <p className='palatino'>{item.textOne}</p>
                                <p className='body-large'>{item.textTwo}</p>
                            </Information>
                        </Card>
                        )
                }
            </Carousel>
            <ButtonWrapper>
                <Button>Choose {data[selectedIndex].name}</Button>
            </ButtonWrapper>
        </Container>
    )
}