import styled from 'styled-components'

// Components
import Layout from '../components/layout'
import BackgroundGradientCode from '../components/background-gradient-code'



const Container = styled.div`
    position: absolute;
    height: 200vh;
    width: 100vw;
`

let colors = [
    [
      '#95FF61',
      '#00FC00',
      '#C2BCEB',
      '#8679e4'
    ],
    [
      '#95FF61',
      '#00FC00',
      '#A2D8EF',
      '#A2D8EF'
    ],
    [
      '#95FF61',
      '#00FC00',
      '#FFB800',
      '#FFB800'
    ]
]


let dataOne = [
    {color: colors[0][0], rotate: -50},
    {color: colors[0][1], rotate: 20},
    {color: colors[0][2], rotate: -70},
    {color: colors[0][3], rotate: -30},
    {color: colors[0][0], rotate: -50},
    {color: colors[0][1], rotate: -20},
    {color: colors[0][3], rotate: -70},
]

let dataTwo = [
    {color: colors[1][0], rotate: -50},
    {color: colors[1][1], rotate: 20},
    {color: colors[1][2], rotate: -70},
    {color: colors[1][3], rotate: -30},
    {color: colors[1][0], rotate: -50},
    {color: colors[1][1], rotate: -20},
    {color: colors[1][3], rotate: -70},
]

let dataThree = [
    {color: colors[2][0], rotate: -50},
    {color: colors[2][1], rotate: 20},
    {color: colors[2][2], rotate: -70},
    {color: colors[2][3], rotate: -30},
    {color: colors[2][0], rotate: -50},
    {color: colors[2][1], rotate: -20},
    {color: colors[2][3], rotate: -70},
]

export default function Home() {
  return (
    <Layout title={`Nike Impact Report`} content={`Nike Impact Report`}>
      <Container>
        <BackgroundGradientCode data={dataOne} />
        <BackgroundGradientCode data={dataTwo} />
        <BackgroundGradientCode data={dataThree} />
      </Container>
    </Layout>
  )
}
