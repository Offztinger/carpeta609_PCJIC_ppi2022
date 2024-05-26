import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import UserTable from '../../components/shared/UserTable/UserTable';

const StudentContainer = () => {
	const { getUsers, deleteUser, selectedID } = useContext(UserContext);

	useEffect(() => {
		getUsers('student');
	}, []);

	const deleteStudent = idToDelete => {
		selectedID && deleteUser('student', idToDelete);
	};
	return (
		<main>
			<UserTable deleteFunction={deleteStudent} />
		</main>
	);
};

export default StudentContainer;
