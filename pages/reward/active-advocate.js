import { useEffect, useContext } from "react"
import styled from 'styled-components'

import { store } from "../../store"

// Components
import Layout from '../../components/layout'
import ButtonLink from '../../components/button-link'
import Reward from '../../components/slices/complete/reward'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 100px 0 50px 0;
`

const InnerContainer = styled.div`
  padding: 0 var(--margin);
`

const Logo = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    width: 50px;
    transform: translateX(-50%);
    padding: 40px 0;

    img {
      width: 100%;
    }

    @media(max-width: 989px) {
        padding: 30px 0;
    }
`


const ButtonWrapper = styled.div`
  margin-top: 15px;

  button {
    max-width: none;
    margin: 0 auto;
    box-shadow: none;
  }
`


let data = {
    role: 'Active Advocated',
    complete: {
      reward: {
        image: `${process.env.basePath}/images/rewards/3.png`,
        title: 'The move maker',
        text: 'You believe in the power of play to help more young people feel included in sport and want to keep moving.',
        link: '/active-advocate'
      }
    }
}


export default function Component() {
  // Context
  const context = useContext(store);
  const { state, dispatch } = context;


  useEffect(() => {
    dispatch({type: "update gradient index", value: 3})
  }, [])

  return (
    <Layout title={`${data.role} Reward | Nike Impact Game - Your Move`} content={`${data.role} Reward | Nike Impact Game - Your Move`}>
      <Container>
        <Logo >
          <img src={`${process.env.basePath}/images/logos/nike logo.svg`} />
        </Logo>
        <InnerContainer>
          <Reward data={data} share={false} />
          <ButtonWrapper>
            <ButtonLink href={'/'}>Let's Play!</ButtonLink>
          </ButtonWrapper>
        </InnerContainer>
      </Container>
    </Layout>
  )
}
