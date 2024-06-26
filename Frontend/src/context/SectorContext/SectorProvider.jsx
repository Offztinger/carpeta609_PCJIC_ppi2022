import React, { useState } from 'react';
import { SectorContext } from './SectorContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const SectorProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [sectors, setSectors] = useState([]);
	const [sectorCourses, setSectorCourses] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [formulario, setFormulario] = useState({
		id: '',
		sectorName: '',
		sectorObjective: '',
	});
	const [formularioCourse, setFormularioCourse] = useState({
		id: '',
		idSector: '',
		idCourse: '',
		sectorObjectiveCourse: '',
	});
	const [formError, setFormError] = useState(true);
	const [idCourse, setIdCourse] = useState('');
	const postSector = async (moduleName, formulario) => {
		let data = {};
		if (moduleName === 'sector') {
			data = {
				sectorName: formulario.sectorName,
				sectorObjective: formulario.sectorObjective,
			};
		} else if (moduleName === 'sectorCourse') {
			data = {
				idSector: formulario.idSector,
				idCourse: formulario.idCourse,
				sectorObjectiveCourse: formulario.sectorObjectiveCourse,
			};
		}
		if (data) {
			await POSTRequest(data, `${moduleName}`);
			if (moduleName === 'sector') {
				getMethod(moduleName, setSectors);
			} else if (moduleName === 'sectorCourse') {
				getMethod(`${moduleName}/course/${idCourse}`, setSectorCourses);
			}
		}
	};

	const getMethod = (moduleName, setState) => {
		GETRequest(`${moduleName}`, setState);
	};

	const putSector = async (moduleName, formulario) => {
		if (formulario) {
			await PUTRequest(formulario, `${moduleName}`);
			if (moduleName === 'sector') {
				getMethod(moduleName, setSectors);
			} else if (moduleName === 'sectorCourse') {
				getMethod(`${moduleName}/course/${idCourse}`, setSectorCourses);
			}
		}
	};

	const deleteSector = async (moduleName, id) => {
		if (id) {
			await DELETERequest(`${moduleName}`, id);
			if (moduleName === 'sector') {
				getMethod(moduleName, setSectors);
			} else if (moduleName === 'sectorCourse') {
				getMethod(`${moduleName}/course/${idCourse}`, setSectorCourses);
			}
		}
	};

	const handleChange = (e, moduleName) => {
		const { name, value } = e.target;
		if (moduleName == 'sector') {
			setFormulario({ ...formulario, [name]: value });
		} else if (moduleName == 'sectorCourse') {
			setFormularioCourse({ ...formularioCourse, [name]: value });
		}
	};

	const handleRequestFunction = async (moduleName, form) => {
		if (
			(form.sectorName !== '' && form.sectorObjective !== '') ||
			(form.idSector !== '' &&
				form.idCourse !== '' &&
				form.sectorObjectiveCourse !== '')
		) {
			setFormError(false);
			if (selectedId) {
				await putSector(moduleName, form);
			} else {
				await postSector(moduleName, form);
			}
		} else {
			alert('Valide los datos en el formulario');
		}
	};

	return (
		<SectorContext.Provider
			value={{
				postSector,
				getMethod,
				putSector,
				deleteSector,
				setSectors,
				sectors,
				selectedId,
				setSelectedId,
				formulario,
				handleChange,
				handleRequestFunction,
				setFormulario,
				setFormularioCourse,
				formularioCourse,
				setSectorCourses,
				sectorCourses,
				setIdCourse,
				idCourse,
			}}
		>
			{children}
		</SectorContext.Provider>
	);
};

export default SectorProvider;
