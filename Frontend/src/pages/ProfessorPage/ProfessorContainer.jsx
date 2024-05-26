import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import UserTable from '../../components/shared/UserTable/UserTable';

const ProfessorContainer = () => {
	const { getUsers, deleteUser, selectedID } = useContext(UserContext);

	const deleteProfessor = idToDelete => {
		selectedID && deleteUser('professor', idToDelete);
	};

	return (
		<main>
			<UserTable deleteFunction={deleteProfessor} />
		</main>
	);
};

export default ProfessorContainer;
