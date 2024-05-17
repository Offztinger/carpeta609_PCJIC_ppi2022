import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import UserTable from '../../components/shared/UserTable/UserTable';

const StudentPage = () => {
	const {
		getUsers,
		deleteUser,
		selectedID,
	} = useContext(UserContext);

	useEffect(() => {
		getUsers('student');
	}, []);

	const deleteStudent = () => {
		selectedID && deleteUser('student', selectedID);
	};

	return (
		<main>
			<UserTable />
		</main>
	);
};

export default StudentPage;
