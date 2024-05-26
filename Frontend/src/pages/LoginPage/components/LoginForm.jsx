// src/components/LoginForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slices/auth.slice';

const LoginForm = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.auth);
	const [credentials, setCredentials] = useState({ email: '', password: '' });

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
			{error && <p>{error}</p>}
		</form>
	);
};

export default LoginForm;
