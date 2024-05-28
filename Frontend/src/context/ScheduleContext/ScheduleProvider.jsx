/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { ScheduleContext } from './ScheduleContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const ScheduleProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();

	const [schedule, setSchedule] = useState([]);
	const [showLogbook, setShowLogbook] = useState(false);
	const [idTeam, setIdTeam] = useState('');
	const [folder, setFolder] = useState('');
	const [team, setTeam] = useState({});
	const url = 'http://127.0.0.1:4000/schedule';

	useEffect(() => {
		console.log(schedule);
	}, [schedule]);

	const postSchedule = formulario => {
		if (formulario) {
			POSTRequest(formulario, url);
		}
	};

	const getSchedule = () => {
		GETRequest(url, setSchedule);
	};

	const putSchedule = formulario => {
		if (formulario) {
			PUTRequest(formulario, url);
		}
	};

	const deleteSchedule = id => {
		if (id) {
			DELETERequest(url, id);
		}
	};

	return (
		<ScheduleContext.Provider
			value={{
				schedule,
				setShowLogbook,
				showLogbook,
				setFolder,
				folder,
				getSchedule,
				putSchedule,
				postSchedule,
				deleteSchedule,
				setIdTeam,
				idTeam,
			}}
		>
			{children}
		</ScheduleContext.Provider>
	);
};
export default ScheduleProvider;
