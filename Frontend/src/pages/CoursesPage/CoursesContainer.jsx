import React, { useContext, useEffect } from 'react';
import { CoursesContext } from '../../context/CoursesContext/CoursesContext';
import CoursesTable from '../../components/shared/CoursesTable/CoursesTable';

const CoursesContainer = () => {
    const { getCourses, deleteCourses, setSelectedId } = useContext(CoursesContext);

	useEffect(() => {
		getCourses('course');
	}, []);

	const deleteCourse = async idToDelete => {
		idToDelete && (await deleteCourse('course', idToDelete));
	};

	const updateId = id => {
		setSelectedId(id);
	};
	return (
		<main>
			<CoursesTable deleteFunction={deleteCourse} updateId={updateId} />
		</main>
	);
};

export default CoursesContainer;
