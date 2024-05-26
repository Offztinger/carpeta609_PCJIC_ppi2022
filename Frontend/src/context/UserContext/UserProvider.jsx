import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import useAxiosHandler from '../../hooks/axiosHandler';
import * as XLSX from 'xlsx';

const UserProvider = ({ children }) => {
    const { POSTRequest, GETRequest, PUTRequest, DELETERequest } = useAxiosHandler();
    const [users, setUsers] = useState([]);
    const [selectedID, setSelectedID] = useState('');
    const [formulario, setFormulario] = useState({
        documentNumber: '',
        name: '',
        lastName: '',
        email: ''
    });
    const [formError, setFormError] = useState(true);

    const postUser = (moduleName, formulario) => {
        if (formulario) {
            POSTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
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

    const deleteUser = (moduleName, id) => {
        if (id) {
            DELETERequest(`http://127.0.0.1:4000/${moduleName}`, id);
        }
    };

    useEffect(() => {
        if (selectedID) {
            DELETERequest('http://127.0.0.1:4000/student', selectedID);
        }
    }, [selectedID, DELETERequest]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const multipleFunction = (moduleName) => {
        if (
            formulario.documentNumber !== '' &&
            formulario.name !== '' &&
            formulario.lastName !== '' &&
            formulario.email !== ''
        ) {
            if (formulario.email.includes('@elpoli.edu.co')) {
                setFormError(false);
                postUser(moduleName, formulario);
            } else {
                alert('El correo institucional debe ser de la universidad');
            }
        } else {
            alert('Valide los datos en el formulario');
        }
    };

    const exportToExcel = (moduleName) => {
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
                selectedID,
                setSelectedID,
                formulario,
                handleChange,
                multipleFunction,
                exportToExcel,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;