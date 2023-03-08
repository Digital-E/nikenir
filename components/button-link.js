import Link from './link'

import Button from './button'


const Component = ({ href, children, colour }) => {

    return (
        <Link href={href}>
            <Button colour={colour}>
                {children}
            </Button>
        </Link>
    )
}

export default Component