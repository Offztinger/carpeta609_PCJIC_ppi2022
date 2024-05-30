import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TeamContext } from '../../../context/TeamContext/TeamContext';
import usePaginatorHandler from '../../../hooks/paginatorHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrashCan,
	faPenToSquare,
	faNewspaper,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { ScheduleContext } from '../../../context/ScheduleContext/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import TeamForm from './TeamForm';
import useAxiosHandler from '../../../hooks/axiosHandler';
export default function TeamTable({ deleteFunction, updateId }) {
	const { GETRequest } = useAxiosHandler();
	const navigate = useNavigate();
	const {
		teams,
		selectedId,
		setShowTeamMembers,
		setFolderId,
		setFormulario,
		onSubmit,
		formulario,
	} = useContext(TeamContext);
	const [deleteId, setDeleteId] = useState();
	const [currentSection, setCurrentSection] = useState(0);
	const { handleSectionClick, chunkArray } = usePaginatorHandler();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	useEffect(() => {
		setDeleteId(selectedId);
	}, [selectedId]);

	const secciones = chunkArray(teams, 10);

	const mountEditInfo = async team => {
		updateId(team.id);
		setShowCreateModal(true);
		await GETRequest(`http://127.0.0.1:4000/teams/${team.id}`, setFormulario);
	};

	useEffect(() => {
		console.log('formulario', formulario);
	}, [formulario]);

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
		<div>
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
				onEntered={() => showModal(setShowCreateModal)}
				onExit={() => hideModal(setShowCreateModal)}
			>
				<Modal.Header closeButton>
					<Modal.Title>{selectedId ? 'Editar' : 'Crear'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<TeamForm />
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
							hideModal(setShowCreateModal);
							onSubmit();
						}}
					>
						{selectedId ? 'Editar' : 'Crear'}
					</Button>
				</Modal.Footer>
			</Modal>
			<div className='teamsList'>
				{secciones[currentSection] && (
					<div key={currentSection} className='seccion'>
						<table className='table'>
							<thead>
								<tr>
									<th className='numerocarpetastyle' scope='col'>
										Número carpeta
									</th>
									<th className='nombreequipostyle' scope='col'>
										Nombre equipo
									</th>
									<th scope='col'>Nombre del curso</th>
									<th scope='col'>Nombre del docente</th>
									<th className='accionesteams' scope='col'>
										Acciones
									</th>
								</tr>
							</thead>
							<tbody>
								{secciones[currentSection].map((team, idx) => {
									return (
										<tr key={idx}>
											<td>{team.folderNumber}</td>
											<td>{team.teamName}</td>
											<td>{team.idCourse}</td>
											<td>{team.idUser}</td>
											<td className='botonesaccion'>
												<button
													data-tooltip-id='editteam'
													data-tooltip-content='Editar equipo'
													data-tooltip-place='top'
													type='button'
													className='btn btn-success'
													onClick={async () => {
														await mountEditInfo(team);
													}}
												>
													<FontAwesomeIcon icon={faPenToSquare} />
												</button>
												<Tooltip id='editteam' />
												<button
													data-tooltip-id='teammembers'
													data-tooltip-content='Ver miembros del equipo'
													data-tooltip-place='top'
													type='button'
													className='btn btn-primary'
													onClick={() => {
														setFolderId(team.id);
														navigate(`/teams/${team.id}`);
														setShowTeamMembers(true);
													}}
												>
													<FontAwesomeIcon icon={faUsers} />
												</button>
												<Tooltip id='teammembers' />
												<button
													data-tooltip-id='bitacora'
													data-tooltip-content='Ver bitacora'
													data-tooltip-place='top'
													type='button'
													className='btn btn-primary'
													onClick={() => {
														navigate(`/logbook/${team.id}`);
													}}
												>
													<FontAwesomeIcon icon={faNewspaper} />
												</button>
												<Tooltip id='bitacora' />
												<button
													data-tooltip-id='delete'
													data-tooltip-content='Eliminar equipo'
													data-tooltip-place='top'
													type='button'
													className='btn btn-danger'
													data-tip='Eliminar'
													onClick={() => {
														setShowDeleteModal(true);
														setDeleteId(team.id);
													}}
												>
													<FontAwesomeIcon icon={faTrashCan} />
												</button>
												<Tooltip id='delete' />
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
					<a>
						<button
							className='crearModulo'
							onClick={() => {
								setFormulario({
									id: '',
									folderNumber: '',
									teamName: '',
									idCourse: '',
									idUser: '',
								});
								updateId('');
								showModal(setShowCreateModal);
							}}
						>
							Crear equipo
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}
