import { Button, Flex, Space } from 'antd'
import { ReactElement } from 'react'
import Map from '../components/Map'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default function Location(): ReactElement {
    return (
        <Space
            style={{ width: '100%' }}
            direction='vertical'
        >

            <Flex
                justify='space-between'
                align='center'
            >
                <h1> Ubicación </h1>

                <Link to='/'>
                    <Button
                        icon={<ArrowLeftOutlined />}
                    >
                        Volver
                    </Button>
                </Link>
            </Flex>

            <Map />
        </Space>
    )
}