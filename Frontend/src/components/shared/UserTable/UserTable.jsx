import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './UserTable.css';
import download from '../../../icons/downloadfile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../context/UserContext/UserContext';

function UserTable({ deleteFunction }) {
	const [deleteIDEs, setDeleteIDEs] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);

	const {
		users,
		setSelectedID,
		exportToExcel,
		selectedId,
		formulario,
		handleChange,
		multipleFunction,
	} = useContext(UserContext);
	const location = useLocation();

	let moduleName = location.pathname.split('/').pop();
	if (moduleName === 'student') {
		moduleName = 'estudiante';
	} else {
		moduleName = 'profesor';
	}

	useEffect(() => {
		setDeleteIDEs(selectedId);
	}, [selectedId]);

	const chunkArray = (array, size) => {
		const result = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	};

	const secciones = chunkArray(users, 10);

	const handleSectionClick = index => {
		setCurrentSection(index);
	};

	return (
		<div className='contenedorEstudiantes'>
			<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar registro</Modal.Title>
				</Modal.Header>
				<Modal.Body>Está seguro que desea eliminar este registro?</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						className='btn btn-dark'
						onClick={() => setShowDeleteModal(false)}
					>
						¡No!
					</Button>
					<Button
						variant='primary'
						className='btn btn-warning'
						onClick={() => {
							setShowDeleteModal(false);
							deleteFunction(deleteIDEs);
						}}
					>
						Sí, deseo eliminarlo
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Crear {moduleName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<label>Documento</label>
						<input
							type="number"
							name="documentNumber"
							className="form-control"
							value={formulario.documentNumber}
							onChange={handleChange}
						/>
						<small className="form-text text-muted">
							Recuerde colocar el documento de identidad sin errores.
						</small>
					</div>
					<div className="form-group">
						<label>Nombre</label>
						<input
							type="text"
							name="name"
							className="form-control"
							value={formulario.name}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Apellido</label>
						<input
							type="text"
							name="lastName"
							className="form-control"
							value={formulario.lastName}
							onChange={handleChange}
						/>
					</div>
					
					<div className="form-group">
						<label>Correo Institucional</label>
						<input
							type="email"
							name="email"
							className="form-control"
							value={formulario.email}
							onChange={handleChange}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						className='btn btn-dark'
						onClick={() => setShowCreateModal(false)}
					>
						Cancelar
					</Button>
					<Button
						variant='primary'
						className='btn btn-success'
						onClick={() => {
							multipleFunction(moduleName);
							setShowCreateModal(false);
						}}
					>
						Crear
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
												onClick={() => setSelectedID(user.documentNumber)}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>
											<button
												type='button'
												className='btn btn-danger'
												onClick={() => {
													setShowDeleteModal(true);
													setSelectedID(user.documentNumber);
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
						<button className='crearModulo' onClick={() => setShowCreateModal(true)}>
							Crear {moduleName}
						</button>
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