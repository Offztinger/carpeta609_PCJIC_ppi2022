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
import { Tooltip } from 'react-tooltip';

function UserTable({ deleteFunction, updateId }) {
	const [deleteIDEs, setDeleteIDEs] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);

	const {
		users,
		exportToExcel,
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
			password: user.password,
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

	const handleSectionClick = index => {
		setCurrentSection(index);
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
		}, 200); // Timeout should match animation duration
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
				onHide={() => hideModal(setShowCreateModal)}
				dialogClassName=''
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
							value={''}
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
											<Tooltip id='deleteuser' />
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
						{secciones.map((_, index) => (
							<span
								key={index}
								onClick={() => handleSectionClick(index, setCurrentSection)}
								className={currentSection === index ? 'active' : ''}
							>
								{index + 1}
							</span>
						))}
						<span
							onClick={() => {
								if (currentSection + 1 <= secciones.length - 1) {
									handleSectionClick(currentSection + 1, setCurrentSection);
								}
							}}
							disabled={currentSection === secciones.length - 1}
						>
							→
						</span>
					</div>
					<a >
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
					<button className='exportarExcel' onClick={exportToExcel}>
						<img src={download} alt='' style={{ height: '7vh' }} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default UserTable;
