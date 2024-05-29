import useToastHandler from './toastHandler';
import axios from 'axios';

const useAxiosHandler = () => {
	const { toastSuccess, toastError } = useToastHandler();

	const POSTRequest = async (data, url) => {
		await axios
			.post(
				url,
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

	const GETRequest = async (url, setState = undefined) => {
		await axios
			.get(url, {
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

	const PUTRequest = async (data, url) => {
		let body;
		await axios
			.put(
				`${url}/${data.id}`,
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

	const DELETERequest = async (url, id) => {
		await axios
			.delete(`${url}/${id}`, {
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
