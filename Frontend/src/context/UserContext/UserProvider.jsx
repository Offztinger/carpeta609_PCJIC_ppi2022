import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import useAxiosHandler from '../../hooks/axiosHandler';
import * as XLSX from 'xlsx';

const UserProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [users, setUsers] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [formulario, setFormulario] = useState({
		documentNumber: 0,
		name: '',
		lastName: '',
		email: '',
		password: '',
		idRole: '',
	});
	const [formError, setFormError] = useState(true);

	useEffect(() => {
		console.log('selectedId', selectedId);
	}, [selectedId]);

	const postUser = async (moduleName, formulario) => {
		const data = {
			...formulario,
			documentNumber: parseInt(formulario.documentNumber),
			password: formulario.password
				? formulario.password
				: `Cc.${formulario.documentNumber}`,
		};
		if (data) {
			await POSTRequest(data, `http://127.0.0.1:4000/${moduleName}`);
			getUsers(moduleName);
		}
	};

	const getUsers = moduleName => {
		GETRequest(`http://127.0.0.1:4000/${moduleName}`, setUsers);
	};

	const putUser = (moduleName, formulario) => {
		if (formulario) {
			PUTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
		}
	};

	const deleteUser = async (moduleName, id) => {
		if (id) {
			await DELETERequest(`http://127.0.0.1:4000/${moduleName}`, id);
			getUsers(moduleName);
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setFormulario({
			...formulario,
			[name]: value,
		});
	};

	const handleRequestFunction = moduleName => {
		if (
			formulario.documentNumber !== 0 &&
			formulario.name !== '' &&
			formulario.lastName !== '' &&
			formulario.email !== '' &&
			formulario.email.includes('@elpoli.edu.co')
		) {
			setFormError(false);
			if (selectedId) {
				putUser(moduleName, formulario);
			} else if (!selectedId) {
				postUser(moduleName, formulario);
			}
		} else if (!formulario.email.includes('@elpoli.edu.co')) {
			alert('El correo debe ser institucional');
		} else {
			alert('Valide los datos en el formulario');
		}
	};

	const exportToExcel = moduleName => {
		const wb = XLSX.utils.book_new();
		let row = [
			[
				{ v: 'ID', t: 's', s: {} },
				{ v: 'Número de Documento', t: 's', s: {} },
				{ v: 'Email', t: 's', s: {} },
				{ v: 'Contraseña', t: 's', s: {} },
				{ v: 'Nombre', t: 's', s: {} },
				{ v: 'Apellido', t: 's', s: {} },
				{ v: 'Rol', t: 's', s: {} },
			],
		];
		users.forEach(user => {
			row = [
				...row,
				[
					{ v: user.id, t: 's', s: {} },
					{ v: user.documentNumber, t: 's', s: {} },
					{ v: user.email, t: 's', s: {} },
					{ v: user.password, t: 's', s: {} },
					{ v: user.name, t: 's', s: {} },
					{ v: user.lastName, t: 's', s: {} },
					{ v: user.idRole, t: 's', s: {} },
				],
			];
		});
		const ws = XLSX.utils.aoa_to_sheet(row);
		XLSX.utils.book_append_sheet(wb, ws, 'estudiantes');
		XLSX.writeFile(wb, 'lista' + 'Estudiantes' + '.xlsx');
	};

	return (
		<UserContext.Provider
			value={{
				postUser,
				getUsers,
				putUser,
				deleteUser,
				users,
				selectedId,
				setSelectedId,
				formulario,
				handleChange,
				handleRequestFunction,
				exportToExcel,
				setFormulario,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
