import Link from 'next/link'


const Component = ({ href, children }) => {

    return (
        <Link href={href} scroll={false}>
            {children}
        </Link>
    )
}

export default Component