import React, { useContext, useEffect } from 'react';
import { CourseUserContext } from '../../context/CourseUserContext/CourseUserContext';
import CourseUserTable from './components/CourseUserTable';

const CourseUserContainer = () => {
	const { getUserCourse, deleteUserCourse, setSelectedId } =
		useContext(CourseUserContext);

	useEffect(() => {
		getUserCourse();
	}, []);

	const onDelete = async idToDelete => {
		idToDelete && (await deleteUserCourse('course', idToDelete));
	};

	const updateId = id => {
		setSelectedId(id);
	};

	return (
		<main>
			<CourseUserTable deleteFunction={onDelete} updateId={updateId} />
		</main>
	);
};

export default CourseUserContainer;
