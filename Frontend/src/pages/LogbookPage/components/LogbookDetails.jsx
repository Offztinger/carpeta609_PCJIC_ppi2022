import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { LogbookContext } from '../../../context/LogbookContext/LogbookContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import useAxiosHandler from '../../../hooks/axiosHandler';
import { useNavigate } from 'react-router-dom';

const LogbookDetails = ({ folderNumber }) => {
	const navigate = useNavigate();
	const { logbookDetails, teamMembers, setLogbookDetails } =
		useContext(LogbookContext);
	const { user } = useSelector(state => state.auth);
	const { GETRequest, POSTRequest, PUTRequest } = useAxiosHandler();
	const [logbookDetailToEdit, setLogbookDetailToEdit] = useState({});
	const [professors, setProfessors] = useState([]);
	const [isAdding, setIsAdding] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);
	const [logbookId, setLogbookId] = useState(undefined);
	const [newLogbookDetail, setNewLogbookDetail] = useState({
		meetingDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
		missingStudents: [],
		meetingComments: '',
		meetingCommit: '',
		idUser: '',
		logbookId: '',
	});

	const [isEdit, setIsEdit] = useState([]);

	useEffect(() => {
		GETRequest('professor', setProfessors);
	}, []);

	useEffect(() => {
		if (logbookDetails[0] != undefined) {
			setLogbookId(logbookDetails[0].logbookId);
		}
		if (logbookId != undefined) {
			setNewLogbookDetail(prevDetail => ({
				...prevDetail,
				logbookId: logbookId,
			}));
		}
	}, [logbookId, logbookDetails]);

	useEffect(() => {
		const professor = professors.find(prof => prof.email === user.email);
		if (professor) {
			setNewLogbookDetail(prevDetail => ({
				...prevDetail,
				idUser: professor.id,
			}));
		}
	}, [professors, user.email]);

	useEffect(() => {
		setFormIsValid(
			newLogbookDetail.meetingComments.trim() !== '' &&
				newLogbookDetail.meetingCommit.trim() !== '',
		);
	}, [newLogbookDetail.meetingComments, newLogbookDetail.meetingCommit]);

	const handleCheckboxChange = useCallback((studentId, isEdit = true) => {
		const updater = isEdit ? setLogbookDetailToEdit : setNewLogbookDetail;
		updater(prevDetail => {
			const missingStudents = prevDetail.missingStudents.includes(studentId)
				? prevDetail.missingStudents.filter(id => id !== studentId)
				: [...prevDetail.missingStudents, studentId];
			return { ...prevDetail, missingStudents };
		});
	}, []);

	const handleInputChange = useCallback((e, isEdit = true) => {
		const { name, value } = e.target;
		const updater = isEdit ? setLogbookDetailToEdit : setNewLogbookDetail;
		updater(prevDetail => ({
			...prevDetail,
			[name]: value,
		}));
	}, []);

	const onPutSubmit = useCallback(async () => {
		await PUTRequest(
			logbookDetailToEdit,
			'logbookDetail',
		).finally(() => {
			GETRequest(
				`logbookDetail/${logbookId}`,
				setLogbookDetails,
			);
			setLogbookDetailToEdit({
				meetingDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
				missingStudents: [],
				meetingComments: '',
				meetingCommit: '',
				idUser: '',
				logbookId: logbookId,
			});
			setIsEdit([]);
		});
	}, [
		logbookDetailToEdit,
		GETRequest,
		PUTRequest,
		logbookId,
		setLogbookDetails,
	]);

	const onAddSubmit = useCallback(async () => {
		await POSTRequest(
			newLogbookDetail,
			'logbookDetail',
		).finally(() => {
			setIsAdding(false);
			GETRequest(
				`logbookDetail/${logbookId}`,
				setLogbookDetails,
			);
			setNewLogbookDetail({
				meetingDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
				missingStudents: [],
				meetingComments: '',
				meetingCommit: '',
				idUser: '',
				logbookId: logbookId,
			});
		});
	}, [newLogbookDetail, GETRequest, POSTRequest, logbookId, setLogbookDetails]);

	const handleEditToggle = useCallback(index => {
		setIsEdit(prevState => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});
	}, []);

	return (
		<section className='w-full flex flex-column items-center'>
			<h1 className='text-2xl font-bold'>Detalles por asesoria</h1>
			<p className='text-xl text-[red]'>Por favor, editar uno al tiempo.</p>
			<div className='flex flex-wrap justify-center'>
				{logbookDetails.map((logbook, index) => {
					const isCurrentEdit = isEdit[index];
					const currentDetail = isCurrentEdit ? logbookDetailToEdit : logbook;
					const professor = professors.find(prof => prof.id === logbook.idUser);
					const professorName = professor
						? `${professor.name} ${professor.lastName}`
						: '';

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
												onChange={() =>
													handleCheckboxChange(
														element.student.id,
														isCurrentEdit,
													)
												}
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
									disabled={!isCurrentEdit}
									onChange={e => handleInputChange(e, isCurrentEdit)}
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
									disabled={!isCurrentEdit}
									onChange={e => handleInputChange(e, isCurrentEdit)}
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
										handleEditToggle(index);
										setLogbookDetailToEdit(logbook);
									}}
								>
									<FontAwesomeIcon icon={faPenToSquare} />
								</button>
								<button
									type='button'
									className='btn btn-success ml-2'
									onClick={onPutSubmit}
									disabled={!isEdit[index]}
								>
									<FontAwesomeIcon icon={faCheck} />
								</button>
							</div>
						</div>
					);
				})}
				{isAdding ? (
					<div className='w-full flex justify-center'>
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
								{teamMembers.map((element, key) => {
									const isChecked = newLogbookDetail.missingStudents.includes(
										element.student.id,
									);
									return (
										<div key={key}>
											<input
												className='mr-2'
												type='checkbox'
												checked={isChecked}
												onChange={() =>
													handleCheckboxChange(element.student.id, false)
												}
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
									type='button'
									className='btn btn-success'
									disabled={!formIsValid}
									onClick={onAddSubmit}
								>
									<FontAwesomeIcon icon={faCheck} />
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className='w-full flex justify-center'>
						<button
							type='button'
							className='btn btn-success w-[200px] mr-[50px]'
							onClick={() => setIsAdding(true)}
						>
							Agregar registro
						</button>
						<button
							onClick={() => {
								navigate(`/sectorScore/${folderNumber}`);
							}}
							className='btn btn-success w-[200px] '
						>
							Calificar cuadrante
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default LogbookDetails;
