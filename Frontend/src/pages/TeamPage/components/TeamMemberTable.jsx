import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { TeamContext } from '../../../context/TeamContext/TeamContext';
import usePaginatorHandler from '../../../hooks/paginatorHandler';

export default function TeamMemberTable({ updateId }) {
	const { teamMembers } = useContext(TeamContext);
	const [currentSection, setCurrentSection] = useState(0);
	const { handleSectionClick, chunkArray } = usePaginatorHandler();
	const secciones = chunkArray(teamMembers, 10);

	return (
		<div>
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
													className='btn btn-success'
													onClick={() => {
														console.log('Editar');
													}}
												>
													<FontAwesomeIcon icon={faPenToSquare} />
												</button>

												<button
													type='button'
													className='btn btn-danger'
													onClick={() => {
														console.log('Borrar');
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
				</div>
			</div>
		</div>
	);
}
