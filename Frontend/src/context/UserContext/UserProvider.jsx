/* eslint-disable react/prop-types */

import { useState } from 'react';
import { UserContext } from './UserContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const UserProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [users, setUsers] = useState([]);
	const postUser = (moduleName, formulario) => {
		if (formulario) {
			POSTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
		}
	};

	const getUsers = moduleName => {
		if (formulario) {
			GETRequest(`http://127.0.0.1:4000/${moduleName}`, setUsers);
		}
	};

	const putUser = (moduleName, formulario) => {
		if (formulario) {
			PUTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
		}
	};

	const deleteUser = (moduleName, id) => {
		if (id) {
			DELETERequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
		}
	};

	return (
		<UserContext.Provider
			value={{ postUser, getUsers, putUser, deleteUser, users }}
		>
			{children}
		</UserContext.Provider>
	);
};
export default UserProvider;
