/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { ScheduleContext } from './ScheduleContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const ScheduleProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();

	const [schedule, setSchedule] = useState([]);

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

	return (
		<ScheduleContext.Provider value={{schedule}}>{children}</ScheduleContext.Provider>
	);
};
export default ScheduleProvider;
