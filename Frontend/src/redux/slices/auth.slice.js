import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveState } from '../../utils/localStorage';
import axios from 'axios';
import useToastHandler from '../../hooks/toastHandler'; // Asegúrate de tener la ruta correcta

export const loginUser = createAsyncThunk(
	'auth/loginUser',

	async (credentials, { rejectWithValue }) => {
		try {
			const { toastError } = useToastHandler();
			const response = await axios
				.post('http://3.147.42.128:4000/auth/login', credentials)
				.catch(error => {
					toastError(error.response.data.message);
				});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const loginWithGoogle = createAsyncThunk(
	'auth/loginWithGoogle',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				'http://3.147.42.128:4000/auth/google/redirect',
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

const initialState = {
	user: null,
	accessToken: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.user = null;
			state.accessToken = null;
			localStorage.removeItem('token');
			localStorage.removeItem('state'); // Remover el estado guardado en localStorage
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload; // Guardar toda la respuesta del backend
				state.accessToken = action.payload.accessToken;
				localStorage.setItem('token', action.payload.accessToken);
				saveState({ auth: state }); // Guardar el estado actualizado en localStorage
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(loginWithGoogle.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload; // Guardar toda la respuesta del backend
				state.accessToken = action.payload.accessToken;
				localStorage.setItem('token', action.payload.accessToken);
				saveState({ auth: state }); // Guardar el estado actualizado en localStorage
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
