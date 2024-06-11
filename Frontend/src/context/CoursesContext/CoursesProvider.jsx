import React, { useState, useEffect } from 'react';
import { CoursesContext } from './CoursesContext';
import useAxiosHandler from '../../hooks/axiosHandler';
import * as XLSX from 'xlsx';

const CoursesProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [courses, setCourses] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [formulario, setFormulario] = useState({
		id: '',
		courseName: '',
		courseDescription: '',
		courseLevel: 0,
		isAlternative: false,
	});
	const [formError, setFormError] = useState(true);
	const path = 'course';

	const getCourses = () => {
		GETRequest(path, setCourses);
	};

	const postCourse = async formulario => {
		const data = {
			courseName: formulario.courseName,
			courseDescription: formulario.courseDescription,
			courseLevel: Number(formulario.courseLevel), // Asegurarse de que sea un número
			isAlternative: false, // Añadir el campo isAlternative con el valor true
		};
		if (data) {
			await POSTRequest(data, path);
			getCourses();
		}
	};

	const putCourse = async formulario => {
		if (formulario) {
			await PUTRequest(formulario, path);
			getCourses();
		}
	};

	const deleteCourse = async () => {
		if (selectedId) {
			await DELETERequest(path, selectedId);
			getCourses();
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setFormulario({
			...formulario,
			[name]: value,
		});
	};

	const handleRequestFunction = async () => {
		if (
			formulario.courseName !== '' &&
			formulario.courseDescription !== '' &&
			formulario.courseLevel !== 0
		) {
			console.log('Entre');
			setFormError(false);
			if (selectedId) {
				await putCourse(formulario);
			} else if (!selectedId) {
				await postCourse(formulario);
			}
		} else {
			alert('Valide los datos en el formulario');
		}
	};

	const exportToExcel = course => {
		const wb = XLSX.utils.book_new();
		let row = [
			[
				{ v: 'ID', t: 's', s: {} },
				{ v: 'Nombre del Curso', t: 's', s: {} },
				{ v: 'Descripción del Curso', t: 's', s: {} },
				{ v: 'ID del Profesor', t: 's', s: {} },
				{ v: 'Nivel del Curso', t: 's', s: {} },
			],
		];
		courses.forEach(course => {
			row = [
				...row,
				[
					{ v: course.id, t: 's', s: {} },
					{ v: course.courseName, t: 's', s: {} },
					{ v: course.courseDescription, t: 's', s: {} },
					{ v: course.idProfessor, t: 's', s: {} },
					{ v: course.courseLevel, t: 's', s: {} },
				],
			];
		});
		const ws = XLSX.utils.aoa_to_sheet(row);
		XLSX.utils.book_append_sheet(wb, ws, 'cursos');
		XLSX.writeFile(wb, 'lista' + 'Cursos' + '.xlsx');
	};

	return (
		<CoursesContext.Provider
			value={{
				postCourse,
				getCourses,
				putCourse,
				deleteCourse,
				courses,
				selectedId,
				setSelectedId,
				formulario,
				handleChange,
				handleRequestFunction,
				exportToExcel,
				setFormulario,
			}}
		>
			{children}
		</CoursesContext.Provider>
	);
};

export default CoursesProvider;
