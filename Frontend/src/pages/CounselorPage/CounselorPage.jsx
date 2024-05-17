import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import UserTable from '../../components/shared/UserTable/UserTable';

const CounselorPage = () => {
	const { getUsers, deleteUser, selectedID } = useContext(UserContext);

	useEffect(() => {
		getUsers('counselor');
	}, []);

	const deleteCounselor = idToDelete => {
		selectedID && deleteUser('counselor', idToDelete);
	};

	return (
		<main>
			<UserTable deleteFunction={deleteCounselor} />
		</main>
	);
};

export default CounselorPage;
