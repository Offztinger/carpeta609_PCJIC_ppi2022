import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './SectorTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { SectorContext } from '../../../context/SectorContext/SectorContext'; // Importa el contexto de cursos
import usePaginatorHandler from '../../../hooks/paginatorHandler'; // Importa el hook de paginación
import { Tooltip } from 'react-tooltip';

function SectorTable({ deleteFunction, updateId }) {
    const [deleteID, setDeleteID] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const { handleSectionClick, chunkArray } = usePaginatorHandler();

    const {
        sectors,
        selectedId,
        setFormulario,
        formulario,
        handleChange,
        handleRequestFunction,
    } = useContext(SectorContext);

    useEffect(() => {
        setDeleteID(selectedId);
    }, [selectedId]);

    const mountEditInfo = sector => {
        updateId(sector.id);
        setShowCreateModal(true);
        setFormulario({
            id: sector.id,
            sectorName: sector.sectorName,
            sectorObjective: sector.sectorObjective,
        });
    };

    const secciones = chunkArray(sectors, 10);

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
						{selectedId ? 'Editar' : 'Crear'}{' '}
						{'cuadrante'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='form-group'>
						<label>Nombre del cuadrante</label>
						<input
							type='text'
							name='sectorName'
							className='form-control'
							value={formulario.sectorName}
							onChange={handleChange}
						/>
						<small className='form-text text-muted'>
							Recuerde colocar el nombre del cuadrante sin errores.
						</small>
					</div>
					<div className='form-group'>
						<label>Objetivo del cuadrante</label>
						<input
							type='text'
							name='sectorObjective'
							className='form-control'
							value={formulario.sectorObjective}
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
							handleRequestFunction(sectors);
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
									<th className='nombrecursolista' scope='col'>
										Nombre del cuadrante
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
								{secciones[currentSection].map((user, idx) => (
									<tr key={idx}>
										<td>{user.sectorName}</td>
										<td>{user.sectorObjective}</td>
										<td className='botonesaccion'>
											<button
												data-tooltip-id='editsector'
												data-tooltip-content='Editar cuadrante'
												data-tooltip-place='top'
												type='button'
												className='btn btn-success'
												onClick={() => {
													mountEditInfo(user);
												}}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>
											<Tooltip id='editsector' />
											<button
												data-tooltip-id='deletesector'
												data-tooltip-content='Eliminar cuadrante'
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
											<Tooltip id='deletesector' />
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
                                    sectorName: '',
                                    sectorObjective: '',
								});
								updateId('');
								setShowCreateModal(true);
							}}
						>
							Crear cuadrante
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}

export default SectorTable;
