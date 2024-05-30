import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LogbookContext } from '../../../context/LogbookContext/LogbookContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import useAxiosHandler from '../../../hooks/axiosHandler';

const LogbookDetails = () => {
	const { logbookDetails, teamMembers, setLogbookDetails } =
		useContext(LogbookContext);
	const { user } = useSelector(state => state.auth);
	const { GETRequest, POSTRequest, PUTRequest } = useAxiosHandler();
	const [logbookDetailToEdit, setLogbookDetailToEdit] = useState({});
	const [professors, setProfessors] = useState([]);
	const [isAdding, setIsAdding] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);
	const [newLogbookDetail, setNewLogbookDetail] = useState({
		meetingDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
		missingStudents: [],
		meetingComments: '',
		meetingCommit: '',
		idUser: '',
		logbookId: logbookDetails[0]?.logbookId,
	});

	useEffect(() => {
		GETRequest('http://localhost:4000/professor', setProfessors);
	}, []);

	useEffect(() => {
		const professor = professors.find(prof => prof.email === user.email);
		if (professor) {
			setNewLogbookDetail(prevDetail => ({
				...prevDetail,
				idUser: professor.id,
			}));
		}
	}, [professors]);

	useEffect(() => {
		setFormIsValid(
			newLogbookDetail.meetingComments.trim() !== '' &&
				newLogbookDetail.meetingCommit.trim() !== '',
		);
	}, [newLogbookDetail.meetingComments, newLogbookDetail.meetingCommit]);

	const handleCheckboxChange = (studentId, isEdit = true) => {
		const updater = isEdit ? setLogbookDetailToEdit : setNewLogbookDetail;
		updater(prevDetail => {
			const missingStudents = prevDetail.missingStudents.includes(studentId)
				? prevDetail.missingStudents.filter(id => id !== studentId)
				: [...prevDetail.missingStudents, studentId];
			return { ...prevDetail, missingStudents };
		});
	};

	const handleInputChange = (e, isEdit = true) => {
		const { name, value } = e.target;
		const updater = isEdit ? setLogbookDetailToEdit : setNewLogbookDetail;
		updater(prevDetail => ({
			...prevDetail,
			[name]: value,
		}));
	};

	const onPutSubmit = async () => {
		await PUTRequest(
			logbookDetailToEdit,
			'http://127.0.0.1:4000/logbookDetail',
		);
		GETRequest(
			`http://localhost:4000/logbookDetail/${logbookDetailToEdit.logbookId}`,
			setLogbookDetails,
		);
		setLogbookDetailToEdit({
			meetingDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
			missingStudents: [],
			meetingComments: '',
			meetingCommit: '',
			idUser: '',
			logbookId: logbookDetails[0]?.logbookId,
		});
	};

	const onAddSubmit = async () => {
		await POSTRequest(
			newLogbookDetail,
			'http://127.0.0.1:4000/logbookDetail',
		).finally(() => setIsAdding(false));
		GETRequest(
			`http://localhost:4000/logbookDetail/${logbookDetailToEdit.logbookId}`,
			setLogbookDetails,
		);
		setLogbookDetailToEdit({
			meetingDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
			missingStudents: [],
			meetingComments: '',
			meetingCommit: '',
			idUser: '',
			logbookId: logbookDetails[0]?.logbookId,
		});
	};

	return (
		<section className='w-full flex flex-column items-center'>
			<h1 className='text-2xl font-bold'>Detalles por asesoria</h1>
			<p className='text-xl text-[red]'>Por favor, editar uno al tiempo.</p>
			<div className='flex flex-wrap justify-center'>
				{logbookDetails.map((logbook, index) => {
					const [isEdit, setIsEdit] = useState(true);
					let professorName = '';
					let professor = [];
					if (professors.length > 0) {
						professor = professors.filter(prof => prof.id === logbook.idUser);
						professorName = `${professor[0]?.name} ${professor[0]?.lastName}`;
					}
					const isCurrentEdit = logbookDetailToEdit.id === logbook.id;
					const currentDetail = isCurrentEdit ? logbookDetailToEdit : logbook;
					return (
						<div className='flex' key={index}>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>Fecha revision</h1>
								<textarea
									type='text'
									name='meetingDate'
									value={currentDetail.meetingDate}
									className='form-control w-[90%]'
									disabled={true}
								/>
							</div>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>
									Estudiantes que no asisten
								</h1>
								{teamMembers.map((element, key) => {
									const isChecked = currentDetail.missingStudents.includes(
										element.student.id,
									);
									return (
										<div key={key}>
											<input
												className='mr-2'
												type='checkbox'
												checked={isChecked}
												disabled={true}
											/>
											<label>
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
									name='meetingComments'
									value={currentDetail.meetingComments}
									className='form-control w-[90%]'
									disabled={!isCurrentEdit || isEdit}
									onChange={handleInputChange}
								/>
							</div>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>
									Compromisos para la siguiente asesoria
								</h1>
								<textarea
									type='text'
									name='meetingCommit'
									value={currentDetail.meetingCommit}
									className='form-control w-[90%]'
									disabled={!isCurrentEdit || isEdit}
									onChange={handleInputChange}
								/>
							</div>
							<div className='m-2'>
								<h1 className='text-lg font-bold mb-2'>
									Nombre de la persona que dio la asesoria
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
										if (isCurrentEdit) {
											// Aquí puedes agregar la lógica para guardar los cambios
										}
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
			{isAdding && (
				<div className='flex'>
					<div className='m-2'>
						<h1 className='text-lg font-bold mb-2'>Fecha revision</h1>
						<textarea
							type='text'
							name='meetingDate'
							value={newLogbookDetail.meetingDate}
							className='form-control w-[90%]'
							disabled={true}
						/>
					</div>
					<div className='m-2'>
						<h1 className='text-lg font-bold mb-2'>
							Estudiantes que no asisten
						</h1>
						{teamMembers.map((element, key) => (
							<div key={key}>
								<input
									className='mr-2'
									type='checkbox'
									checked={newLogbookDetail.missingStudents.includes(
										element.student.id,
									)}
									onChange={() =>
										handleCheckboxChange(element.student.id, false)
									}
								/>
								<label>
									{element.student.name} {element.student.lastName}
								</label>
							</div>
						))}
					</div>
					<div className='m-2'>
						<h1 className='text-lg font-bold mb-2'>Observaciones</h1>
						<textarea
							type='text'
							name='meetingComments'
							value={newLogbookDetail.meetingComments}
							className='form-control w-[90%]'
							onChange={e => handleInputChange(e, false)}
						/>
					</div>
					<div className='m-2'>
						<h1 className='text-lg font-bold mb-2'>
							Compromisos para la siguiente asesoria
						</h1>
						<textarea
							type='text'
							name='meetingCommit'
							value={newLogbookDetail.meetingCommit}
							className='form-control w-[90%]'
							onChange={e => handleInputChange(e, false)}
						/>
					</div>
					<div className='m-2'>
						<h1 className='text-lg font-bold mb-2'>
							Nombre de la persona que dio la asesoria
						</h1>
						<textarea
							type='text'
							value={`${user.firstName} ${user.lastName}`}
							className='form-control w-[90%]'
							disabled={true}
						/>
					</div>
					<div className='flex justify-center items-end pb-6 m-2'>
						<button
							onClick={onAddSubmit}
							className='btn btn-success'
							disabled={!formIsValid} // Botón deshabilitado si el formulario no es válido
						>
							<FontAwesomeIcon icon={faCheck} />
						</button>
					</div>
				</div>
			)}
			<div className='flex w-[full]'>
				<button
					onClick={onPutSubmit}
					className='btn btn-success w-[200px] mr-[50px]'
				>
					Guardar cambios
				</button>
				<button
					onClick={() => setIsAdding(true)}
					className='btn btn-success w-[200px]'
					disabled={isAdding}
				>
					Añadir registro
				</button>
			</div>
		</section>
	);
};

export default LogbookDetails;
