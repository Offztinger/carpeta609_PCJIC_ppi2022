import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import useAxiosHandler from '../../../hooks/axiosHandler';
import { CourseUserContext } from '../../../context/CourseUserContext/CourseUserContext';

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

export default function CourseUserBody({ type }) {
	const { GETRequest } = useAxiosHandler();
	const { handleChange, setFormulario, formulario } =
		useContext(CourseUserContext);
	const [professors, setProfessors] = useState([]);
	const [students, setStudents] = useState([]);
	const [course, setCourses] = useState([]);

	useEffect(() => {
		GETRequest('http://localhost:4000/professor', data =>
			setProfessors(
				data.map(professor => ({
					value: professor.id,
					label: `${professor.name} ${professor.lastName}`,
				})),
			),
		);
		GETRequest('http://localhost:4000/student', data =>
			setStudents(
				data.map(student => ({
					value: student.id,
					label: `${student.name} ${student.lastName}`,
				})),
			),
		);
		GETRequest('http://localhost:4000/course', data =>
			setCourses(
				data.map(course => ({
					value: course.id,
					label: course.courseName,
				})),
			),
		);
	}, []);

	const getSelectedOption = (options, value) => {
		return options.find(option => option.value === value) || null;
	};

	return (
		<div>
			<div className='form-group'>
				<label>{type == 'student' ? 'Estudiante' : 'Profesor'}</label>
				<Select
					options={type == 'student' ? students : professors}
					styles={customStyles}
					placeholder={
						type == 'student'
							? 'Selecciona un estudiante...'
							: 'Selecciona un profesor...'
					}
					value={getSelectedOption(type == 'student' ? students : professors, formulario.idUser)}
					onChange={selectedOption =>
						handleChange({
							target: { name: 'idUser', value: selectedOption.value },
						})
					}
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
		</div>
	);
}
