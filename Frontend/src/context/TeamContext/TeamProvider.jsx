/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TeamContext } from './TeamContext';
import useAxiosHandler from '../../hooks/axiosHandler';
import useToastHandler from '../../hooks/toastHandler';
import axios from 'axios';

const TeamProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const { toastError } = useToastHandler();

	const [teams, setTeams] = useState(undefined);
	const [teamMembers, setTeamMembers] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [showTeamMembers, setShowTeamMembers] = useState(false);
	const [folderId, setFolderId] = useState(undefined);
	const [studentsEquipo, setStudentsEquipo] = useState([]);
	const [formulario, setFormulario] = useState({
		folderNumber: '',
		teamName: '',
		idCourse: '',
		idUser: '',
	});
	const [data, setData] = useState([]);
	const path = 'teams';
	const getTeams = async () => {
		await GETRequest(`${path}/front`, setTeams);
	};

	const getTeamMembers = async id => {
		await GETRequest(`teamMember/${id}`, setTeamMembers);
	};

	const postTeam = async team => {
		await POSTRequest(team, path);
		getTeams();
	};

	const putTeam = async team => {
		await PUTRequest(team, path);
		getTeams();
	};

	const deleteTeam = async id => {
		await axios
			.get(`logbook/${id}`, {
				headers: {
					'Content-Type': 'application/json', // También cambiamos el Content-Type aquí si es necesario
					Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
				},
			})
			.then(async res => {
				if (res.data?.id != undefined) {
					await DELETERequest(
						`logbook`,
						res.data.id,
					);
				}
				await DELETERequest(path, id);
				await getTeams();
			})
			.catch(error => {
				toastError(error.response.data.message);
				console.error(error);
			});
	};

	const handleChange = e => {
		const { name, value } = e.target;
		if (name == 'id') {
			setStudentsEquipo(value);
		} else {
			setFormulario({ ...formulario, [name]: value });
		}
	};

	const onSubmit = async () => {
		const team = {
			folderNumber: formulario.folderNumber,
			teamName: formulario.teamName,
			idCourse: formulario.idCourse,
			idUser: formulario.idUser,
		};
		await postTeam(team);
		setFormulario({
			folderNumber: '',
			teamName: '',
			idCourse: '',
			idUser: '',
		});
		getTeams();
	};

	return (
		<TeamContext.Provider
			value={{
				teams,
				getTeams,
				postTeam,
				putTeam,
				deleteTeam,
				setSelectedId,
				selectedId,
				setShowTeamMembers,
				showTeamMembers,
				setTeamMembers,
				teamMembers,
				folderId,
				setFolderId,
				getTeamMembers,
				formulario,
				setFormulario,
				handleChange,
				studentsEquipo,
				setStudentsEquipo,
				onSubmit,
				setData,
				data,
			}}
		>
			{children}
		</TeamContext.Provider>
	);
};
export default TeamProvider;
