import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import UserTable from '../../components/shared/UserTable/UserTable';

const ProfessorPage = () => {
	const {
		getUsers,
		deleteUser,
		selectedID,
	} = useContext(UserContext);

	useEffect(() => {
		getUsers('professor');
	}, []);

	const deleteStudent = () => {
		selectedID && deleteUser('professor', selectedID);
	};

	return (
		<main>
			<UserTable />
		</main>
	);
};

export default ProfessorPage;
