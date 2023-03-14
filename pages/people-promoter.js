import { useEffect, useContext } from "react"
import styled from 'styled-components'

import { store } from "../store"

// Components
import Footer from '../components/footer'
import Layout from '../components/layout'
import Slices from '../components/slices'



const Container = styled.div``

let data = {
    title: 'People Promoter',
    name: 'Ines',
    role: 'People Promoter',
    avatar: '/images/avatars/People_02 1.png',
    avatarMiniature: '/images/avatars/miniature/ines.png',
    colourOne: '#FFB800',
    colourTwo: '#F05822',
    colourThree: '#F6693D',
    questionCount: 4,
    intro: {
        title: 'A CREATIVE AND HAPPY SOCIETY IS ONE THAT IS DIVERSE AND INCLUSIVE.',
        text: [
          'The choices we make now can help shape a fairer society.'
        ]
    },
    slices: [    
        {
            type: 'question',
            number: '1 / 4',
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
                text: 'Nothing like stepping out into the fresh air, noticing the birds in the trees and the ground under your feet.',
                textCarousel: [
                  'We encourage our employees to practice sport and movement as a way of maintaining their wellbeing.',
                ]
              },
              {
                title: 'Talk it out',
                text: 'Knowing there are other people out there facing similar struggles helps you feel more in control.',
                textCarousel: [
                  'We’re investing in our employees’ ongoing wellbeing by providing mental health support, and in doing so helping redefine the scope of traditional workplace benefits.'
                ]
              }
            ]
        },
        {
            type: 'question',
            number: '2 / 4',
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
                text: 'You want to be part of a team where you feel you can make a difference. Where everyone is counted and accountable.',
                textCarousel: [
                  'We’re accelerating the career trajectory of women in the workplace by investing in programs that increase a sense of belonging.',
                ]
              },
              {
                title: 'FIND BALANCE IN OUR DIFFERENCES',
                text: 'A diverse team means news ideas, fresh plays and great balance. Our combined skills will give us the edge.',
                textCarousel: [
                  'We’re building more diverse teams, check out our Serena Williams Design Crew program.'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3 / 4',
            title: 'All about progress',
            text: 'You love the teamwork of volleyball and the pure purpose of tennis. But it’s time to choose where to put more of your time and energy. Will you...'
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
                text: 'You’re looking for a workplace where you feel you can make a difference. Where everyone is counted and accountable.',
                textCarousel: [
                  'We continue to support of Historically Black Colleges and Universities (HBCUs) and Hispanic-Serving Institutions (HSIs) – through storytelling, recruitment, and investments.',
                ]
              },
              {
                title: 'Maximise your potential',
                text: 'You’re looking for a sport that rewards your ambition with the progression you deserve. You want to be judged on what you bring, not who you are.',
                textCarousel: [
                  'We’re committed to reaching 50% representation of women in leadership positions. Since last year, we’ve increased the number of women at the Director level to 43%.',
                ]
              }
            ]
        },
        {
          type: 'question',
          number: '4 / 4',
          title: 'THIS IS YOUR TIME',
          text: 'You’ve been thinking about your future, but it’s hard because people that look like you aren’t always represented in the worlds of work you’re interested in. Something gives you hope…'
        },
        {
          type: 'scratch',
          title: 'Scratch out the choice you don’t want',
          squares: [
            {
              title: 'You see a place where you fit in',
              img: '/images/scratch/1-yellow.png',
              imgBack: '/images/scratch/1.png'
            },
            {
              title: 'You see a life that you aspire to',
              img: '/images/scratch/1-yellow.png',
              imgBack: '/images/scratch/1.png'
            }
          ],
          information: [
            {
              title: 'You see a place where you fit in',
              text: 'A visit to your sister at college fills you with optimism. You’re surrounded by people just like you expanding their horizons and defining their place in the world.',
              textCarousel: [
                'We continue to support of Historically Black Colleges and Universities (HBCUs) and Hispanic-Serving Institutions (HSIs) – through storytelling, recruitment, and investments.'
              ]
            },
            {
              title: 'You see a life that you aspire to',
              text: 'You’re looking for a sport that rewards your ambition with the progression you deserve. You want to be judged on what you bring, not who you are.',
              textCarousel: [
                'We’re accelerating the career trajectory of women in the workplace by investing in programs that increase a sense of belonging.',
              ]
            }
          ]
      }                                               
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
          avatarMiniature: '/images/avatars/miniature/ivy.png',
          link: '/climate-champion'
        }
      }
    }
}


export default function Component() {
  // Context
  const context = useContext(store);
  const { state, dispatch } = context;
  
  // Scroll Event Listener

  let scrollListener = () => {
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                          html.clientHeight, html.scrollHeight, html.offsetHeight );  

    if(window.scrollY > height - window.innerHeight - 55) {
      document.querySelector('.sidebar').classList.add('lift-sidebar')
    } else {
      document.querySelector('.sidebar').classList.remove('lift-sidebar')
    }         
  }  

  useEffect(() => {
    dispatch({type: "update colour", value: data.colourThree})
    dispatch({type: "update message", value: data.role})
    dispatch({type: "update question count", value: data.questionCount})
    dispatch({type: "update progress", value: 0})
    dispatch({type: "update back link", value: '/pick-your-player'})
    dispatch({type: "update gradient index", value: 1})

    setTimeout(() => {
      document.querySelector('header').classList.remove('hide-header')

      document.querySelector('.sidebar').classList.remove('hide-sidebar')
    }, 250)

    if(window.innerWidth > 990) {
      document.addEventListener("scroll", scrollListener)
    }

    return () => {
      document.removeEventListener("scroll", scrollListener)
    }
  }, [])

  return (
    <Layout title={`${data.title} | Nike Impact Report`} content={`${data.title} | Nike Impact Report`}>
      <Container>
        <Slices data={data}/>
        <Footer />
      </Container>
    </Layout>
  )
}
