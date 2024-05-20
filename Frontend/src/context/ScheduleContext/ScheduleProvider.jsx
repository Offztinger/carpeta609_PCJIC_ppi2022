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
	const [team, setTeam] = useState('');
	const postSchedule = (moduleName, formulario) => {
		if (formulario) {
			POSTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
		}
	};

	const getSchedule = moduleName => {
		GETRequest(`http://127.0.0.1:4000/${moduleName}`, setSchedule);
	};

	const putSchedule = (moduleName, formulario) => {
		if (formulario) {
			PUTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
		}
	};

	const deleteSchedule = (moduleName, id) => {
		if (id) {
			DELETERequest(`http://127.0.0.1:4000/${moduleName}`, id);
		}
	};

	useEffect(() => {
		getSchedule('schedule');
	}, []);

	useEffect(() => {
		folder && GETRequest(`http://127.0.0.1:4000/teams/605`, setTeam);
	}, [folder]);

	useEffect(() => {
		if (team) {
			setI;
		}
	}, [team]);

	function createDateTime(scheduleDate, scheduleHour) {
		const [hourString, minutePeriod] = scheduleHour.split(':');
		const period = minutePeriod.slice(-2).toUpperCase();
		const minute = minutePeriod.slice(0, -2);
		let hour = parseInt(hourString, 10);

		if (period === 'PM' && hour !== 12) {
			hour += 12;
		} else if (period === 'AM' && hour === 12) {
			hour = 0;
		}

		const dateTimeString = `${scheduleDate}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
		return new Date(dateTimeString);
	}

	return (
		<ScheduleContext.Provider
			value={{
				schedule,
				createDateTime,
				setShowLogbook,
				showLogbook,
				setFolder,
				folder,
			}}
		>
			{children}
		</ScheduleContext.Provider>
	);
};
export default ScheduleProvider;
