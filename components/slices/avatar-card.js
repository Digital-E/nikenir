
import styled from 'styled-components'



const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const RowOne = styled.div`
    display: flex;
`

const RowTwo = styled.div``

const ColOne = styled.div``

const Avatar = styled.div`
    width: 70px;
    margin-top: -5px;

    img {
        width: 100%;
    }
`

const ColTwo = styled.div`
    margin-left: 10px;
`

const Name = styled.h3`
    font-size: 24px;
`

const Role = styled.p``

const Text = styled.p``


export default function Component({ item, data }) {

    return (
        <Container className='container-background mtb'>
        <RowOne>
            <ColOne>
                <Avatar>
                    <img src={data.avatarMiniature}/>
                </Avatar>
            </ColOne>

            <ColTwo>
                <Name>{data.name}</Name>
                <Role className='palatino-medium'>{data.role}</Role>
            </ColTwo>
        </RowOne>

        <RowTwo>
            <Text className='body-large'>
                {item.text}
            </Text>
        </RowTwo>
        </Container>
    )
}