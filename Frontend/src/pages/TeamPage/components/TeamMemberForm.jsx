import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import useAxiosHandler from '../../../hooks/axiosHandler';
import { TeamContext } from '../../../context/TeamContext/TeamContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
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

export default function TeamMemberForm({ folderNumber }) {
	const { GETRequest } = useAxiosHandler();
	const { handleChange, formulario, data, setData } = useContext(TeamContext);
	const [studentsOptions, setStudentsOptions] = useState([]);
	const [students, setStudents] = useState([]);
	const [courseUsers, setCourseUsers] = useState([]);

	useEffect(() => {
		GETRequest('https://backend.portalppi.site/student', data =>
			setStudentsOptions(
				data.map(student => ({
					value: student.id,
					label: `${student.name} ${student.lastName}`,
				})),
			),
		);
		GETRequest('https://backend.portalppi.site/student', setStudents);
		GETRequest('https://backend.portalppi.site/courseUser', setCourseUsers);
	}, []);

	const getSelectedOption = (options, value) => {
		return options.find(option => option.value === value) || null;
	};

	const handleStudentChange = selectedOption => {
		handleChange({
			target: { name: 'idUser', value: selectedOption.value },
		});
		// Check if the student is already in the team
		const isStudentInTeam = data.some(
			member => member.idUser === selectedOption.value,
		);
		if (isStudentInTeam) {
			alert('Este estudiante ya está en el equipo.');
			return;
		}
		if (data.length < 3) {
			setData([
				...data,
				{
					folderNumberId: folderNumber,
					idUser: selectedOption.value,
				},
			]);
		} else {
			alert('El equipo ya tiene 3 integrantes');
		}
	};

	return (
		<div>
			<div className='form-group'>
				<label>Estudiantes</label>
				<Select
					options={studentsOptions}
					styles={customStyles}
					placeholder='Selecciona un estudiante...'
					value={getSelectedOption(studentsOptions, formulario.id)}
					onChange={selectedOption => {
						handleStudentChange(selectedOption);
					}}
				/>
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<th className='nombreteammembertyle'>Nombre</th>
							<th className='emailteammemberstyle'>Correo</th>
							<th className='botonesaccionteammember'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{data.map((teamMember, idx) => {
							const student = students.find(
								student => student.id === teamMember.idUser,
							);
							return (
								<tr key={idx}>
									<td>{`${student?.name} ${student?.lastName}`}</td>
									<td>{student?.email}</td>
									<td className='botonesaccionteammember'>
										<button
											type='button'
											className='btn btn-danger'
											onClick={() =>
												setData(data.filter((member, index) => idx !== index))
											}
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
		</div>
	);
}
