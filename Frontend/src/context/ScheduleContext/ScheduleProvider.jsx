/* eslint-disable react/prop-types */

import { useState, useEffect	 } from 'react';
import { ScheduleContext } from './ScheduleContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const ScheduleProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [logbook, setLogbook] = useState(undefined);
	const [schedule, setSchedule] = useState([]);
	const url = 'http://127.0.0.1:4000/schedule';

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

	useEffect(() => {
		if (logbook != undefined) {
			localStorage.setItem('logbook', JSON.stringify(logbook));
		}
	}, [logbook]);

	const setIdLogbook = async id => {
		await GETRequest(`http://127.0.0.1:4000/logbook/${id}`, setLogbook);

		return logbook;
	};

	return (
		<ScheduleContext.Provider
			value={{
				schedule,
				getSchedule,
				putSchedule,
				postSchedule,
				deleteSchedule,
				setIdLogbook,
			}}
		>
			{children}
		</ScheduleContext.Provider>
	);
};
export default ScheduleProvider;
