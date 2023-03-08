import styled from 'styled-components'
import { motion } from 'framer-motion'


const Hide = styled(motion.div)`
    overflow: hidden;

    @media(max-width: 989px) {
        padding: 0 var(--margin);
    }
`

const InformationCardWrapper = styled(motion.div)``

let hideVariants = {
  'show': {
    maxHeight: '500px',
    transition: {
      duration: 0.5,
      delayChildren: 0.2
    }
  },
  'hide': {
    maxHeight: '0px',
    transition: {
      duration: 0.5
    }
  }
}

let hideVariantsTwo = {
  'show': {
    opacity: 1,
    // transition: {
    //   duration: 0.5
    // }
  },
  'hide': {
    opacity: 0,
    // transition: {
    //   duration: 0.5
    // }
  }
}

export default function Component({ hasInteracted, children }) {

    return (
        <Hide variants={hideVariants} animate={hasInteracted ? 'show' : 'hide'}>
            <InformationCardWrapper variants={hideVariantsTwo}>
                {children}
            </InformationCardWrapper>
        </Hide>
    )
}
