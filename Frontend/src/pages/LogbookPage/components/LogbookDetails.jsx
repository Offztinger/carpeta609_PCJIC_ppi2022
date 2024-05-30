import React, { useContext, useEffect, useState } from 'react';
import { LogbookContext } from '../../../context/LogbookContext/LogbookContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import useAxiosHandler from '../../../hooks/axiosHandler';
const LogbookDetails = () => {
	const { logbookDetails, teamMembers } = useContext(LogbookContext);
	const { GETRequest } = useAxiosHandler();
	const [logbookDetailToEdit, setLogbookDetailToEdit] = useState({});
	const [professors, setProfessors] = useState([]);

	useEffect(() => {
		GETRequest('http://localhost:4000/professor', setProfessors);
	}, []);

	return (
		<section className='w-full flex flex-column items-center'>
			<h1 className='text-2xl font-bold'>Detalles por asesoria</h1>
			<div className='flex flex-wrap justify-center'>
				{logbookDetails.map((logbook, index) => {
					const [isEdit, setIsEdit] = useState(true);
					let professorName = '';
					let professor = [];
					if (professors.length > 0) {
						professor = professors.filter(
							professor => professor.id === logbook.idUser,
						);
						professorName = `${professor[0].name} ${professor[0].lastName}`;
					}
					return (
						<div className='flex' key={index}>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>Fecha revision</h1>
								<textarea
									type='text'
									value={logbook.meetingDate}
									className='form-control w-[90%]'
									disabled={true}
								/>
							</div>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>
									Estudiantes que no asisten
								</h1>
								{teamMembers.map((element, key) => {
									return (
										<div>
											<input
												className='mr-2'
												type='checkbox'
												id={key}
												name={
													element.student.name + element.student.name.lastName
												}
												value={false}
												disabled={isEdit}
											/>
											<label
												htmlFor={
													element.student.name + element.student.name.lastName
												}
											>
												{element.student.name} {element.student.lastName}
											</label>
										</div>
									);
								})}
							</div>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>Observaciones</h1>
								<textarea
									type='text'
									value={logbook.meetingComments}
									className='form-control w-[90%]'
									disabled={isEdit}
								/>
							</div>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>
									Compromisos para la siguiente asesoria
								</h1>
								<textarea
									type='text'
									value={logbook.meetingCommit}
									className='form-control w-[90%]'
									disabled={isEdit}
								/>
							</div>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>
									Nombre de la persona que dió la asesoria
								</h1>
								<textarea
									type='text'
									value={professorName}
									className='form-control w-[90%]'
									disabled={true}
								/>
							</div>
							<div className='flex justify-center items-end pb-6 m-2'>
								<button
									type='button'
									className='btn btn-success'
									onClick={() => {
										setIsEdit(!isEdit);
                                        setLogbookDetailToEdit(logbook);
									}}
								>
									<FontAwesomeIcon icon={faPenToSquare} />
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default LogbookDetails;
