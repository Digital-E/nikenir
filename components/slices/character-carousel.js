import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

import { motion } from 'framer-motion'

import ButtonLink from '../button-link'
import Link from '../link'
import Image from '../image'

// Images
import characterOne from '../../public/images/avatars/carousel/ines.png'
import characterTwo from '../../public/images/avatars/carousel/ivy.png'
import characterThree from '../../public/images/avatars/carousel/theo.png'

import gradientOne from '../../public/images/carousel-gradients/gradient1.png'
import gradientTwo from '../../public/images/carousel-gradients/gradient2.png'
import gradientThree from '../../public/images/carousel-gradients/gradient3.png'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    overflow: hidden;
    width: 100%;

    @media(max-width: 989px) {
        position: relative;
        top: auto;
        left: auto;
        transform: none;
        width: 100%;
    }
`

const Carousel = styled.div`
    display: flex;
    justify-content: center;

    outline: none !important;

    @media(max-width: 989px) {
        display: block;
    }
`

const Card = styled(motion.div)`
    position: relative;
    display: flex;
    flex-basis: 28%;
    height: calc(33.333vw * 1.15);
    width: 100%;
    margin: 40px 10px 40px 10px;
    padding: 0 0 30px 0;
    border-radius: 27px;
    // background: ${props => props.data.background};
    // background: url(${props => props.data.backgroundSrc});

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    overflow: hidden;

    a {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: space-between;
        width: 100%;
    }

    transition: filter 0.7s;

    @media(min-width: 990px) {
        padding: 0  0 2.776vw 0;

        &.blur {
            filter: blur(10px);
            transition: filter 1s;
        }
    }

    * {
        cursor: pointer;
    }


    @media(max-width: 989px) {
        position: absolute;
        height: calc(50vw * 1.8);
        width: 50%;
        margin: 40px 10px 30px 10px;

        a {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    }

    @media(max-width: 768px) {
        width: 50vw;
        height: calc(50vw * 1.8);
    }

    @media(max-width: 539px) {
        position: absolute;
        height: calc(85vw * 1.5);
        width: 85%;
        margin: 40px 10px 30px 10px;

        a {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    }

    @media(max-height: 667px) and (max-width: 576px) {
        height: calc(85vw * 1.3);
    }


    @media(min-width: 989px) {
        :nth-child(1) > a > div:nth-child(4) > p:nth-child(2) {
            width: 60%;
        }

        :nth-child(2) > a > div:nth-child(4) > p:nth-child(2) {
            width: 90%;
        }

        :nth-child(3) > a > div:nth-child(4) > p:nth-child(2) {
            width: 60%;
        }
    }

    @media(max-width: 989px) {
        :nth-child(1) > a > div:nth-child(4) > p:nth-child(2) {
            width: 50%;
        }

        :nth-child(2) > a > div:nth-child(4) > p:nth-child(2) {
            width: 70%;
        }

        :nth-child(3) > a > div:nth-child(4) > p:nth-child(2) {
            width: 45%;
        }
    }
`

const Background = styled.div`
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
`


const Title = styled.div`
    position: absolute;
    left: 15px;
    top: 30px;

    > h2:first-child {
        color: gray;
    }

    h2 {
        margin: 0;
    }

    @media(min-width: 990px) {
        // left: 30px;
        // top: 25px;
        left: 2.082vw;
        top: 1.735vw;

        h2 {
            font-size: 2.91vw;
        }
    }
`

const ImageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-basis: 100%;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    left: 10%;
    bottom: ${props => props.data.bottom}%;

    img {
        width: ${props => props.data.width}%  !important;
    }


    @media(max-width: 989px) {
        left: 15%;

        img {
            width: ${props => props.data.widthMobile}%  !important;
        }
    }

    @media(max-height: 667px) and (max-width: 576px) {

        img {
            width: ${props => props.data.widthMobile - 25}%  !important;
        }
    }
`

const Information = styled.div`
    margin-top: 10px;
    flex-basis: auto;

    padding: 0px var(--margin);

    p:first-child {
        font-size: 32px;
    }

    p:last-child {
        font-size: 16px;
    }

    @media(min-width: 990px) {
        padding: 0 2.082vw;

        p:first-child {
            // font-size: 2.6372vw;
            font-size: 2.5vw;
        }

        p:last-child {
            // font-size: 1.388vw;
            font-size: 1.1vw;
        }
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 auto 20px auto;
    display: none;

    @media(max-width: 989px) {
        display: block;
        width: 50%;
        margin: 0 auto 20px auto;
    }

    @media(max-width: 540px) {
        width: 85%;
    }
`

const ButtonDesktopWrapper = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);

    @media(max-width: 989px) {
        display: none;
    }
`



let data = [
    {
        name: 'Ines',
        textOne: 'People Promoter',
        textTwo: 'Community hero inspiring togetherness',
        img: characterOne,
        link: '/people-promoter',
        background: 'radial-gradient(101.96% 52.55% at 8.6% 50%, rgba(254, 194, 37, 0.9) 0%, rgba(255, 255, 255, 1) 76.07%)',
        backgroundSrc: gradientOne,
        width: 80,
        widthMobile: 85,
        bottom: -5
    },
    {
        name: 'Ivy',
        textOne: 'Climate Champion',
        textTwo: 'Planet preserver empowering citizens to have a positive impact',
        img: characterTwo,
        link: '/climate-champion',
        background: 'radial-gradient(101.96% 52.55% at 8.6% 50%, rgba(195, 188, 236, 0.9) 0%, rgba(255, 255, 255, 1) 76.07%)',
        backgroundSrc: gradientTwo,
        width: 93,
        widthMobile: 100,
        bottom: -5
    },
    {
        name: 'Theo',
        textOne: 'Active Activist',
        textTwo: 'Trusted coach who really listens',
        img: characterThree,
        link: '/active-activist',
        background: 'radial-gradient(239.95% 126.46% at 33.97% 17.02%, rgba(2, 131, 254, 0.7) 0%, rgba(255, 255, 255, 1) 76.07%)',
        backgroundSrc: gradientThree,
        width: 85,
        widthMobile: 90,
        bottom: -3
    },    
]

export default function Component() {
    let gallery = useRef();
    let flickity = null;
    let [selectedIndex, setSelectedIndex] = useState(0);
    let [hoveredIndex, setHoveredIndex] = useState(null);

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
      })


    let init = () => {
        if(flickity !== null) return

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
    }

    let destroy = () => {
        if(flickity === null) return
        flickity.destroy()
        flickity = null
    }

    useEffect(() => {

        if(window.innerWidth < 990) {
            init();
        }

        window.addEventListener("resize", () => {
            if(window.innerWidth > 989) {
                destroy();
            } else {
                init();
            }
        })
    }, [])

    let cardHoverVariants = {
        'show': {
            opacity: 1,
            x: '-50%',
            y: 0,
            transition: {
                duration: 0.2
            }
        },
        'hide': {
            opacity: 0,
            x: '-50%',
            y: '10%',
            transition: {
                duration: 0.2
            }
        }
    }
    
    return (
        <Container>
            <Carousel ref={gallery}>
                {
                    data.map((item, index) => 
                            <Card 
                                // transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                // className={hoveredIndex !== null && hoveredIndex !== index ? 'blur' : ''}
                                // onMouseEnter={() => setHoveredIndex(index)}
                                // onMouseLeave={() => setHoveredIndex(null)}
                                whileHover={isDesktop ? {scale: 1.05} : {}}
                                transition={{ duration: 0.4 }}
                                data={item}
                            >
                                <Link href={item.link}>
                                    <Background>
                                        <Image src={item.backgroundSrc} priority={true} />
                                    </Background>
                                    <Title>
                                        <h2>Play <br/> With:</h2>
                                        <h2>{item.name}</h2>
                                    </Title>
                                    <ImageWrapper data={item}><Image src={item.img} priority={true} /></ImageWrapper>
                                    <Information>
                                        <p className='palatino-small'>{item.textOne}</p>
                                        <p className='body-large'>{item.textTwo}</p>
                                    </Information>
                                    {/* <ButtonDesktopWrapper
                                        animate={hoveredIndex === index ? 'show' : 'hide'}
                                        variants={cardHoverVariants}
                                    >
                                        <Button>Choose {item.name}</Button>
                                    </ButtonDesktopWrapper> */}
                                </Link>
                            </Card>
                        )
                }
            </Carousel>
            <ButtonWrapper>
                <ButtonLink href={data[selectedIndex].link}>Choose {data[selectedIndex].name}</ButtonLink>
            </ButtonWrapper>
        </Container>
    )
}