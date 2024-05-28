import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import ScheduleProvider from './context/ScheduleContext/ScheduleProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<React.StrictMode>
			<ScheduleProvider>
				<App />
			</ScheduleProvider>
		</React.StrictMode>
	</Provider>,
);
