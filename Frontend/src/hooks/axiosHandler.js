import useToastHandler from './toastHandler';
import axios from 'axios';
import { backendURL } from '../config/constants';

const useAxiosHandler = () => {
	const { toastSuccess, toastError } = useToastHandler();

	const POSTRequest = async (data, path) => {
		await axios
			.post(
				`${backendURL}${path}`,
				data, // Enviamos el data directamente como objeto
				{
					headers: {
						'Content-Type': 'application/json', // Cambiamos el Content-Type
						Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
					},
				},
			)
			.then(res => {
				if (res.status === 201) {
					toastSuccess('Se ha creado el registro exitosamente');
				}
			})
			.catch(error => {
				console.error(error);
				toastError(error.response.data.message);
			});
	};

	const GETRequest = async (path, setState = undefined) => {
		await axios
			.get(`${backendURL}${path}`, {
				headers: {
					'Content-Type': 'application/json', // También cambiamos el Content-Type aquí si es necesario
					Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
				},
			})
			.then(res => {
				setState && res.data && setState(res.data);
				return res.data;
			})
			.catch(error => {
				toastError(error.response.data.message);
				console.error(error);
			});
	};

	const PUTRequest = async (data, path) => {
		let body;
		await axios
			.put(
				`${backendURL}${path}/${data.id}`,
				data, // Enviamos el data directamente como objeto
				{
					headers: {
						'Content-Type': 'application/json', // Cambiamos el Content-Type
						Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
					},
				},
			)
			.then(res => {
				body = res.data;
				if (res.status === 200) {
					toastSuccess('Se ha actualizado el registro exitosamente');
				}
			})
			.catch(error => {
				console.error(error);
				toastError(error.response.data.message);
			});
		return body;
	};

	const DELETERequest = async (path, id) => {
		await axios
			.delete(`${backendURL}${path}/${id}`, {
				headers: {
					'Content-Type': 'application/json', // Cambiamos el Content-Type si es necesario
					Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
				},
			})
			.then(res => {
				if (res.status === 200) {
					toastSuccess('Se ha eliminado el registro exitosamente');
				}
			})
			.catch(error => {
				console.error(error);
				toastError(error.response.data.message);
			});
	};

	return { GETRequest, POSTRequest, PUTRequest, DELETERequest };
};

export default useAxiosHandler;
