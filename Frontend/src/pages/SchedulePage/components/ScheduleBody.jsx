import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ScheduleContext } from '../../../context/ScheduleContext/ScheduleContext';

const customStyles = {
	control: (base, state) => ({
		...base,
		borderColor: state.isFocused ? '#38a169' : base.borderColor,
		boxShadow: state.isFocused ? '0 0 0 1px #38a169' : base.boxShadow,
		'&:hover': {
			borderColor: '#38a169',
		},
	}),
	option: (base, state) => ({
		...base,
		backgroundColor: state.isSelected
			? '#2f855a'
			: state.isFocused
				? '#38a169'
				: base.backgroundColor,
		color: state.isFocused || state.isSelected ? 'white' : base.color,
		'&:active': {
			backgroundColor: '#2f855a',
		},
		'&:hover': {
			backgroundColor: state.isSelected ? '#2f855a' : '#38a169',
			color: 'white',
		},
	}),
};

const ScheduleBody = () => {
	const { formularioAsesoria, handleChange, getMethod, setFormularioAsesoria } =
		useContext(ScheduleContext);
	const [teams, setTeams] = useState([]);
	const [professors, setProfessors] = useState([]);

	useEffect(() => {
		getMethod('teams', data =>
			setTeams(
				data.map(team => ({ value: team.id, label: team.folderNumber })),
			),
		);
		getMethod('professor', data =>
			setProfessors(data.map(prof => ({ value: prof.id, label: prof.name }))),
		);
	}, []);

	const handleInputChange = (e, field) => {
		setFormularioAsesoria({ ...formularioAsesoria, [field]: e.target.value });
	};

	return (
		<form>
			<div className='form-group'>
				<label>Número de carpeta</label>
				<Select
					options={teams}
					styles={customStyles}
					placeholder='Selecciona un equipo...'
					onChange={selectedOption =>
						handleChange(
							{
								target: { name: 'folderNumberId', value: selectedOption.value },
							},
							'team',
						)
					}
				/>
			</div>
			<div className='form-group'>
				<label>Profesor</label>
				<Select
					options={professors}
					styles={customStyles}
					placeholder='Selecciona un profesor...'
					onChange={selectedOption =>
						handleChange(
							{ target: { name: 'idUser', value: selectedOption.value } },
							'professor',
						)
					}
				/>
			</div>
			<div className='form-group flex justify-between items-center'>
				<label>Fecha de Asesoría</label>
				<DatePicker
					selected={formularioAsesoria.scheduleDate}
					onChange={date =>
						setFormularioAsesoria({ ...formularioAsesoria, scheduleDate: date })
					}
					dateFormat='MMMM d, yyyy'
					className='form-control'
					minDate={new Date()} // Esto establece la fecha mínima como la fecha actual
				/>
			</div>
			<div className='form-group'>
				<label>Lugar de Asesoría</label>
				<input
					type='text'
					className='form-control'
					value={formularioAsesoria.schedulePlace}
					onChange={e => handleInputChange(e, 'schedulePlace')}
				/>
			</div>
			<div className='form-group'>
				<label>Hora de Asesoría</label>
				<input
					type='time'
					className='form-control'
					value={formularioAsesoria.scheduleHour}
					onChange={e => {
						const selectedTime = e.target.value;
						const minTime = '06:00'; // Hora mínima permitida
						const maxTime = '18:00'; // Hora máxima permitida

						if (selectedTime < minTime || selectedTime > maxTime) {
							// Si la hora seleccionada está fuera del rango permitido, establecerla en la hora mínima permitida
							handleInputChange({ target: { value: minTime } }, 'scheduleHour');
						} else {
							// Si la hora seleccionada está dentro del rango permitido, actualizar el estado normalmente
							handleInputChange(e, 'scheduleHour');
						}
					}}
				/>
			</div>
		</form>
	);
};

export default ScheduleBody;
	