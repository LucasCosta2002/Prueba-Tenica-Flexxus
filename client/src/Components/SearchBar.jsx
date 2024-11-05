import { Input, Select, Row, Col, Button } from "antd";
import { FormUser } from "./FormUser";
import useUsers from '../Hooks/useUsers';

const { Option } = Select;
const { Search } = Input;

export const SearchBar = () => {

	const { setIsModalOpen, filterByStatus, filterByName } = useUsers();

	const handleShowModal = () => {
		setIsModalOpen(true);
	};

	const handleChangeStatus = value => {
		filterByStatus(value)
	}

	const handleSearch = value => {
		filterByName(value)
	}

	return (
		<>
			<Row style={{ padding: '10px 0' }}>
				<p>Usuarios / <b>Listado de Usuarios</b></p>
			</Row>

			<Row 
				className="inputs-container" 
				justify={"space-between"}
				style={{ padding: "10px 0" }}
				gutter={[16, 16]}
			>
				<Col xs={24} md={12}>
					<Row gutter={[16, 16]}>
						<Col xs={24} md={8}>
							<Search
								placeholder="Buscar usuario"
								onSearch={handleSearch}
								style={{ width: '100%' }}
							/>
						</Col>
						<Col xs={24} md={8}>
							<Select 
								defaultValue="Filtrar por estado" 
								onChange={handleChangeStatus} 
								style={{ width: '100%' }}
							>
								<Option value="all">Todos</Option>
								<Option value="active">Activo</Option>
								<Option value="inactive">Inactivo</Option>
							</Select>
						</Col>
					</Row>
				</Col>
				<Col xs={24} md={4}>
					<Button type="primary" size={"medium"} onClick={handleShowModal} style={{ width: '100%' }}>
						Agregar usuario
					</Button>
				</Col>
			</Row>

			<FormUser />
		</>
	);
};
