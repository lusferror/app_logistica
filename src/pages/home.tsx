import { useEffect, useState } from 'react'
import '../assets/css/App.css'
import { Button, Flex, Modal, Table, TableProps, Tag } from 'antd'
import { DataTypeTable } from '../interfaces/interfaces'
import { getCars } from '../services/cars.services';
import { AppstoreOutlined, CarOutlined, EyeOutlined, FilterOutlined, TrademarkCircleOutlined } from '@ant-design/icons';
import Filters from '../components/Filters';
import { Link } from 'react-router-dom';


const columns: TableProps<DataTypeTable>['columns'] = [
    {
        key: 'class',
        title: 'Tipo de Auto',
        dataIndex: 'class',
        render: (text) => <Tag
            color='blue'
            icon={<AppstoreOutlined />}
            style={{ textTransform: 'capitalize' }}
        >
            {text}
        </Tag>,
        sorter: (a, b) => a.class.localeCompare(b.class),

    },
    {
        key: 'year',
        title: 'Año',
        dataIndex: 'year',
        sorter: (a, b) => a.year - b.year,
    },
    {
        key: 'make',
        title: 'Marca',
        dataIndex: 'make',
        sorter: (a, b) => a.make.localeCompare(b.make),
        render: (text) => <Tag
            color='green'
            style={{ textTransform: 'capitalize' }}
            icon={<TrademarkCircleOutlined />}
        >
            {text}
        </Tag>
    },
    {
        key: 'model',
        title: 'Modelo',
        dataIndex: 'model',
        sorter: (a, b) => a.model.localeCompare(b.model),
        render: (text) => <Tag
            color='red'
            icon={<CarOutlined />}
            style={{ textTransform: 'capitalize' }}>
            {text}
        </Tag>
    },
    {
        key: 'cylinders',
        title: 'Cilindros',
        dataIndex: 'cylinders',
        sorter: (a, b) => a.cylinders - b.cylinders,
    },
    {
        key: 'displacement',
        title: 'Desplazamiento',
        dataIndex: 'displacement',
        sorter: (a, b) => a.displacement - b.displacement,
    },
    {
        key: 'drive',
        title: 'Transmisión',
        dataIndex: 'drive',
        sorter: (a, b) => a.drive.localeCompare(b.drive),
    },
    {
        key: 'transmission',
        title: 'Transmisión',
        dataIndex: 'transmission',
        sorter: (a, b) => a.transmission.localeCompare(b.transmission),
    },
    {
        key: 'fuel_type',
        title: 'Tipo de Combustible',
        dataIndex: 'fuel_type',
        sorter: (a, b) => a.fuel_type.localeCompare(b.fuel_type),
    },
    {
        key: 'city_mpg',
        title: 'MPG en Ciudad',
        dataIndex: 'city_mpg',
        sorter: (a, b) => a.city_mpg - b.city_mpg,
    },
    {
        key: 'highway_mpg',
        title: 'MPG en Carretera',
        dataIndex: 'highway_mpg',
        sorter: (a, b) => a.highway_mpg - b.highway_mpg,
    },
    {
        key: 'combination_mpg',
        title: 'MPG Combinado',
        dataIndex: 'combination_mpg',
        sorter: (a, b) => a.combination_mpg - b.combination_mpg,
    },
    {
        key: 'location',
        title: '',
        render: (_: unknown, __: unknown, index: number) => <Link to={`/location/${index}`}>
            <Button
                type='default'
                onClick={() => console.log(index)}
                icon={<EyeOutlined />}
            />
        </Link>
    }
];


export default function Home() {

    const [data, setData] = useState<DataTypeTable[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await getCars('&model=camry') as DataTypeTable[];
            if (response) {
                setData(response);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Flex
                justify='space-between'
                align='center'
                style={{ width: '100%' }}
            >
                <h1>
                    App Logística
                </h1>

                <Button
                    type='primary'
                    icon={<FilterOutlined />}
                    shape='round'
                    style={{ width: '10rem' }}
                    onClick={() => setOpenModal(true)}
                >
                    Filtrar
                </Button>
            </Flex>

            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 20 }}
                bordered={true}
                size='small'
                loading={loading}
            />

            <Modal
                open={openModal}
                title='Filtros'
                onCancel={() => setOpenModal(false)}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Filters
                    setData={setData}
                    setOpenModal={setOpenModal}
                    setLoading={setLoading}
                />
            </Modal>
        </div>
    )
}