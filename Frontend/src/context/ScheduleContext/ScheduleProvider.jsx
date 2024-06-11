/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { ScheduleContext } from './ScheduleContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const ScheduleProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [logbook, setLogbook] = useState(undefined);
	const [schedule, setSchedule] = useState([]);
	const [formularioAsesoria, setFormularioAsesoria] = useState({
		folderNumberId: '',
		idUser: '',
		scheduleDate: '',
		schedulePlace: '',
		scheduleHour: '',
	});
	const url = 'https://backend.portalppi.site/schedule';

	const getMethod = (moduleName, setState) => {
		GETRequest(`https://backend.portalppi.site/${moduleName}`, setState);
	};

	const postSchedule = async formulario => {
		if (formulario) {
			await POSTRequest(formulario, url);
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

	const handleChange = e => {
		const { name, value } = e.target;
		setFormularioAsesoria({ ...formularioAsesoria, [name]: value });
	};

	const handlePOST = async () => {
		if (
			formularioAsesoria.folderNumberId !== '' &&
			formularioAsesoria.idUser !== '' &&
			formularioAsesoria.scheduleDate !== '' &&
			formularioAsesoria.schedulePlace !== '' &&
			formularioAsesoria.scheduleHour !== ''
		) {
			await postSchedule(formularioAsesoria);
			getMethod('schedule', setSchedule);
		} else {
			alert('Valide los datos en el formulario');
		}
	};

	useEffect(() => {
		setLogbook(undefined);
	}, []);

	useEffect(() => {
		if (logbook != undefined) {
			localStorage.setItem('logbook', JSON.stringify(logbook));
		}
	}, [logbook]);

	const setIdLogbook = async id => {
		await GETRequest(`https://backend.portalppi.site/logbook/${id}`, setLogbook);
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
				setLogbook,
				logbook,
				setFormularioAsesoria,
				formularioAsesoria,
				getMethod,
				handleChange,
				handlePOST,
			}}
		>
			{children}
		</ScheduleContext.Provider>
	);
};
export default ScheduleProvider;
