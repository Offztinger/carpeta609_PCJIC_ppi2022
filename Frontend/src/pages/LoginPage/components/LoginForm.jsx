import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slices/auth.slice';
import useToastHandler from '../../../hooks/toastHandler'; // Asegúrate de tener la ruta correcta
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de Toastify

const LoginForm = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.auth);
	const { toastError } = useToastHandler();
	const [credentials, setCredentials] = useState({ email: '', password: '' });

	useEffect(() => {
		if (error) {
			toastError(error.message || 'Login failed');
		}
	}, [error, toastError]);

	const handleChange = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(loginUser(credentials));
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					value={credentials.email}
					onChange={handleChange}
					placeholder='Email'
				/>
				<input
					type='password'
					name='password'
					value={credentials.password}
					onChange={handleChange}
					placeholder='Password'
				/>
				<button type='submit' disabled={loading}>
					Login
				</button>
			</form>
		</>
	);
};

export default LoginForm;
