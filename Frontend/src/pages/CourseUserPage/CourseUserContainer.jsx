import React, { useContext, useEffect } from 'react';
import { CourseUserContext } from '../../context/CourseUserContext/CourseUserContext';
import CourseUserTable from './components/CourseUserTable';

const CourseUserContainer = () => {
	const { getUserCourse, deleteUserCourse, setSelectedId, userCourses } =
		useContext(CourseUserContext);

	useEffect(() => {
		getUserCourse();
	}, []);

	const onDelete = async idToDelete => {
		idToDelete && (await deleteUserCourse(idToDelete));
		await getUserCourse();
	};

	const updateId = id => {
		setSelectedId(id);
	};

	return (
		<main>
			{userCourses && (
				<CourseUserTable deleteFunction={onDelete} updateId={updateId} />
			)}
		</main>
	);
};

export default CourseUserContainer;
