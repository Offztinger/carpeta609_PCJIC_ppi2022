import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../SectorCoursePage/components/SectorCourseTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { SectorContext } from '../../../context/SectorContext/SectorContext'; // Importa el contexto de cursos
import usePaginatorHandler from '../../../hooks/paginatorHandler'; // Importa el hook de paginación
import { Tooltip } from 'react-tooltip';
import SectorCourseBody from '../../SectorPage/components/SectorCourseBody'; // Importa el componente SectorCourseBody

function SectorCourseTable({ deleteFunction, updateId }) {
	const [deleteId, setDeleteId] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);
	const [isSectorCourse, setIsSectorCourse] = useState(false);
	const { handleSectionClick, chunkArray } = usePaginatorHandler();

	const {
		sectorCourses,
		selectedId,
		setFormularioCourse,
		handleRequestFunction,
		formularioCourse,
		getMethod,
	} = useContext(SectorContext);

	useEffect(() => {
		setDeleteId(selectedId);
	}, [selectedId]);

	useEffect(() => {
		console.log('formularioCourse', formularioCourse);
	}, [formularioCourse]);

	const mountEditInfo = sectorCourse => {
		getMethod(`sectorCourse/${sectorCourse.id}`, setFormularioCourse);
		updateId(sectorCourse.id);
		setShowCreateModal(true);
	};

	const secciones = chunkArray(sectorCourses, 10);

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
		<div className='sectorCourseList'>
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
						{selectedId ? 'Editar' : 'Crear'} {'cuadrante'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<SectorCourseBody />
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
							handleRequestFunction('sectorCourse', formularioCourse);
							hideModal(setShowCreateModal);
						}}
					>
						{selectedId ? 'Editar' : 'Crear'}
					</Button>
				</Modal.Footer>
			</Modal>

			<div className='sectorCourseList'>
				{secciones[currentSection] && (
					<div key={currentSection} className='seccion'>
						<table className='table'>
							<thead>
								<tr>
									<th className='nombrecuadrantelista' scope='col'>
										Nombre del cuadrante
									</th>
									<th className='descripcioncursolista' scope='col'>
										Curso del cuadrante
									</th>
									<th className='descripcioncursolista' scope='col'>
										Objetivo del cuadrante
									</th>
									<th className='acciones' scope='col'>
										Acciones
									</th>
								</tr>
							</thead>
							<tbody>
								{secciones[currentSection].map((sectorCourse, idx) => (
									<tr key={idx}>
										<td>{sectorCourse.sectorName}</td>
										<td>{sectorCourse.courseName}</td>
										<td>{sectorCourse.sectorObjectiveCourse}</td>
										<td className='botonesaccion'>
											<button
												data-tooltip-id='editsectorCourse'
												data-tooltip-content='Editar cuadrante'
												data-tooltip-place='top'
												type='button'
												className='btn btn-success'
												onClick={() => {
													mountEditInfo(sectorCourse);
													setShowCreateModal(true);
												}}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>
											<Tooltip id='editsectorCourse' />
											<button
												data-tooltip-id='deletesectorCourse'
												data-tooltip-content='Eliminar cuadrante'
												data-tooltip-place='top'
												type='button'
												className='btn btn-danger'
												onClick={() => {
													updateId(sectorCourse.id);
													setShowDeleteModal(true);
												}}
											>
												<FontAwesomeIcon icon={faTrashCan} />
											</button>
											<Tooltip id='deletesectorCourse' />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				<div className='complementosTablasSector'>
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
								setFormularioCourse({
									id: '',
									sectorCourseName: '',
									sectorCourseObjective: '',
								});
								updateId('');
								setShowCreateModal(true);
								setIsSectorCourse(false);
							}}
						>
							Crear cuadrante
						</button>
					</a>
					<a>
						<button
							className='crearModulo'
							onClick={() => {
								setFormularioCourse({
									id: '',
									sectorCourseName: '',
									sectorCourseObjective: '',
								});
								updateId('');
								setShowCreateModal(true);
								setIsSectorCourse(true);
							}}
						>
							Cuadrante Curso
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}

export default SectorCourseTable;
