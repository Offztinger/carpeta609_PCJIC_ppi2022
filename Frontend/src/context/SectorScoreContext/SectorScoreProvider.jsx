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
	const [folderId, setFolderId] = useState(undefined);

	const url = 'http://127.0.0.1:4000/sectorScore';

    const [formulario, setFormulario] = useState({
        id: '',
        idSectorCourse: '',
        scoreSector: '',
        folderNumberId: '',
        idUser: '',
	});
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value) && value >= 0 && value <= 5) {
            setFormulario((prevFormulario) => ({
                ...prevFormulario,
                [name]: value,
            }));
        }
    };

	const getMethod = setState => {
		GETRequest(url, setState);
	};

	const getSectorScores = async () => {
		await GETRequest(`${url}`, setSectorScores);
	};

	const postSectorScore = async sectorScore => {
		await POSTRequest(sectorScore, url);
		getSectorScores();
	};

	const putSectorScore = async sectorScore => {
		await PUTRequest(sectorScore, url);
		getSectorScores();
	};

	const deleteSectorScore = async id => {
		await DELETERequest(url, id);
		getSectorScores();
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
				folderId,
				setFolderId,
				getMethod,
			}}
		>
			{children}
		</SectorScoreContext.Provider>
	);
};

export default SectorScoreProvider;
