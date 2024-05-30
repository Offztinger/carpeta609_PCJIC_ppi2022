import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { TeamContext } from '../../../context/TeamContext/TeamContext';
import usePaginatorHandler from '../../../hooks/paginatorHandler';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TeamMemberForm from './TeamMemberForm';
import useAxiosHandler from '../../../hooks/axiosHandler';
import { useNavigate } from 'react-router-dom';

export default function TeamMemberTable({
	updateId,
	folderNumber,
	deleteFunction,
}) {
	const navigate = useNavigate();
	const { POSTRequest } = useAxiosHandler();
	const { teamMembers, selectedId, data, getTeamMembers, setFolderId } =
		useContext(TeamContext);
	const [currentSection, setCurrentSection] = useState(0);
	const { handleSectionClick, chunkArray } = usePaginatorHandler();
	const secciones = chunkArray(teamMembers, 10);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState('');

	useEffect(() => {
		selectedId && setDeleteId(selectedId);
	}, [selectedId]);

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

	const onSubmit = async () => {
		if (data.length > 0) {
			if (teamMembers.length < 3) {
				await POSTRequest(data, 'http://127.0.0.1:4000/teamMember');
				getTeamMembers(folderNumber);
				showModal(setShowCreateModal);
			} else {
				alert('No se pueden agregar más de 3 estudiantes');
			}
		} else {
			alert('No hay estudiantes seleccionados');
		}
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
					<TeamMemberForm folderNumber={folderNumber} />
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
										Cedula
									</th>
									<th className='nombreequipostyle' scope='col'>
										Nombre
									</th>
									<th scope='col'>Correo electronico</th>
									<th className='accionesteams' scope='col'>
										Acciones
									</th>
								</tr>
							</thead>
							<tbody>
								{secciones[currentSection].map((teamMember, idx) => {
									return (
										<tr key={idx}>
											<td>{teamMember.student.documentNumber}</td>
											<td>{`${teamMember.student.name} ${teamMember.student.lastName}`}</td>
											<td>{teamMember.student.email}</td>
											<td className='botonesaccion'>
												<button
													type='button'
													className='btn btn-danger'
													onClick={() => {
														setShowDeleteModal(true);
														updateId(teamMember.id);
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
					<div className='flex'>
						<a>
							<button
								className='crearModulo mr-8'
								onClick={() => {
									updateId('');
									showModal(setShowCreateModal);
								}}
							>
								Añadir estudiantes
							</button>
						</a>
						<a>
							<button
								className='crearModulo'
								onClick={() => {
									updateId('');
									navigate('/teams');
									setFolderId(undefined);
								}}
							>
								Volver a equipo
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
