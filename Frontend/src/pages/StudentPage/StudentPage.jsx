import React from 'react';
import UserProvider from '../../context/UserContext/UserProvider';
import StudentContainer from './StudentContainer';

const StudentPage = () => {
	return (
		<UserProvider>
			<StudentContainer />
		</UserProvider>
	);
};

export default StudentPage;
