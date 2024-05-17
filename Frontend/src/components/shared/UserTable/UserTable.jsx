import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './UserTable.css';
import download from '../../../icons/downloadfile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../context/UserContext/UserContext';

function UserTable() {
    // const [deleteIDEs, setDeleteIDEs] = useState();
    const [show, setShow] = useState(false);
    // const { DELETERequest } = useAxiosHandler();
    const [currentSection, setCurrentSection] = useState(0);
    const { users, setSelectedID, exportToExcel } = useContext(UserContext);
    const location = useLocation();

    let moduleName = location.pathname.split('/').pop(); // Obtener el nombre del módulo desde la ruta
    if (moduleName != 'estudiantes') {
        moduleName = moduleName.slice(0, -2); // Remover los dos últimos caracteres si terminan en 'es'
    }
    else{
      moduleName = moduleName.slice(0, -1);
    }

    // useEffect(() => {
    //     deleteIDEs && DELETERequest('http://localhost:4000/student', deleteIDEs);
    // }, [deleteIDEs]);

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const secciones = chunkArray(users, 8);

    const handleSectionClick = index => {
        setCurrentSection(index);
    };

    return (
        <div className='contenedorEstudiantes'>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>Está seguro que desea eliminar este registro?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        className='btn btn-dark'
                        onClick={() => setShow(false)}
                    >
                        ¡No!
                    </Button>
                    <Button
                        variant='primary'
                        className='btn btn-warning'
                        onClick={() => {
                            setShow(false);
                            setDeleteIDEs(deleteIDEs);
                        }}
                    >
                        Sí, deseo eliminarlo
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='usersList'>
                {secciones[currentSection] && (
                    <div key={currentSection} className='seccion'>
                        <h3>Sección {currentSection + 1}</h3>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Documento</th>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Apellido</th>
                                    <th scope='col'>Email</th>
                                    <th className='acciones' scope='col'>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {secciones[currentSection].map((user, idx) => (
                                    <tr key={idx}>
                                        <td>{user.documentNumber}</td>
                                        <td>{user.name}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>

                                        <td className='botonesaccion'>
                                            <button
                                                type='button'
                                                className='btn btn-success'
                                                onClick={() => setSelectedID(user.documento)}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button
                                                type='button'
                                                className='btn btn-danger'
                                                onClick={() => {
                                                    setShow(true);
                                                    setSelectedID(user.documento);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className='complementosTablas'>
                    <div className='sections'>
                        <span
                            onClick={() => handleSectionClick(currentSection - 1)}
                            disabled={currentSection === 0}
                        >
                            ←
                        </span>
                        {secciones.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => handleSectionClick(index)}
                                className={currentSection === index ? 'active' : ''}
                            >
                                {index + 1}
                            </span>
                        ))}
                        <span
                            onClick={() => handleSectionClick(currentSection + 1)}
                            disabled={currentSection === secciones.length - 1}
                        >
                            →
                        </span>
                    </div>
                    <a data-tooltip-id='my-tooltip' data-tooltip-content='Hello world!'>
                        <button className='crearModulo'>Crear {moduleName}</button>
                    </a>
                    <button className='exportarExcel' onClick={exportToExcel}>
                        <img src={download} alt='' style={{ height: '7vh' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserTable;