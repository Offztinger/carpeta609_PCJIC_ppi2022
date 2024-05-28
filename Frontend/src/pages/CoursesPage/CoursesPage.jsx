import React from 'react';
import CoursesProvider from '../../context/CoursesContext/CoursesProvider';
import CoursesContainer from './CoursesContainer';

const CoursesPage = () => {
	return (
		<CoursesProvider>
			<CoursesContainer />
		</CoursesProvider>
	);
};

export default CoursesPage;
