import React, { useContext, useEffect } from 'react';
import { CoursesContext } from '../../context/CoursesContext/CoursesContext';
import CoursesTable from './components/CoursesTable';

const CoursesContainer = () => {
	const { getCourses, deleteCourse, setSelectedId } =
		useContext(CoursesContext);

	useEffect(() => {
		getCourses('course');
	}, []);

	const onDelete = async idToDelete => {
		idToDelete && (await deleteCourse('course', idToDelete));
	};

	const updateId = id => {
		setSelectedId(id);
	};

	return (
		<main>
			<CoursesTable deleteFunction={onDelete} updateId={updateId} />
		</main>
	);
};

export default CoursesContainer;
