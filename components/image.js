import Image from 'next/image'

export default function Component({ src, priority }) {
    return <Image src={src} priority={priority} placeholder='blur' />
}