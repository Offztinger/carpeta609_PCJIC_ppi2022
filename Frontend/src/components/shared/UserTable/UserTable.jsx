import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './UserTable.css';
import download from '../../../icons/downloadfile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrashCan,
	faPenToSquare,
	faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../context/UserContext/UserContext';
import { Tooltip } from 'react-tooltip';

function UserTable({ deleteFunction, updateId }) {
	const [deleteIDEs, setDeleteIDEs] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);

	const {
		users,
		exportToExcelProfessors,
		exportToExcelStudents,
		selectedId,
		setFormulario,
		formulario,
		handleChange,
		handleRequestFunction,
	} = useContext(UserContext);
	const location = useLocation();

	let moduleName = location.pathname.split('/')[1];

	useEffect(() => {
		setDeleteIDEs(selectedId);
	}, [selectedId]);

	useEffect(() => {
		if (showCreateModal) {
			setFormulario(prevFormulario => ({
				...prevFormulario,
				password: '',
			}));
		}
	}, [showCreateModal, setFormulario]);

	const validateRole = () => {
		if (moduleName === 'student') {
			return '3284495c-136e-4215-b8cc-30e6d9ca52b0';
		} else if (moduleName === 'professor') {
			return '1164b212-c28e-4f5c-a886-36795031cbf3';
		}
	};

	const mountEditInfo = user => {
		updateId(user.id);
		setShowCreateModal(true);
		setFormulario({
			id: user.id,
			documentNumber: user.documentNumber,
			name: user.name,
			lastName: user.lastName,
			email: user.email,
			password: '',
			idRole: user.idRole,
		});
	};

	const chunkArray = (array, size) => {
		const result = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	};

	const secciones = chunkArray(users, 10);

	const renderSectionButtons = () => {
		const sectionButtons = [];

		sectionButtons.push(
			<span
				key={0}
				onClick={() => handleSectionClick(0, setCurrentSection)}
				className={currentSection === 0 ? 'active' : ''}
			>
				1
			</span>,
		);

		if (currentSection >= 2) {
			sectionButtons.push(
				<span key={currentSection} className='active'>
					{currentSection + 1}
				</span>,
			);
		} else {
			sectionButtons.push(
				<span
					key={1}
					onClick={() => handleSectionClick(1, setCurrentSection)}
					className={currentSection === 1 ? 'active' : ''}
				>
					2
				</span>,
			);
		}

		if (secciones.length > 2) {
			sectionButtons.push(
				<span
					key={secciones.length - 1}
					onClick={() =>
						handleSectionClick(secciones.length - 1, setCurrentSection)
					}
					className={currentSection === secciones.length - 1 ? 'active' : ''}
				>
					{secciones.length}
				</span>,
			);
		}

		return sectionButtons;
	};

	const showModal = setter => {
		setter(true);
		requestAnimationFrame(() => {
			document.querySelector('.modal-content').classList.add('active');
		});
	};

	const hideModal = setter => {
		const modalContent = document.querySelector('.modal-content');
		modalContent.classList.remove('active');
		modalContent.classList.add('inactive');
		setTimeout(() => {
			setter(false);
			modalContent.classList.remove('inactive');
		}, 200);
	};

	const exportExcelButton = moduleName => {
		if (moduleName === 'student') {
			exportToExcelStudents();
		} else {
			exportToExcelProfessors();
		}
	};

	return (
		<div className='contenedorEstudiantes'>
			<Modal
				show={showDeleteModal}
				onHide={() => hideModal(setShowDeleteModal)}
				dialogClassName=''
				onEntered={() => showModal(setShowDeleteModal)}
				onExit={() => hideModal(setShowDeleteModal)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar registro</Modal.Title>
				</Modal.Header>
				<Modal.Body>¿Está seguro que desea eliminar este registro?</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						className='btn btn-dark'
						onClick={() => hideModal(setShowDeleteModal)}
					>
						¡No!
					</Button>
					<Button
						variant='primary'
						className='btn btn-warning'
						onClick={() => {
							hideModal(setShowDeleteModal);
							deleteFunction(deleteIDEs);
						}}
					>
						Sí, deseo eliminarlo
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showCreateModal}
				dialogClassName=''
				onHide={() => hideModal(setShowCreateModal)}
				onEntered={() => showModal(setShowCreateModal)}
				onExit={() => hideModal(setShowCreateModal)}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{selectedId ? 'Editar' : 'Crear'}{' '}
						{moduleName === 'student' ? 'estudiante' : 'profesor'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='form-group'>
						<label>Documento</label>
						<input
							type='number'
							name='documentNumber'
							className='form-control'
							disabled={selectedId ? true : false}
							value={formulario.documentNumber}
							onChange={handleChange}
						/>
						<small className='form-text text-muted'>
							Recuerde colocar el documento de identidad sin errores.
						</small>
					</div>
					<div className='form-group'>
						<label>Nombre</label>
						<input
							type='text'
							name='name'
							className='form-control'
							value={formulario.name}
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label>Apellido</label>
						<input
							type='text'
							name='lastName'
							className='form-control'
							value={formulario.lastName}
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label>Contraseña (opcional)</label>
						<input
							type='password'
							name='password'
							className='form-control'
							value={formulario.password}
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label>Correo Institucional</label>
						<input
							type='email'
							name='email'
							className='form-control'
							value={formulario.email}
							onChange={handleChange}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						className='btn btn-dark'
						onClick={() => hideModal(setShowCreateModal)}
					>
						Cancelar
					</Button>
					<Button
						variant='primary'
						className='btn btn-success'
						onClick={() => {
							handleRequestFunction(moduleName);
							hideModal(setShowCreateModal);
						}}
					>
						{selectedId ? 'Editar' : 'Crear'}
					</Button>
				</Modal.Footer>
			</Modal>

			<div className='usersList'>
				{secciones[currentSection] && (
					<div key={currentSection} className='seccion'>
						<table className='table'>
							<thead>
								<tr>
									<th className='thusers' scope='col'>
										Documento
									</th>
									<th className='thusers' scope='col'>
										Nombre
									</th>
									<th className='thusers' scope='col'>
										Apellido
									</th>
									<th className='themail' scope='col'>
										Email
									</th>
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
												data-tooltip-id='edituser'
												data-tooltip-content='Editar usuario'
												data-tooltip-place='top'
												type='button'
												className='btn btn-success'
												onClick={() => {
													mountEditInfo(user);
												}}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>
											<Tooltip id='edituser' />
											<button
												data-tooltip-id='deleteuser'
												data-tooltip-content='Eliminar usuario'
												data-tooltip-place='top'
												type='button'
												className='btn btn-danger'
												onClick={() => {
													setShowDeleteModal(true);
													setDeleteIDEs(user.id);
												}}
											>
												<FontAwesomeIcon icon={faTrashCan} />
											</button>
											<Tooltip id='copyid' />
											<button
												data-tooltip-id='copyid'
												data-tooltip-content='Copiar ID del Usuario'
												data-tooltip-place='top'
												type='button'
												className='btn btn-primary'
												onClick={() => {
													navigator.clipboard
														.writeText(user.id)
														.then(() => alert('ID copiado al portapapeles'))
														.catch(error =>
															console.error('Error al copiar ID: ', error),
														);
												}}
											>
												<FontAwesomeIcon icon={faCopy} />
											</button>
											<Tooltip id='copyid' />
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
							onClick={() => {
								if (currentSection > 0) {
									handleSectionClick(currentSection - 1, setCurrentSection);
								}
							}}
							disabled={currentSection === 0}
						>
							←
						</span>
						{renderSectionButtons()}
						<span
							onClick={() => {
								if (currentSection < secciones.length - 1) {
									handleSectionClick(currentSection + 1, setCurrentSection);
								}
							}}
							disabled={currentSection === secciones.length - 1}
						>
							→
						</span>
					</div>
					<a>
						<button
							className='crearModulo'
							onClick={() => {
								setFormulario({
									id: '',
									documentNumber: 0,
									name: '',
									lastName: '',
									email: '',
									password: '',
									idRole: validateRole(),
								});
								updateId('');
								setShowCreateModal(true);
							}}
						>
							Crear {moduleName == 'student' ? 'estudiante' : 'profesor'}
						</button>
					</a>
					<button className='exportarExcel' onClick={() => exportExcelButton()}>
						<img src={download} alt='' style={{ height: '7vh' }} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default UserTable;
