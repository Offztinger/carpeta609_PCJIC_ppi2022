import React from 'react';
import { useEffect, useState, useContext } from 'react';
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

export default function TeamTable({ updateId }) {
	const navigate = useNavigate();

	const { setIdLogbook, logbook } = useContext(ScheduleContext);
	const { teams, selectedId, setShowTeamMembers, setFolderId } =
		useContext(TeamContext);
	const [deleteIDEs, setDeleteIDEs] = useState();
	const [show, setShow] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);
	const { handleSectionClick, chunkArray } = usePaginatorHandler();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	useEffect(() => {
		if (logbook != undefined) {
			navigate(`/logbook/${logbook.id}`);
		}
	}, [logbook]);

	useEffect(() => {
		setDeleteIDEs(selectedId);
	}, [selectedId]);

	const secciones = chunkArray(teams, 10);

	const mountEditInfo = team => {
		updateId(team.id);
		setShowCreateModal(true);
		setFormulario({
			id: team.id,
			folderNumber: team.folderNumber,
			teamName: team.teamName,
			idCourse: team.idCourse,
			idUser: team.idUser,
		});
	};

	return (
		<div>
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
							deleteEquipo();
						}}
					>
						Sí, deseo eliminarlo
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
													type='button'
													className='btn btn-success'
													onClick={() => {
														mountEditInfo(team);
													}}
												>
													<FontAwesomeIcon icon={faPenToSquare} />
												</button>
												<button
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
												<button
													type='button'
													className='btn btn-primary'
													onClick={() => {
														setIdLogbook(team.id);
													}}
												>
													<FontAwesomeIcon icon={faNewspaper} />
												</button>
												<button
													type='button'
													className='btn btn-danger'
													onClick={() => {
														setShowDeleteModal(true);
														setDeleteIDEs(team.id);
													}}
												>
													<FontAwesomeIcon icon={faTrashCan} />
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
					<a data-tooltip-id='my-tooltip' data-tooltip-content='Hello world!'>
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
								setShowCreateModal(true);
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
