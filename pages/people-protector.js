import { useEffect, useContext } from "react"
import styled from 'styled-components'

import { store } from "../store"

// Components
import Layout from '../components/layout'
import Slices from '../components/slices'



const Container = styled.div``

let data = {
    title: 'People Protector',
    name: 'Theo',
    role: 'People Protector',
    avatar: '/images/avatars/People_02 1.png',
    colourOne: 'rgba(255, 184, 0, 0.7)',
    colourTwo: '#F05822',
    colourThree: '#F6693D',
    questionCount: 3,
    intro: {
        title: 'A SOCIETY IS ONLY AS CREATIVE AND HAPPY AS IT IS DIVERSE AND INCLUSIVE.',
        text: [
          'Hello, how are you ?',
          'In fact, how about we make some positive choices right now! I’m going to ask you to imagine three scenarios.'
        ]
    },
    slices: [    
        {
            type: 'question',
            number: '1 / 3',
            title: 'Walk and talk',
            text: 'You feel a little lost in your feelings. Isolated, even. You want to feel connected to the world again, find a way back to being yourself. Do you...'
        },
        {
            type: 'like',
            squares: [
              {
                title: 'Walk it out'
              },
              {
                title: 'Talk it out'
              }
            ],
            information: [
              {
                title: 'Walk it out',
                text: [
                  'Nothing like stepping out into the fresh air, noticing the birds in the trees and the ground under your feet.',
                  'We encourage our employees to practice sport as a way of maintaining their wellbeing.',
                  'We’re investing in our employees’ ongoing wellbeing by providing mental health support with Lyra Health.'
                ]
              },
              {
                title: 'Talk it out',
                text: [
                  'Knowing there are other people out there facing similar struggles helps you feel more in control.',
                  'We encourage our employees to practice sport as a way of maintaining their wellbeing.',
                  'We’re investing in our employees’ ongoing wellbeing by providing mental health support with Lyra Health.'
                ]
              }
            ]
        },
        {
            type: 'question',
            number: '2 / 3',
            title: 'Win win',
            text: 'Time to pick a new roller derby team. You wonder if there’s a winning formula. Is this about team spirit or team balance?'
        },
        {
            type: 'drag',
            title: 'Drag the roller-skate into a box',
            squares: [
              {
                title: 'FIND STRENGTH IN TOGETHERNESS'
              },
              {
                title: 'FIND BALANCE IN OUR DIFFERENCES'
              }
            ],
            information: [
              {
                title: 'FIND STRENGTH IN TOGETHERNESS',
                text: [
                  'A team where everyone feels included can do anything. That sense of belonging will let us dream and move as one.',
                  'Our Employee Resource Groups strengthen our commitment to inclusion.',
                  'We’re building more diverse teams, check out our Serena Williams Design Crew program.'
                ]
              },
              {
                title: 'FIND BALANCE IN OUR DIFFERENCES',
                text: [
                  'A diverse team means new ideas, fresh plays and great balance. Our combined skills will give us the edge.',
                  'Our Employee Resource Groups strengthen our commitment to inclusion.',
                  'We’re building more diverse teams, check out our Serena Williams Design Crew program.'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3 / 3',
            title: 'All about progress',
            text: 'You’ve started thinking about what kind of career you want, and where you’d like to work. Do you want to join a game-changing team or shoot for leadership?'
        },  
        {
            type: 'tap spam',
            title: 'Tap spam to make your choice',
            squares: [
              {
                title: 'Be part of something bigger',
                img: '/images/tap-spam/Bag_01.png'
              },
              {
                title: 'Maximise your potential',
                img: '/images/tap-spam/Bottle_01 2.png'
              }
            ],
            information: [
              {
                title: 'Be part of something bigger',
                text: [
                  'You’re looking for a workplace where you feel you can make a difference. Where everyone is counted and accountable.',
                  'We’re accelerating the career trajectory of women in the workplace by investing in programs that increase a sense of belonging.',
                  'We’re committed to reaching 50% representation of women in leadership positions. This year we made it to 43%.'
                ]
              },
              {
                title: 'Maximise your potential',
                text: [
                  'You’re looking for a job that rewards your ambition with the support and progression you deserve. You want to be judged on what you bring, not who you are.',
                  'We’re accelerating the career trajectory of women in the workplace by investing in programs that increase a sense of belonging.',
                  'We’re committed to reaching 50% representation of women in leadership positions. This year we made it to 43%.'
                ]
              }
            ]
        },                                     
    ],
    pause: {
      title: 'Not so quick !',
      text: ['Answer all the questions to advance!']
    },
    complete: {
      praise: {
        title: 'WE DID IT!',
        text: ['That’s all us! Well all you, actually. Goes to show. These personal choices can wind up meaning so much for the bigger picture. Go integrity']
      },
      reward: {
        image: '/images/rewards/Asset 1 7.png',
        text: 'Congratulations, you are a wise and inclusive'
      },
      more: {
        title: 'Want to know more?',
        text: [
          'Explore the Serena Williams Design Crew',
          'Explore',
          'Explore the Serena Williams Design Crew',
          'Explore ',
        ],
        link: 'https://nike.com'
      },
      continue: {
        title: 'Fancy another round?',
        text: 'Don’t go anywhere, there are still decisions to be made.',
        next: {
          name: 'Ivy',
          role: 'Climate Champion',
          avatar: '/images/avatars/ivy-small.png',
          link: '/climate-champion'
        }
      }
    }
}
export default function Component() {
  // Context
  const context = useContext(store);
  const { state, dispatch } = context; 

  useEffect(() => {
    dispatch({type: "update colour", value: data.colourThree})
    dispatch({type: "update message", value: data.role})
    dispatch({type: "update progress", value: 0.25})
    dispatch({type: "update question count", value: data.questionCount})

    setTimeout(() => {
      document.querySelector('header').classList.remove('hide-header')

      document.querySelector('.sidebar').classList.remove('hide-sidebar')
    }, 250)
  }, [])

  return (
    <Layout title={`${data.title} | Nike Impact Report`} content={`${data.title} | Nike Impact Report`}>
      <Container>
        <Slices data={data}/>
      </Container>
    </Layout>
  )
}
