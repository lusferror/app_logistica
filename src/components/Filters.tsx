import { Button, Flex, Form, Input, Space } from "antd";
import { DataTypeTable } from "../interfaces/interfaces";
import { getCars } from "../services/cars.services";
import { useForm } from "antd/es/form/Form";
import { Dispatch, SetStateAction } from "react";

export default function Filters({
    setData,
    setOpenModal,
    setLoading
}: {
    setData: React.Dispatch<React.SetStateAction<DataTypeTable[]>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    setLoading: Dispatch<SetStateAction<boolean>>
}) {

    const [form] = useForm();

    function onFinish(values: any) {
        setOpenModal(false);
        setLoading(true);
        let params = '';
        for (let key in values) {
            if (values[key]) {
                params += '&' + key + '=' + values[key];
            }
        }
        getCars(params).then(response => {
            if (response) {
                setData(response);
            }
            else {
                setData([]);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }

    function cancel() {
        form.resetFields();
        setOpenModal(false);
    }

    return (
        <Form
            labelCol={{ span: 7 }}
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                label="Tipo de auto"
                name="class"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Marca"
                name="make"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Modelo"
                name="model"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Año"
                name="year"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tipo de transmisión"
                name="drive"
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Flex
                    justify="end"
                    gap={10}
                >
                    <Button type="primary" htmlType="submit">
                        Filtrar
                    </Button>
                    <Button
                        onClick={cancel}
                    >
                        Cancelar
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    )

}