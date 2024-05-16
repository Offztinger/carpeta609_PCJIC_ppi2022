import React from 'react';
import UserProvider from '../../context/UserContext/UserProvider';

const StudentPage = () => {
	return (
		<UserProvider>
			<div>StudentPage</div>
		</UserProvider>
	);
};

export default StudentPage;
