import React, { useEffect } from 'react';
import TeamTable from './components/TeamTable';
import { useContext } from 'react';
import { TeamContext } from '../../context/TeamContext/TeamContext';
import TeamMemberTable from './components/TeamMemberTable';
import useAxiosHandler from '../../hooks/axiosHandler';

const TeamContainer = () => {
	const {
		setSelectedId,
		getTeams,
		teams,
		getTeamMembers,
		folderId,
		setFolderId,
		deleteTeam,
	} = useContext(TeamContext);

	const { DELETERequest } = useAxiosHandler();

	const updateId = id => {
		setSelectedId(id);
	};

	const currentUrl = window.location.href;
	const parts = currentUrl.split('/');
	const id = parts[parts.length - 1];

	useEffect(() => {
		getTeams();
		if (id != 'teams') {
			setFolderId(id);
		} else {
			setFolderId(undefined);
		}
	}, []);

	useEffect(() => {
		console.log(folderId);
		if (folderId != undefined) {
			getTeamMembers(folderId);
		}
	}, [folderId]);

	const onDelete = async idToDelete => {
		idToDelete && (await deleteTeam(idToDelete));
	};

	const onDeleteMember = async idToDelete => {
		idToDelete &&
			(await DELETERequest('http://3.15.235.33:4000/teamMember', idToDelete));
		await getTeamMembers(folderId);
	};

	return (
		<main>
			{teams && folderId === undefined && (
				<TeamTable deleteFunction={onDelete} updateId={updateId} />
			)}
			{folderId != undefined && (
				<TeamMemberTable
					updateId={updateId}
					folderNumber={id}
					deleteFunction={onDeleteMember}
				/>
			)}
		</main>
	);
};

export default TeamContainer;
