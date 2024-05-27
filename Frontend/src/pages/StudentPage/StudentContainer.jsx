import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import UserTable from '../../components/shared/UserTable/UserTable';

const StudentContainer = () => {
	const { getUsers, deleteUser, setSelectedId } = useContext(UserContext);

	useEffect(() => {
		getUsers('student');
	}, []);

	const deleteStudent = async idToDelete => {
		idToDelete && (await deleteUser('student', idToDelete));
	};

	const updateId = id => {
		setSelectedId(id);
	};
	return (
		<main>
			<UserTable deleteFunction={deleteStudent} updateId={updateId} />
		</main>
	);
};

export default StudentContainer;
