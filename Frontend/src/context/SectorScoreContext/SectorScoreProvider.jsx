/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react';
import { SectorScoreContext } from './SectorScoreContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const SectorScoreProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [sectorScores, setSectorScores] = useState(undefined);
	const [selectedId, setSelectedId] = useState('');
	const [showSectorScores, setShowSectorScores] = useState(false);
	const [idSectorScore, setIdSectorScore] = useState('');

	const url = 'https://backend.portalppi.site/sectorScore';

	const [formulario, setFormulario] = useState({
		id: '',
		idSectorCourse: '',
		scoreSector: 0,
		folderNumberId: '',
		idUser: '',
	});

	const handleChange = event => {
		const { name, value } = event.target ? event.target : event;
		if (name === 'scoreSector' && !isNaN(value) && value >= 0 && value <= 5) {
			setFormulario(prevFormulario => ({
				...prevFormulario,
				[name]: value,
			}));
		} else if (name !== 'scoreSector') {
			setFormulario(prevFormulario => ({
				...prevFormulario,
				[name]: value,
			}));
		}
	};

	const getMethod = (url, setState) => {
		GETRequest(url, setState);
	};

	const getSectorScores = async () => {
		await GETRequest(
			`https://backend.portalppi.site/sectorScore/${idSectorScore}`,
			setSectorScores,
		);
	};

	const postSectorScore = async sectorScore => {
		const data = {
			idSectorCourse: sectorScore.idSectorCourse,
			scoreSector: parseInt(sectorScore.scoreSector, 10),
			folderNumberId: sectorScore.folderNumberId,
			idUser: sectorScore.idUser,
		};
		await POSTRequest(data, url);
		getSectorScores();
	};

	const putSectorScore = async sectorScore => {
		const data = {
			id: sectorScore.id,
			idSectorCourse: sectorScore.idSectorCourse,
			scoreSector: parseInt(sectorScore.scoreSector, 10),
			folderNumberId: sectorScore.folderNumberId,
			idUser: sectorScore.idUser,
		};
		await PUTRequest(data, url);
		getSectorScores();
	};

	const deleteSectorScore = async id => {
		await DELETERequest(url, id);
		getSectorScores();
	};

	const handleRequestFunction = async () => {
		if (
			formulario.folderNumberId != '' &&
			formulario.idSectorCourse != '' &&
			formulario.idUser != '' &&
			formulario.scoreSector != 0
		) {
			if (formulario.id == '') {
				await postSectorScore(formulario);
			} else if (formulario.id !== '') {
				await putSectorScore(formulario);
			}

			await getSectorScores();
		}
	};

	return (
		<SectorScoreContext.Provider
			value={{
				handleChange,
				formulario,
				setFormulario,
				setSectorScores,
				sectorScores,
				getSectorScores,
				postSectorScore,
				putSectorScore,
				deleteSectorScore,
				setSelectedId,
				selectedId,
				setShowSectorScores,
				showSectorScores,
				getMethod,
				setIdSectorScore,
				idSectorScore,
				handleRequestFunction,
			}}
		>
			{children}
		</SectorScoreContext.Provider>
	);
};

export default SectorScoreProvider;
