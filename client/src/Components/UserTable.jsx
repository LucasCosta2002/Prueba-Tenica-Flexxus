import { Space, Table, Tag, Alert, Spin } from 'antd';
import useUsers from '../Hooks/useUsers';
import { useEffect, useState } from 'react';

export const UserTable = () => {

	const { users, getUser, showDeleteConfirm, loading, total, currentPage, setCurrentPage, pageSize, setPageSize } = useUsers();	

	const [ isSmallScreen, setIsSmallScreen ] = useState(false);

	const columns = [
		{
			title: 'Usuario',
			dataIndex: 'username',
			key: 'username',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Apellido',
			dataIndex: 'lastname',
			key: 'lastname',
			responsive: isSmallScreen ? [] : ['md'],
		},
		{
			title: 'Estado',
			dataIndex: 'status',
			key: 'status',
			render: (status) => {
				return <Tag color={status === 'active' ? 'green' : 'volcano'}> {status.toUpperCase()} </Tag>;
			},
		},
		{
			title: 'Acciones',
			key: 'action',
			width: isSmallScreen ? 50 : 150,
			render: (_, user) => (
				<Space size="middle">
					<a onClick={() => getUser(user)}>Editar</a>
					<a onClick={() => showDeleteConfirm(user)}>Eliminar</a>
				</Space>
			),
		},
	];

	//evento para comprobar el tamaño de la pantalla
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize());

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			{loading ? (
				<Spin tip="Cargando">
					<Alert
						message="Por favor, espera."
						description="Obteniendo registros"
						type="info"
					/>
				</Spin>
			) : (
				<Table
					columns={columns}
					dataSource={users}
					rowKey="id"
					scroll={{ x: 800 }}
					pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: total,
                        onChange: (page, size) => {
                            setCurrentPage(page);
                            setPageSize(size);
                        },
                    }}
				/>
			)}
		</>
	);
};
