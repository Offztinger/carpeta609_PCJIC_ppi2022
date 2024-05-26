import React from 'react';
import UserProvider from '../../context/UserContext/UserProvider';
import ProfessorContainer from './ProfessorContainer';

const ProfessorPage = () => {
	return (
		<UserProvider>
			<ProfessorContainer />
		</UserProvider>
	);
};

export default ProfessorPage;
