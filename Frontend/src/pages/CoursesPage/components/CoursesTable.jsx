import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './CoursesTable.css';
import download from '../../../icons/downloadfile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { CoursesContext } from '../../../context/CoursesContext/CoursesContext'; // Importa el contexto de cursos
import usePaginatorHandler from '../../../hooks/paginatorHandler'; // Importa el hook de paginación

function CoursesTable({ deleteFunction, updateId }) {
	// Cambia el nombre del componente a CoursesTable
	const [deleteIDEs, setDeleteIDEs] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);
	const { handleSectionClick, chunkArray } = usePaginatorHandler();

	const {
		courses, // Cambia users por courses
		exportToExcel,
		selectedId,
		setFormulario,
		formulario,
		handleChange,
		handleRequestFunction,
	} = useContext(CoursesContext); // Cambia UserContext por CoursesContext
	const location = useLocation();

	let moduleName = location.pathname.split('/')[1];

	useEffect(() => {
		setDeleteIDEs(selectedId);
	}, [selectedId]);

	const validateRole = () => {
		// Puedes adaptar esta lógica según las necesidades de tu aplicación
	};

	// Función para montar la información de edición
	const mountEditInfo = course => {
		updateId(course.id);
		setShowCreateModal(true);
		setFormulario({
			id: course.id,
			courseName: course.courseName, // Cambia user.name por course.courseName
			courseDescription: course.courseDescription, // Cambia user.lastName por course.courseDescription
			idProfessor: course.idProfessor, // Cambia user.email por course.idProfessor
			courseLevel: course.courseLevel, // Ajusta según la estructura de tu objeto de curso
		});
	};

	const secciones = chunkArray(courses, 10); // Cambia users por courses

	return (
		<div className='contenedorCursos'>
			<Modal
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
				dialogClassName={showDeleteModal ? 'active' : ''}
				onEntered={() =>
					document.querySelector('.modal-content').classList.add('active')
				}
				onExit={() =>
					document.querySelector('.modal-content').classList.remove('active')
				}
			>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar registro</Modal.Title>
				</Modal.Header>
				<Modal.Body>¿Está seguro que desea eliminar este registro?</Modal.Body>
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

			<Modal
				show={showCreateModal}
				onHide={() => setShowCreateModal(false)}
				dialogClassName={showCreateModal ? 'active' : ''}
				onEntered={() =>
					document.querySelector('.modal-content').classList.add('active')
				}
				onExit={() =>
					document.querySelector('.modal-content').classList.remove('active')
				}
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
						onClick={() => setShowCreateModal(false)}
					>
						Cancelar
					</Button>
					<Button
						variant='primary'
						className='btn btn-success'
						onClick={() => {
							handleRequestFunction(moduleName);
							setShowCreateModal(false);
						}}
					>
						{selectedId ? 'Editar' : 'Crear'}
					</Button>
				</Modal.Footer>
			</Modal>

			<div className='coursesList'>
				{secciones[currentSection] && (
					<div key={currentSection} className='seccion'>
						<table className='table'>
							<thead>
								<tr>
									<th className='nombrecursolista'scope='col'>Nombre del curso</th>
									<th className='descripcioncursolista' scope='col'>Descripción del curso</th>
									<th className='nivelcursolista' scope='col'>Nivel del curso</th>
									<th className='acciones' scope='col'>
										Acciones
									</th>
								</tr>
							</thead>
							<tbody>
								{secciones[currentSection].map((user, idx) => (
									<tr key={idx}>
										<td>{user.courseName}</td>
										<td>{user.courseDescription}</td>
										<td className='nivelcursolista'>{user.courseLevel}</td>
										<td className='botonesaccion'>
											<button
												type='button'
												className='btn btn-success'
												onClick={() => {
													mountEditInfo(user);
												}}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>
											<button
												type='button'
												className='btn btn-danger'
												onClick={() => {
													setShowDeleteModal(true);
													setDeleteIDEs(user.id);
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
								onClick={() => {
									if (currentSection + 1 <= secciones.length - 1) {
										handleSectionClick(currentSection + 1, setCurrentSection);
									}
								}}
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
					<a data-tooltip-id='my-tooltip' data-tooltip-content='Hello world!'>
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
							Crear {moduleName === 'student' ? 'estudiante' : 'profesor'}
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

export default CoursesTable;
