import { useEffect, useContext } from "react"
import Head from 'next/head'
import styled from 'styled-components'

import { store } from "../store"

// Components
import Layout from '../components/layout'
import Slices from '../components/slices'

// Images
import avatarImage from '../public/images/avatars/carousel/ivy/ivy-0.png'
import avatarImageCrop from '../public/images/avatars/character-intro/ivy.png'
import avatarImageTwo from '../public/images/avatars/praise/ivy.png'

const Container = styled.div``

let data = {
    title: 'Active Advocate',
    name: 'Ivy',
    role: 'Active Advocate',
    avatar: avatarImage,
    avatarCrop: avatarImageCrop,
    avatarMiniature: `${process.env.basePath}/images/avatars/miniature/ivy.png`,
    colourOne: '#A2D8EF',
    colourTwo: '#F05822',
    colourThree: '#A2D8EF',
    tickerColourOne: 'rgba(62, 216, 239, 0.5)',
    questionCount: 4,
    intro: {
        title: 'EVERYONE SHOULD EXPERIENCE THE JOY OF MOVEMENT. GIRLS INCLUDED.',
        text: [
          'The decisions we make now can shape a future where everyone belongs',
          'Oh, hey, I’m Ivy, I just love to move! Did you know, girls drop out of sports at twice the rate of boys? ',
          'And it just doesn’t need to be this way. There’s so much we can do to level the playing field',
          'Hey, why not start right now? Let’s imagine three scenarios. Then you decide what you would do in each case',
          'Don’t worry, there are no wrong answers. Only progress!'
        ],
        desktop: {
          // bubbleBottom: 28,
          // bubbleLeft: 15,
          bubbleBottom: 80,
          bubbleLeft: 62,
          // avatarWidth: 24
          avatarHeight: 77,
          avatarBottom: 0
        },
        mobile: {
          bubbleBottom: 40,
          bubbleLeft: 35,
          bubbleRight: -25,
          avatarWidth: 68,
          avatarLeft: -15,
          avatarBottom: -7,
        }
    },
    slices: [    
        {
            type: 'question',
            number: '1/4',
            title: 'MOVE AS ONE',
            text: 'You never thought of yourself as into sports. But a friend invited you to play one time and something made you want to come back.<br/>Was it…'
        },
        {
            type: 'drag',
            title: 'Drag the ball into a box',
            img: `${process.env.basePath}/images/active-activist/objects/Play_Q1_crop.png`,
            squares: [
              {
                title: 'The simple joy of play'
              },
              {
                title: 'Being part of a team'
              }
            ],
            information: [
              {
                title: 'The simple joy of play',
                text: 'At first, even the thought of running and jumping made you tired. But by the time the game was over, you never felt more energized!',
                textCarousel: [
                  'Research shows that active people are healthier, happier, and more successful in school and life. That’s why last year alone, Nike helped more than 375K girls around the world to find joy in movement.',
                ]
              },
              {
                title: 'Being part of a team',
                text: 'The thought of ‘team spirit’ used to make you cringe, but before you knew it your teammates were like a second family.',
                textCarousel: [
                  'Through Made to Play, we’re investing across the globe in inclusive play and sport-based programs that break barriers, expand opportunities, and help build a strong community for girls.'
                ]
              }
            ]
        },
        {
            type: 'question',
            number: '2/4',
            title: 'SEEN AND HEARD',
            text: 'You were always interested in sport and an active lifestyle, but until now, it’s never felt set up for someone with your background. Today you saw something that gave you courage…'
        },
        {
            type: 'tap spam',
            squares: [
              {
                title: 'Sport sees me',
                img: `${process.env.basePath}/images/active-activist/objects/Play_Q2.png`,
              },
              {
                title: 'Sport hears me',
                img: `${process.env.basePath}/images/active-activist/objects/Play_Q2_02.png`,
              }
            ],
            information: [
              {
                title: 'Sport sees me',
                text: 'For the first time, you see one of your classmates wearing an item of sports gear you didn’t even know existed. Right away it makes you feel like you are no longer on the outside, looking in. You sign up for try-outs.',
                textCarousel: [
                  'We provide our non-profit partners globally with sportswear – like sports bras and hijabs – and the resources they need to help coaches and program leaders provide a safe and supportive environment.',
                ]
              },
              {
                title: 'Sport hears me',
                text: 'You’re hearing stories of people like you feeling like they belong, not just by being part of a team, but because they have people who really listen.',
                textCarousel: [
                  'We’re increasing the quality, quantity, and diversity of youth coaches around the world, because we know that having a well-trained, caring coach is critical to helping people see their potential. Check it out: How to Coach Girls, Made to Play Coaching Girls Guide and Coaching for Belonging.'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3/4',
            title: 'THANKS TO SPORT',
            text: 'You decide it’s time to give something back to your community, make yourself useful somehow.<br/>Something sports related because…'
        },  
        {
            type: 'like',
            title: 'Like to make your choice',
            heartImg: `${process.env.basePath}/images/like/heart-fill-ivy.png`,
            squares: [
              {
                title: 'My coach is my rock',
                img: `${process.env.basePath}/images/active-activist/objects/Play_Q3.png`
              },
              {
                title: 'Sport is what drives me',
                img: `${process.env.basePath}/images/active-activist/objects/Play_Q3_01.png`
              }
            ],
            information: [
              {
                title: 'My coach is my rock',
                text: 'You want to give someone else the same time and space your coach gave you. The confidence you gained from being really seen and heard still carries you to this day.',
                textCarousel: [
                  'We’re investing in helping coaches (9K of them, globally, last year) become game-changing mentors to kids, both on and off the field.',
                ]
              },
              {
                title: 'Sport is what drives me',
                text: 'The joy of movement, the sense of belonging, and of shared purpose. Sport was always the brightest star in your sky.',
                textCarousel: [
                  'We support our employees’ desire to give back through Give Your Best, our platform for employees to make donations to a wide range of community organizations around the world and track their volunteer hours.',
                ]
              }
            ]
        },
        {
          type: 'question',
          number: '4/4',
          title: 'MOVE TO HERO',
          text: 'You didn’t think you’d ever last more than a minute playing sports. But a year on from joining the team it’s become such an important part of your life.<br/>And that’s because:'
        },
        {
          type: 'like',
          title: 'Like to make your choice',
          squares: [
            {
              id: 1,
              title: 'Sport gives you purpose',
              img: `${process.env.basePath}/images/active-activist/objects/Play_Q4.png`,
            },
            {
              id: 1,
              title: 'Sport gives you confidence',
              img: `${process.env.basePath}/images/active-activist/objects/Play_Q4.png`,
            }
          ],
          information: [
            {
              title: 'Sport gives you purpose',
              text: 'Sport is your every day. It’s your social life. It’s what you think about when you wake up and dream about at night.',
              textCarousel: [
                'Because we know that play is innate and necessary for kids to help build stronger, more inclusive communities, we support organizations like Sport dans la Ville, which brings young people from low-income neighborhoods into sport, providing year-round programming.'
              ]
            },
            {
              title: 'Sport gives you confidence',
              text: 'Confidence. That’s what I feel when I’m out there with my friends, and I’m doing what I’m doing and they’re doing their thing and together we can do anything!',
              textCarousel: [
                'Grow Our Game is about empowering young girls to become fierce, formidable leaders through passion, teamwork and sisterhood – all while learning the art of basketball.',
              ]
            }
          ]
      }                                               
    ],
    pause: {
      title: 'Not so quick !',
      text: ['Answer all the questions to advance! ']
    },
    complete: {
      praise: {
        title: 'WE DID IT!',
        text: [
        'We did it! Feel that fresh air in your lungs? That new-found confidence? ',
        'Goes to show. These personal choices can wind up meaning so much for future generations.',
      ],
      avatar: avatarImageTwo,
      desktop: {
        bubbleBottom: 45,
        bubbleLeft: 60,
        avatarLeft: -250
      },
      mobile: {
        bubbleBottom: 95,
        bubbleLeft: 75,
        bubbleRight: 43,
        avatarLeft: -20,
        avatarWidth: 140
      },
      tablet: {
        bubbleLeft: 42.7,
        bubbleBottom: 96,
      }
      },
      reward: {
        image: `${process.env.basePath}/images/rewards/3.png`,
        title: 'The move maker',
        text: 'You believe in the power of play to help more young people feel included in sport and want to keep moving.',
        link: '/reward/active-advocate'
      },
      more: {
        title: 'Want to know more?',
        links: [
          {
            label: 'Discover more about the power of coaching through Nike’s Made to Play',
            url: 'https://www.nike.com/made-to-play'
          },
          {
            label: 'Find out how Nike is helping more girls find joy and belonging in sport',
            url: 'https://www.nike.com/made-to-play/coach'
          },
          {
            label: 'Discover more about how Nike support their employees with Give Your Best',
            url: 'https://about.nike.com/en/impact/initiatives/matching-our-employees-impact'
          }
        ],
      },
      continue: {
        title: 'Pick another path?',
        text: 'Don’t go anywhere, there are still plenty of positive choices to be made!',
        next: {
          name: 'Ines',
          role: 'People Promoter',
          avatarMiniature: `${process.env.basePath}/images/avatars/miniature/ines.png`,
          link: '/people-promoter'
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
      document.querySelector('.notification').classList.add('lift-notification')
    } else {
      document.querySelector('.sidebar').classList.remove('lift-sidebar')
      document.querySelector('.notification').classList.remove('lift-notification')
    }          
  }  

  useEffect(() => {
    dispatch({type: "update colour", value: data.colourThree})
    dispatch({type: "update message", value: data.role})
    dispatch({type: "update question count", value: data.questionCount})
    dispatch({type: "update progress", value: 0})
    dispatch({type: "update back link", value: '/pick-your-player'})
    dispatch({type: "update gradient index", value: 3})

    setTimeout(() => {
      document.querySelector('header').classList.remove('hide-header')

      document.querySelector('.sidebar').classList.remove('hide-sidebar')
    }, 250)

    document.addEventListener("scroll", scrollListener)

    return () => {
      document.removeEventListener("scroll", scrollListener)
    }
  }, [])

  return (
    <Layout title={`${data.title} | Nike Impact Game - Your Move`} content={`${data.title} | Nike Impact Game - Your Move`}>
      <Head><link rel="preload" href={avatarImageTwo.src} as="image" /></Head>
      <Container>
        <Slices data={data}/>
      </Container>
    </Layout>
  )
}
