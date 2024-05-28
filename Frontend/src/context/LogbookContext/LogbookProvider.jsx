/* eslint-disable react/prop-types */
import { useState } from 'react';
import useAxiosHandler from '../../hooks/axiosHandler';
import { LogbookContext } from './LogbookContext';

const LogbookProvider = ({ children }) => {
	const { POSTRequest, GETRequest, PUTRequest, DELETERequest } =
		useAxiosHandler();
	const [logbook, setLogbook] = useState([]);
	const [selectedId, setSelectedId] = useState('');

	const url = 'http://127.0.0.1:4000/logbook';
	const getLogbook = async () => {
		await GETRequest(url, setLogbook);
	};

	const postLogbook = async team => {
		await POSTRequest(team, url);
		getLogbook();
	};

	const putLogbook = async team => {
		await PUTRequest(team, url);
		getLogbook();
	};

	const deleteLogbook = async id => {
		await DELETERequest(url, id);
		getLogbook();
	};

	return (
		<LogbookContext.Provider
			value={{
				logbook,
				getLogbook,
				postLogbook,
				putLogbook,
				deleteLogbook,
				setSelectedId,
				selectedId,
			}}
		>
			{children}
		</LogbookContext.Provider>
	);
};
export default LogbookProvider;
