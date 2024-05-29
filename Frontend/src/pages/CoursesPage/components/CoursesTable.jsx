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
import { Tooltip } from 'react-tooltip';

function CoursesTable({ deleteFunction, updateId }) {
	const [deleteIDEs, setDeleteIDEs] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);
	const { handleSectionClick, chunkArray } = usePaginatorHandler();

	const {
		courses,
		exportToExcel,
		selectedId,
		setFormulario,
		formulario,
		handleChange,
		handleRequestFunction,
	} = useContext(CoursesContext);

	useEffect(() => {
		setDeleteIDEs(selectedId);
	}, [selectedId]);

	const mountEditInfo = course => {
		updateId(course.id);
		setShowCreateModal(true);
		setFormulario({
			id: course.id,
			courseName: course.courseName,
			courseDescription: course.courseDescription,
			idProfessor: course.idProfessor,
			courseLevel: course.courseLevel,
		});
	};

	const secciones = chunkArray(courses, 10);

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
						{'curso'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='form-group'>
						<label>Nombre del curso</label>
						<input
							type='text'
							name='courseName'
							className='form-control'
							value={formulario.courseName}
							onChange={handleChange}
						/>
						<small className='form-text text-muted'>
							Recuerde colocar el nombre del curso sin errores.
						</small>
					</div>
					<div className='form-group'>
						<label>Descripción del curso</label>
						<input
							type='text'
							name='courseDescription'
							className='form-control'
							value={formulario.courseDescription}
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label>ID del profesor (opcional)</label>
						<input
							type='text'
							name='idProfessor'
							className='form-control'
							value={formulario.idProfessor}
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label>Nivel del curso (opcional)</label>
						<input
							type='text'
							name='courseLevel'
							className='form-control'
							value={formulario.courseLevel}
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
							handleRequestFunction(courses);
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
										Nombre del curso
									</th>
									<th className='descripcioncursolista' scope='col'>
										Descripción del curso
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
								{secciones[currentSection].map((user, idx) => (
									<tr key={idx}>
										<td>{user.courseName}</td>
										<td>{user.courseDescription}</td>
										<td className='nivelcursolista'>{user.courseLevel}</td>
										<td className='botonesaccion'>
											<button
												data-tooltip-id='editcourse'
												data-tooltip-content='Editar curso'
												data-tooltip-place='top'
												type='button'
												className='btn btn-success'
												onClick={() => {
													mountEditInfo(user);
												}}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>
											<Tooltip id='editcourse' />
											<button
												data-tooltip-id='deletecourse'
												data-tooltip-content='Eliminar curso'
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
											<Tooltip id='deletecourse' />
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
									courseName: '',
									courseDescription: '',
									idProfessor: '',
									courseLevel: '',
								});
								updateId('');
								setShowCreateModal(true);
							}}
						>
							Crear {'curso'}
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
