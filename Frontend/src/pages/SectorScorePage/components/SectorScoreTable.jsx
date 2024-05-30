import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './SectorScoreTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { SectorScoreContext } from '../../../context/SectorScoreContext/SectorScoreContext';
import { Tooltip } from 'react-tooltip';

const SectorScoreTable = ({ deleteFunction, updateId }) => {
	const [deleteID, setDeleteID] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);

	const {
		sectorScores,
		selectedId,
		setFormulario,
		formulario,
		handleChange,
		handleRequestFunction,
	} = useContext(SectorScoreContext);

	useEffect(() => {
		setDeleteID(selectedId);
	}, [selectedId]);

	useEffect(() => {
		if (showCreateModal) {
			setFormulario(prevFormulario => ({
				...prevFormulario,
				scoreSector: 0,
			}));
		}
	}, [showCreateModal, setFormulario]);

	const mountEditInfo = sectorScore => {
		updateId(sectorScore.id);
		setShowCreateModal(true);
		setFormulario({
			id: sectorScore.id,
			idSectorCourse: sectorScore.idSectorCourse,
			scoreSector: sectorScore.scoreSector,
			folderNumberId: sectorScore.folderNumber,
		});
	};

	const chunkArray = (array, size) => {
		const result = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	};

	const secciones = chunkArray(sectorScores || [], 10);

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
		<div className='sectorList'>
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
						{selectedId ? 'Editar' : 'Crear'} {'calificación de cuadrante'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='form-group'>
						<label>Calificación del cuadrante</label>
						<input
							type='number'
							name='scoreSector'
							className='form-control'
							value={formulario.scoreSector}
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
							handleRequestFunction();
							hideModal(setShowCreateModal);
						}}
					>
						{selectedId ? 'Editar' : 'Crear'}
					</Button>
				</Modal.Footer>
			</Modal>

			<div className='sectorList'>
				{secciones[currentSection] && (
					<div key={currentSection} className='seccion'>
						<table className='table'>
							<thead>
								<tr>
									<th className='descripcioncursolista' scope='col'>
										Nombre del usuario
									</th>
									<th className='nombrecursolista' scope='col'>
										Objetivo del cuadrante
									</th>
									<th className='descripcioncursolista' scope='col'>
										Número de carpeta
									</th>
									<th className='descripcioncursolista' scope='col'>
										Calificación del cuadrante
									</th>
									<th className='acciones' scope='col'>
										Acciones
									</th>
								</tr>
							</thead>
							<tbody>
								{secciones[currentSection].map((sectorScore, idx) => (
									<tr key={idx}>
										<td>{`${sectorScore.student.name} ${sectorScore.student.lastName}`}</td>
										<td>{sectorScore.sectorCourse.sectorObjectiveCourse}</td>
										<td>{sectorScore.folderNumber.folderNumber}</td>
										<td>{sectorScore.sectorScore.scoreSector}</td>
										<td className='botonesaccion'>
											<button
												data-tooltip-id='editscore'
												data-tooltip-content='Editar calififcación'
												data-tooltip-place='top'
												type='button'
												className='btn btn-success'
												onClick={() => {
													mountEditInfo(sectorScore);
												}}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>
											<Tooltip id='editscore' />
											<button
												data-tooltip-id='deletescore'
												data-tooltip-content='Eliminar calificación'
												data-tooltip-place='top'
												type='button'
												className='btn btn-danger'
												onClick={() => {
													setShowDeleteModal(true);
													setDeleteID(sectorScore.id);
												}}
											>
												<FontAwesomeIcon icon={faTrashCan} />
											</button>
											<Tooltip id='deletescore' />
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
									handleSectionClick(currentSection - 1);
								}
							}}
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
							onClick={() => {
								if (currentSection + 1 <= secciones.length - 1) {
									handleSectionClick(currentSection + 1);
								}
							}}
							disabled={currentSection === secciones.length - 1}
						>
							→
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SectorScoreTable;
