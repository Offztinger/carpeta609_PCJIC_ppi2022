import React, { useContext, useState, useEffect } from 'react';
import { SectorScoreContext } from '../../../context/SectorScoreContext/SectorScoreContext';
import Select from 'react-select';
import useAxiosHandler from '../../../hooks/axiosHandler';

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

const SectorScoreBody = () => {
	const { formulario, handleChange, idSectorScore, setFormulario } =
		useContext(SectorScoreContext);

	const { GETRequest } = useAxiosHandler();
	const [sectorCourse, setSectorCourse] = useState([]);
	const [students, setStudents] = useState([]);
	const [team, setTeam] = useState([]);
	useEffect(() => {
		GETRequest(`http://localhost:4000/teams/${idSectorScore}`, setTeam);
		GETRequest(`http://localhost:4000/teamMember/${idSectorScore}`, data =>
			setStudents(
				data.map(student => ({
					value: student.student.id,
					label: `${student.student.name} ${student.student.lastName}`,
				})),
			),
		);
		setFormulario({ ...formulario, folderNumberId: idSectorScore });
	}, []);

	useEffect(() => {
		if (team.idCourse !== undefined) {
			GETRequest(
				`http://localhost:4000/sectorCourse/course/${team.idCourse}`,
				data =>
					setSectorCourse(
						data.map(sector => ({
							value: sector.id,
							label: `${sector.sectorName}`,
						})),
					),
			);
		}
	}, [team]);

	const getSelectedOption = (options, value) => {
		return options.find(option => option.value === value) || null;
	};

	return (
		<div>
			<div className='form-group'>
				<label>Cuadrante Curso</label>
				<Select
					options={sectorCourse}
					styles={customStyles}
					placeholder='Selecciona un cuadrante curso...'
					value={getSelectedOption(sectorCourse, formulario.idSectorCourse)}
					onChange={selectedOption =>
						handleChange({
							target: { name: 'idSectorCourse', value: selectedOption.value },
						})
					}
				/>
			</div>
			<div className='form-group'>
				<label>Calificación del cuadrante</label>
				<input
					type='number'
					name='scoreSector'
					className='form-control'
					value={formulario?.scoreSector}
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<label>Estudiante</label>
				<Select
					options={students}
					styles={customStyles}
					placeholder='Selecciona un estudiante...'
					value={getSelectedOption(students, formulario.idUser)}
					onChange={selectedOption =>
						handleChange({
							target: { name: 'idUser', value: selectedOption.value },
						})
					}
				/>
			</div>
		</div>
	);
};

export default SectorScoreBody;
