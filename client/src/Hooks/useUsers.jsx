import { useContext } from "react";
import UsersContext from "../Context/UsersProvider.jsx";

function useUsers() {
    return useContext(UsersContext)
}

export default useUsers
