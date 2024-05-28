/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TeamContext } from './TeamContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const TeamProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [teams, setTeams] = useState(undefined);
	const [teamMembers, setTeamMembers] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [showTeamMembers, setShowTeamMembers] = useState(false);
	const [folderId, setFolderId] = useState(undefined);

	const url = 'http://127.0.0.1:4000/teams';
	const getTeams = async () => {
		await GETRequest(`${url}/front`, setTeams);
	};

	const getTeamMembers = async id => {
		await GETRequest(`http://127.0.0.1:4000/teamMember/${id}`, setTeamMembers);
	};

	const postTeams = async team => {
		await POSTRequest(team, url);
		getTeams();
	};

	const putTeams = async team => {
		await PUTRequest(team, url);
		getTeams();
	};

	const deleteTeams = async id => {
		await DELETERequest(url, id);
		getTeams();
	};

	return (
		<TeamContext.Provider
			value={{
				teams,
				getTeams,
				postTeams,
				putTeams,
				deleteTeams,
				setSelectedId,
				selectedId,
				setShowTeamMembers,
				showTeamMembers,
				setTeamMembers,
				teamMembers,
				folderId,
				setFolderId,
				getTeamMembers,
			}}
		>
			{children}
		</TeamContext.Provider>
	);
};
export default TeamProvider;
