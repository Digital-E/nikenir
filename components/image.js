import { useRef } from 'react'
import Image from 'next/image'

export default function Component({ src, priority }) {
    let imageRef = useRef();

    let revealImage = () => {
        imageRef.current.classList.add('reveal-img')
        console.log(imageRef.current)
    }

    // console.log()
    return <Image className='hide-img' ref={imageRef} src={src} priority={priority} onLoadingComplete={() => revealImage()} />
}