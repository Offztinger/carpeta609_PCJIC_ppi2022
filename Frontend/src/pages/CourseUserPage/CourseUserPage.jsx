import React from 'react';
import CourseUserProvider from '../../context/CourseUserContext/CourseUserProvider';
import CourseUserContainer from './CourseUserContainer';

const CourseUserPage = () => {
	return (
		<CourseUserProvider>
			<CourseUserContainer />
		</CourseUserProvider>
	);
};

export default CourseUserPage;
