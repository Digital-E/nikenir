import styled from 'styled-components'


const duration = '40s';

const Container = styled.div`
    position: relative;
    z-index: -1;
    transform: translate3d(0, 0, 0);

    @keyframes ticker {
        100% {
          transform translateX(-100%)
        }
      }  

    &.ticker-wrap {
        position: absolute;
        bottom: 18%;
        z-index: -1;
        margin-left: -10%;
        transform: rotateZ(15deg);
        width: 120%;
        overflow: hidden;
    }

    .ticker {
        display: flex;
        height: 70px;
        white-space: nowrap;
        background: ${props => props.data.tickerColourOne};
        backdrop-filter: blur(10px);
        overflow: hidden;
    }

    .ticker__item {
        display: flex;
        animation: ticker ${duration} infinite linear;
    }

    .ticker__item div {
        display: flex;
        align-items: center;
    }

    @media(min-width: 990px) {
        &.ticker-wrap {
            top: 15vw;
            bottom: auto;
            transform: rotateZ(5deg);
        }
    }
`

const Ticker = styled.div`
`

const TickerItem = styled.div`
`

const Text = styled.div`
    text-align: center;

    span {
        font-size: 26px;
    }
`

const Logo = styled.div`
    width: 35px;
    margin: 0 15px;

    img {
        width: 100%;
    }
`



export default function Component({ data, secondary }) {


    let itemCount = new Array(10).fill('');

    
    return (
        <Container className='ticker-wrap' secondary={secondary} data={data}>
            <Ticker className='ticker'>
                <TickerItem className="ticker__item">
                        {itemCount.map(item => (
                                <div>
                                    <Text><span className='palatino-small'>A spring in your step</span></Text>
                                    <Logo><img src={`${process.env.basePath}/images/logos/nike logo.svg`} /></Logo>  
                                </div>              
                        ))}
                </TickerItem>
                <TickerItem className="ticker__item">
                        {itemCount.map(item => (
                                <div>
                                    <Text><span className='palatino-small'>A spring in your step</span></Text>
                                    <Logo><img src={`${process.env.basePath}/images/logos/nike logo.svg`} /></Logo>  
                                </div>              
                        ))}
                </TickerItem>
            </Ticker>
        </Container>
    )
}