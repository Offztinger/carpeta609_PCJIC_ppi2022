import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
	<GoogleOAuthProvider clientId='278435602984-97dpcgan75q3pga5d4dsoklu01s8kdbg.apps.googleusercontent.com'>
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
		,
	</GoogleOAuthProvider>,
);
