/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAxiosHandler from '../../hooks/axiosHandler';
import { LogbookContext } from './LogbookContext';

const LogbookProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [logbookDetails, setLogbookDetails] = useState([]);
	const [logbook, setLogbook] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [showLogbookDetails, setShowLogbookDetails] = useState(false);
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

	const getMethod = async (id = '', path, setState) => {
		const getPath = `${path}`;
		const getByIdPath = `${path}/${id}`;
		await GETRequest(id != '' ? getByIdPath : getPath, setState);
		if (path === 'logbookDetails') {
			setShowLogbookDetails(true);
		}
	};

	useEffect(() => {
		console.log('logbookDetails', logbookDetails);
	}, [logbookDetails]);

	const postLogbook = async (path, logbook) => {
		await POSTRequest(logbook, path);
	};

	const deleteLogbook = async (path, id) => {
		await DELETERequest(path, id);
	};

	const handleChangeLogbook = e => {
		const { name, value } = e.target;
		setFormulario(prevFormulario => ({ ...prevFormulario, [name]: value }));
	};

	const handleSubmit = async (e, path) => {
		e.preventDefault();
		// Aquí puedes hacer una petición HTTP para publicar los cambios
		const body = await PUTRequest(formulario, path);
		setFormulario(body);
	};

	return (
		<LogbookContext.Provider
			value={{
				logbook,
				setLogbook,
				getMethod,
				postLogbook,
				deleteLogbook,
				setSelectedId,
				selectedId,
				setFormulario,
				formulario,
				handleChangeLogbook,
				handleSubmit,
				setTeam,
				team,
				setTeamMembers,
				teamMembers,
				setLogbookDetails,
				logbookDetails,
				setShowLogbookDetails,
				showLogbookDetails,
			}}
		>
			{children}
		</LogbookContext.Provider>
	);
};
export default LogbookProvider;
