import React, { useState } from 'react';
import { CourseUserContext } from './CourseUserContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const CourseUserProvider = ({ children }) => {
	const { GETRequest, POSTRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [userCourses, setUserCourses] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [formulario, setFormulario] = useState({
		idUser: '',
		idCourse: '',
		active: true,
	});
	const [formError, setFormError] = useState(false);
	const path = 'courseUser';

	const getUserCourse = async () => {
		await GETRequest(path, setUserCourses);
	};

	const postUserCourse = async formData => {
		if (formData) {
			await POSTRequest(formData, path);
			getUserCourse();
		}
	};

	const putUserCourse = async formData => {
		if (formData) {
			await PUTRequest(formData, `${path}/${formData.id}`);
			getUserCourse();
		}
	};

	const deleteUserCourse = async id => {
		if (id) {
			await DELETERequest(path, id);
			getUserCourse();
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setFormulario({
			...formulario,
			[name]: value,
		});
	};

	return (
		<CourseUserContext.Provider
			value={{
				postUserCourse,
				getUserCourse,
				putUserCourse,
				deleteUserCourse,
				userCourses,
				selectedId,
				setSelectedId,
				formulario,
				handleChange,
				setFormulario,
			}}
		>
			{children}
		</CourseUserContext.Provider>
	);
};

export default CourseUserProvider;
