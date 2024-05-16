import { toast, Bounce } from 'react-toastify';

const useToastHandler = () => {
	const toastSuccess = message => {
		toast.success(`${message}`, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			transition: Bounce,
		});
	};

	const toastError = message => {
		toast.error(`${message}`, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			transition: Bounce,
		});
	};

	const toastWarning = message => {
		toast.warning(`${message}`, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			transition: Bounce,
		});
	};

	const toastInfo = message => {
		toast.info(`${message}`, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			transition: Bounce,
		});
	};

	return { toastSuccess, toastError, toastWarning, toastInfo };
};

export default useToastHandler;
