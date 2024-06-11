import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import useAxiosHandler from '../../../hooks/axiosHandler';
import { TeamContext } from '../../../context/TeamContext/TeamContext';

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

export default function TeamForm() {
	const { GETRequest } = useAxiosHandler();
	const { handleChange, setFormulario, formulario } = useContext(TeamContext);
	const [professors, setProfessors] = useState([]);
	const [course, setCourses] = useState([]);

	useEffect(() => {
		GETRequest('https://backend.portalppi.site/professor', data =>
			setProfessors(
				data.map(professor => ({
					value: professor.id,
					label: `${professor.name} ${professor.lastName}`,
				})),
			),
		);
		GETRequest('https://backend.portalppi.site/course', data =>
			setCourses(
				data.map(course => ({
					value: course.id,
					label: course.courseName,
				})),
			),
		);
	}, []);

	const handleInputChange = (e, field) => {
		setFormulario({ ...formulario, [field]: e.target.value });
	};

	const getSelectedOption = (options, value) => {
		return options.find(option => option.value === value) || null;
	};

	return (
		<div>
			<div className='form-group'>
				<label>Número de carpeta</label>
				<input
					type='number'
					className='form-control'
					value={formulario.folderNumber}
					onChange={e => handleInputChange(e, 'folderNumber')}
				/>
			</div>
			<div className='form-group'>
				<label>Nombre del equipo</label>
				<input
					type='text'
					className='form-control'
					value={formulario.teamName}
					onChange={e => handleInputChange(e, 'teamName')}
				/>
			</div>
			<div className='form-group'>
				<label>Curso</label>
				<Select
					options={course}
					styles={customStyles}
					placeholder='Selecciona un curso...'
					value={getSelectedOption(course, formulario.idCourse)}
					onChange={selectedOption =>
						handleChange({
							target: { name: 'idCourse', value: selectedOption.value },
						})
					}
				/>
			</div>
			<div className='form-group'>
				<label>Profesor asignado</label>
				<Select
					options={professors}
					styles={customStyles}
					placeholder='Selecciona un profesor...'
					value={getSelectedOption(professors, formulario.idUser)}
					onChange={selectedOption =>
						handleChange({
							target: { name: 'idUser', value: selectedOption.value },
						})
					}
				/>
			</div>
		</div>
	);
}
