import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import UserTable from '../../components/shared/UserTable/UserTable';

const ProfessorContainer = () => {
	const { getUsers, deleteUser, setSelectedId } = useContext(UserContext);

	useEffect(() => {
		getUsers('professor');
	}, []);

	const deleteProfessor = async idToDelete => {
		idToDelete && (await deleteUser('professor', idToDelete));
	};

	const updateId = id => {
		setSelectedId(id);
	};
	
	return (
		<main>
			<UserTable deleteFunction={deleteProfessor} updateId={updateId} />
		</main>
	);
};

export default ProfessorContainer;
