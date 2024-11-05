import { useState, useEffect } from 'react';
import useUsers from '../Hooks/useUsers';
import { Modal, Button, Form, Input, Row, Col, Select } from "antd";
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const INITIAL_USER = {
    username: "",
    name: "",
    lastname: "",
    email: "",
    status: "",
    age: 0
}

export const FormUser = () => {

    const { user: userState, isModalOpen, setIsModalOpen, createUser, updateUser } = useUsers();

    const [ user, setUser] = useState(INITIAL_USER)

    useEffect(() => {
        if (userState) {
            setUser({
                id: userState.id,
                username: userState.username || "",
                name: userState.name || "",
                lastname: userState.lastname || "",
                email: userState.email || "",
                status: userState.status || "",
                age: userState.age || ""
            });

            return;
        }

        setUser(INITIAL_USER)

    }, [userState]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setUser(INITIAL_USER);
    };

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    //limpiar el estado cuando el modal se cierre
    useEffect(() => {
        if (!isModalOpen) {
            setUser(INITIAL_USER);
        }
    }, [isModalOpen]);

    const handleSelectChange = value => {
        setUser({
            ...user,
            status: value 
        });
    }

    const handleSubmit = () => {
        
        if (Object.values(user).some(value => value === "" || value === 0)) {
            alert("todos los campos son obligatorios")
            return;
        }

        if (user.id) {
            updateUser(user);
            setUser(INITIAL_USER);
            return;
        }
    
        const completeUser = { ...user, id: uuidv4() };
        createUser(completeUser);

        setUser(INITIAL_USER);
    }

    return (
        <Modal
            title={user.id ? "Editar Usuario" : "Agregar Usuario"}
            open={isModalOpen} 
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }} 
                onFinish={handleSubmit}
                autoComplete="off"
                labelAlign="left"
            >
                <Row gutter={30} style={{paddingTop:"20px"}}>
                    <Col span={12}>
                        <Form.Item label="Usuario">
                            <Input 
                                type="text"
                                name="username"
                                placeholder="jhondoe"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email">
                            <Input 
                                type="email"
                                name="email"
                                placeholder="jhondoe@domain.com"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Nombre">
                            <Input 
                                type="text"
                                name="name"
                                placeholder="jhon"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Apellido">
                            <Input
                                type="text" 
                                name="lastname"
                                placeholder="Doe"
                                value={user.lastname}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Estado"
                            name="status"
                        >
                            <Select 
                                placeholder="Selecciona un estado"
                                value={user.status}
                                onChange={handleSelectChange}
                            >
                                <Option disabled value="">-- Seleccione --</Option>
                                <Option value="active">Activo</Option>
                                <Option value="inactive">Inactivo</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Edad">
                            <Input
                                type="number"
                                name="age"
                                placeholder="Edad"
                                value={user.age }
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit">
                        {user.id ? "Editar Usuario" : "Agregar Usuario"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
