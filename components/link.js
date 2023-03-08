import Link from 'next/link'


const Component = ({ href, children }) => {

    return (
        <Link href={href}>
            {children}
        </Link>
    )
}

export default Component