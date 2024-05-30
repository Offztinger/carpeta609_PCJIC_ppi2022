import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CourseUserContext } from '../../../context/CourseUserContext/CourseUserContext';
import usePaginatorHandler from '../../../hooks/paginatorHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faTable } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import CourseUserBody from './CourseUserBody';
import './CourseUserTable.css'

function CourseUserTable({ deleteFunction, updateId }) {
	const {
		userCourses,
		selectedId,
		postUserCourse,
		putUserCourse,
		formulario,
		setFormulario,
	} = useContext(CourseUserContext);
	const [type, setType] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [deleteId, setDeleteId] = useState();
	const [currentSection, setCurrentSection] = useState(0);
	const { handleSectionClick, chunkArray } = usePaginatorHandler();

	useEffect(() => {
		setDeleteId(selectedId);
	}, [selectedId]);

	const showModal = setter => {
		setter(true);
		requestAnimationFrame(() => {
			document.querySelector('.modal-content').classList.add('active');
		});
	};

	const secciones = chunkArray(userCourses, 10);

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
		<div className='contenedorCursos'>
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
							deleteFunction(deleteId);
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
						{selectedId ? 'Editar' : 'Crear'} {'curso'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CourseUserBody type={type} />
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
							selectedId
								? putUserCourse(formulario)
								: postUserCourse(formulario);
							hideModal(setShowCreateModal);
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
									<th className='nombrecursolista' scope='col'>
										Nombre del estudiante/docente
									</th>
									<th className='descripcioncursolista' scope='col'>
										Nombre de la asignatura
									</th>
									<th className='nivelcursolista' scope='col'>
										Nivel del curso
									</th>
									<th className='acciones' scope='col'>
										Acciones
									</th>
								</tr>
							</thead>
							<tbody>
								{secciones[currentSection].map(course => {
									console.log(course);
									return (
										<tr key={course.id}>
											<td>{`${course.User.name} ${course.User.lastName}`}</td>
											<td>{course.Course.courseName}</td>
											<td className='courseuserlevelstyle'>{course.Course.courseLevel}</td>
											<td className='botonesaccion'>
												<button
													data-tooltip-id='deletecourse'
													data-tooltip-content='Eliminar curso'
													data-tooltip-place='top'
													type='button'
													className='btn btn-danger'
													onClick={() => {
														setShowDeleteModal(true);
														updateId(course.id);
													}}
												>
													<FontAwesomeIcon icon={faTrashAlt} />
													<Tooltip id='deletecourse' />
												</button>
											</td>
										</tr>
									);
								})}
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
					<a>
						<button
							className='crearModulo'
							onClick={() => {
								setFormulario({
									idUser: '',
									idCourse: '',
									active: true,
								});
								updateId('');
								setShowCreateModal(true);
								setType('student');
							}}
						>
							Relacionar estudiante
						</button>
					</a>
					<a>
						<button
							className='crearModulo'
							onClick={() => {
								setFormulario({
									idUser: '',
									idCourse: '',
									active: true,
								});
								updateId('');
								setShowCreateModal(true);
								setType('professor');
							}}
						>
							Relacionar <br></br> docente
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}

export default CourseUserTable;
