import useToastHandler from './toastHandler';
import axios from 'axios';

const useAxiosHandler = () => {
	const { toastSuccess, toastError } = useToastHandler();

	const POSTRequest = async (data, url) => {
		try {
			const response = await axios.post(
				url,
				data, // Enviamos el data directamente como objeto
				{
					headers: {
						'Content-Type': 'application/json', // Cambiamos el Content-Type
						Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
					},
				},
			);

			if (response.status === 200) {
				toastSuccess('Se ha creado el registro exitosamente');
				return `Result: ${response.status}`;
			}
		} catch (error) {
			console.error(error);
			toastError(error.response.data.message);
		}
	};

	const GETRequest = async (url, setState) => {
		await axios
			.get(url, {
				headers: {
					'Content-Type': 'application/json', // También cambiamos el Content-Type aquí si es necesario
					Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
				},
			})
			.then(res => {
				res.data && setState(res.data);
				return `Result: ${res.status}`;
			})
			.catch(error => {
				toastError(error.response.data.message);
				console.error(error);
			});
	};

	const PUTRequest = async (data, url) => {
		try {
			const response = await axios.put(
				`${url}/${data.id}`,
				data, // Enviamos el data directamente como objeto
				{
					headers: {
						'Content-Type': 'application/json', // Cambiamos el Content-Type
						Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
					},
				},
			);

			if (response.status === 200) {
				toastSuccess('Se ha alterado el registro exitosamente');
				return `Result: ${response.status}`;
			} else {
				console.error(`Error en la petición: ${response.status}`);
				toastError(`Error en alterar el registro: ${response.status}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const DELETERequest = async (url, id) => {
		try {
			const response = await axios.delete(`${url}/${id}`, {
				headers: {
					'Content-Type': 'application/json', // Cambiamos el Content-Type si es necesario
					Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
				},
			});

			if (response.status === 200) {
				toastSuccess('Se ha eliminado el registro exitosamente');
				return `Result: ${response.status}`;
			} else {
				console.error(`Error en la petición: ${response.status}`);
				toastError(`Error en eliminar el registro: ${response.status}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return { GETRequest, POSTRequest, PUTRequest, DELETERequest };
};

export default useAxiosHandler;
