import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import UserTable from '../../components/shared/UserTable/UserTable';

const CounselorPage = () => {
	const {
		getUsers,
		deleteUser,
		selectedID,

	} = useContext(UserContext);

	useEffect(() => {
		getUsers('counselor');
	}, []);

	const deleteStudent = () => {
		selectedID && deleteUser('counselor', selectedID);
	};

	return (
		<main>
			<UserTable />
		</main>
	);
};

export default CounselorPage;
