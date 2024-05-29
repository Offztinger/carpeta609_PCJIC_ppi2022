/* eslint-disable react/prop-types */
import { useState } from 'react';
import useAxiosHandler from '../../hooks/axiosHandler';
import { LogbookContext } from './LogbookContext';

const LogbookProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();

	const [logbook, setLogbook] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [formulario, setFormulario] = useState({
		id: '',
		projectName: '',
		folderNumberId: '',
		description: '',
		detailedScope: '',
		firstMeetingScope: '',
		secondMeetingScope: '',
		// Agrega aquí los campos que necesites
	});
	const [team, setTeam] = useState([]);
	const [teamMembers, setTeamMembers] = useState([]);

	const url = 'http://127.0.0.1:4000/logbook';
	const getLogbook = async (id = '') => {
		const getUrl = `${url}/${id}`;
		await GETRequest(id != '' ? getUrl : url, setLogbook);
	};

	const postLogbook = async logbook => {
		await POSTRequest(logbook, url);
		getLogbook();
	};

	const deleteLogbook = async id => {
		await DELETERequest(url, id);
		getLogbook();
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setFormulario(prevFormulario => ({ ...prevFormulario, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		// Aquí puedes hacer una petición HTTP para publicar los cambios
		const body = await PUTRequest(formulario, url);
		setFormulario(body);
	};

	return (
		<LogbookContext.Provider
			value={{
				logbook,
				getLogbook,
				postLogbook,
				deleteLogbook,
				setSelectedId,
				selectedId,
				setFormulario,
				formulario,
				handleChange,
				handleSubmit,
				setTeam,
				team,
				setTeamMembers,
				teamMembers,
			}}
		>
			{children}
		</LogbookContext.Provider>
	);
};
export default LogbookProvider;
