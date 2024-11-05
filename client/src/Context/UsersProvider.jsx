import { createContext, useEffect, useState } from "react";
import { Modal, notification } from 'antd';
import axios from "axios";
import "../css/modal-delete.css"

const { confirm } = Modal;

const UsersContext = createContext();
const baseURL = import.meta.env.VITE_API_URL;

const UsersProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [filterStatus, setFilterStatus] = useState("");
    const [search, setSearch] = useState("");

    const simulateLoading = async call => {
        setLoading(true);
        try {
            const response = await call();

            // Esperar 1 segundo antes de devolver la respuesta
            await new Promise(resolve => setTimeout(resolve, 1000));
            return response;
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const query = `?_page=${currentPage}&_limit=${pageSize}` +
                    (filterStatus ? `&status=${filterStatus}` : "") +
                    (search.trim() ? `&q=${search}` : "");
                
                const { data, headers } = await simulateLoading(() => axios.get(`${baseURL}${query}`));
                
                setUsers(data);
                setTotal(headers['x-total-count']);
            }
            catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'No se pudo obtener los usuarios',
                });
            }
        };

        getUsers();
    }, [currentPage, pageSize, filterStatus, search]);

    const getUser = async user => {
        try {
            const { data } = await simulateLoading(() => axios.get(`${baseURL}/${user.id}`));
            
            setUser(data);
            setIsModalOpen(true);
        }
        catch (error) {
            notification.error({
                message: 'Error',
                description: 'No se pudo obtener el usuario',
            });
        }
    }

    const createUser = async user => {
        try {
            const { data } = await simulateLoading(() => axios.post(baseURL, user));
            
            setUsers([...users, data]);
            setCurrentPage(1);
            setFilterStatus("");
            setIsModalOpen(false);

            notification.success({
                message: 'Usuario Creado',
                description: 'Usuario creado correctamente',
            });
        }
        catch (error) {
            notification.error({
                message: 'Error',
                description: 'No se pudo crear el usuario',
            });
        }
    }

    const updateUser = async user => {
        try {
            const { data } = await simulateLoading(() => axios.put(`${baseURL}/${user.id}`, user));

            const usersUpdate = users.map(userState => userState.id === data.id ? data : userState);
            
            setUsers(usersUpdate);
            setIsModalOpen(false);

            notification.success({
                message: 'Usuario Actualizado',
                description: 'Usuario actualizado correctamente',
            });
        }
        catch (error) {
            notification.error({
                message: 'Error',
                description: 'No se pudo actualizar el usuario',
            });
        }
    }

    const deleteUser = async id => {
        try {
            await simulateLoading(() => axios.delete(`${baseURL}/${id}`));
            const usersUpdate = users.filter(userState => userState.id !== id);
            setUsers(usersUpdate);

            notification.success({
                message: 'Usuario Eliminado',
                description: 'Usuario eliminado correctamente',
            });
        }
        catch (error) {
            notification.error({
                message: 'Error',
                description: 'No se pudo eliminar el usuario',
            });
        }
    }

    const showDeleteConfirm = user => {
        confirm({
            title: 'Eliminar Usuario',
            content: 
                <div className="modal-content">
                    ¿Estás seguro de que quiere eliminar el usuario <span>@{user.username}</span>?
                </div>,
            icon: null,
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            closable: true,
            onOk() { deleteUser(user.id) },
            okButtonProps: {
                style: { backgroundColor: "#E23336", color: "#fff" },
            },
            onCancel() {}
        });
    }

    const filterByStatus = status => {
        if (status === "active" || status === "inactive") {
            setFilterStatus(status);
            setCurrentPage(1);
            return;
        }
        setFilterStatus("");
    }

    const filterByName = value => {
        setSearch(value);
    }

    return (
        <UsersContext.Provider
            value={{
                user,
                users,
                getUser,
                isModalOpen,
                setIsModalOpen,
                showDeleteConfirm,
                createUser,
                updateUser,
                loading,
                total,
                currentPage,
                setCurrentPage,
                pageSize,
                setPageSize,
                filterByStatus,
                filterByName
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export { UsersProvider };
export default UsersContext;
