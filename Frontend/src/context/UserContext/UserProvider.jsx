/* eslint-disable react/prop-types */

import { useState } from 'react';
import { UserContext } from './UserContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const UserProvider = ({ children }) => {
	
	const [ users, setUsers] = useState([]);
	const { POSTRequest } = useAxiosHandler();
	const postUser = (moduleName, formulario) => {
		if (formulario) {
			POSTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
		}
	};
	const getUsers = (moduleName) => {
		if (formulario) {
			GETRequest(`http://127.0.0.1:4000/${moduleName}`, setUsers);
		}
	};

	return (
		<UserContext.Provider value={{ postUser }}>
			{children}
		</UserContext.Provider>
	);
};
export default UserProvider;
