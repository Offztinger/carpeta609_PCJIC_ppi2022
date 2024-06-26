import React from 'react';
import Logbook from './components/Logbook';
import { useEffect, useContext } from 'react';
import { LogbookContext } from '../../context/LogbookContext/LogbookContext';
import useAxiosHandler from '../../hooks/axiosHandler';
import LogbookDetails from './components/LogbookDetails';

const LogbookContainer = () => {
	const { GETRequest } = useAxiosHandler();
	const { getMethod, setTeam, setTeamMembers, setLogbook, showLogbookDetails } =
		useContext(LogbookContext);
	const path = window.location.pathname;
	const id = path.split('/')[2];

	useEffect(() => {
		getMethod(id, 'logbook', setLogbook);
		GETRequest(`teams/${id}`, setTeam);
		GETRequest(`teamMember/${id}`, setTeamMembers);
	}, []);

	return (
		<main>
			{showLogbookDetails && <LogbookDetails folderNumber={id} />}
			{!showLogbookDetails && <Logbook />}
		</main>
	);
};

export default LogbookContainer;
