import useToastHandler from './toastHandler';
import { Axios } from 'axios';

const useAxiosHandler = () => {
	const { toastSuccess, toastError } = useToastHandler();
	const POSTRequest = async (data, url) => {
		try {
			const response = await Axios.post(
				`${url}`,
				{
					data,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			);

			if (response.status === 200) {
				toastSuccess('Se ha creado el registro exitosamente');
				return `Result: ${response.status}`;
			} else {
				console.error(`Error en la petición: ${response.status}`);
				toastError(`Error en la creación del registro: ${response.status}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const GETRequest = async (url, setState) => {
		await Axios.get(`${url}`, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(res => {
				res.data && setState(res.data);
				return `Result: ${res.status}`;
			})
			.catch(error => {
				console.error(error);
			});
	};

	const PUTRequest = async (data, url, id) => {
		try {
			const response = await Axios.put(
				`${url}/${id}`,
				{
					data,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
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
			const response = await Axios.delete(`${url}/${id}`, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
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
