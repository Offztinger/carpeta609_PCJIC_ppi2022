import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slices/auth.slice';
import { loginWithGoogle } from '../../../redux/slices/auth.slice';

const LoginForm = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.auth);
	const [credentials, setCredentials] = useState({ email: '', password: '' });

	useEffect(() => {
		dispatch(loginWithGoogle());
	}, [dispatch]);

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

	const handleGoogleLogin = () => {
		dispatch(loginWithGoogle());
	};

	return (
		<div className='w-[750px] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
			<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
				<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
					<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
						Inicia sesión
					</h1>
					<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
						<div>
							<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Tu correo educativo
							</label>
							<input
								type='email'
								name='email'
								id='email'
								value={credentials.email}
								onChange={handleChange}
								className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='name@company.com'
								required=''
							/>
						</div>
						<div>
							<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Contraseña
							</label>
							<input
								type='password'
								name='password'
								id='password'
								value={credentials.password}
								onChange={handleChange}
								placeholder='••••••••'
								className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								required=''
							/>
						</div>
						<button
							type='submit'
							disabled={loading}
							className='w-full text-white bg-[#196844] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
						>
							Iniciar sesión
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;

{
	/* <form >
				<input

					placeholder='Email'
				/>
				<input

					placeholder='Password'
				/>
				<button type='submit' >
					Login
				</button>
			</form> */
}
