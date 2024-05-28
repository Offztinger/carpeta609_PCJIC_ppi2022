import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';
import correo from './icons/envelope.png';
import Sidebar from './components/shared/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import StudentPage from './pages/StudentPage/StudentPage';
import ProfessorPage from './pages/ProfessorPage/ProfessorPage';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import { ScheduleContext } from './context/ScheduleContext/ScheduleContext';
import MeetingPage from './pages/MeetingPage/MeetingPage';

const App = () => {
	const { schedule, getSchedule } = useContext(ScheduleContext);
	const { user } = useSelector(state => state.auth);
	const cronogramaActual = [];

	const cronogramaActual1 = schedule.filter(element => {
		return element;
	});

	useEffect(() => {
		getSchedule('schedule');
		console.log('user', user);
	}, [user]);

	const [popUpOpen, setPopUpOpen] = useState(false);
	const [isFirstInteraction, setIsFirstInteraction] = useState(true);

	const openPopUp = () => {
		const popUp = document.getElementById('notification-popup');
		if (popUpOpen) {
			popUp.classList.remove('active');
			popUp.classList.add('inactive');
			setTimeout(() => {
				popUp.style.display = 'none';
			}, 300); // Ajusta este tiempo al mismo que la duración de tu animación
		} else {
			if (isFirstInteraction) {
				popUp.classList.remove('initial');
				setIsFirstInteraction(false);
			}
			popUp.style.display = 'block';
			popUp.classList.remove('inactive');
			popUp.classList.add('active');
		}
		setPopUpOpen(!popUpOpen);
	};

	return (
		<Router>
			<main>
				<ToastContainer autoClose={5000} />
				<div className='d-flex'>
					{!user && (
						<section
							className='w-100 justify-content-center'
							style={{ display: 'flex' }}
						>
							<LoginPage />
						</section>
					)}
					{user && (
						<section style={{ display: 'flex flex-col', overflow: 'hidden' }}>
							<div className='header'>
								<div className='logos-header'>
									<button id='notification-btn' onClick={openPopUp}>
										<img src={correo} className='correo-logo' />
									</button>
									<div id='notification-popup' className='initial'>
										<div className='popup-content'>
											<div className='popup-header'>
												<h3>Notificaciones</h3>
												<button id='close-btn' onClick={openPopUp}>
													<i className='fa fa-times' aria-hidden='true'></i>
												</button>
											</div>
											<ul className='notifications-list'>
												{cronogramaActual.map((actividades, index) => {
													return (
														<li
															className='d-flex justify-content-start'
															key={index}
														>
															<a href='#'>
																<strong>Actividad: </strong>
																{actividades.titulo} <strong>Hora: </strong>
																{actividades.hora_inicio}
															</a>
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className='flex'>
								<Sidebar user={user} />
								<div className='contenedorPrincipal' style={{ height: '90vh' }}>
									<Routes>
										<Route path='/' element={<Dashboard />} />
										<Route path='/student' element={<StudentPage />} />
										<Route path='/professor' element={<ProfessorPage />} />
										<Route path='/schedule' element={<SchedulePage />} />
										<Route path='/meeting' element={<MeetingPage />} />
									</Routes>
								</div>
							</div>
						</section>
					)}
				</div>
			</main>
		</Router>
	);
};

export default App;

/* <Routes>
<Route path='/' element={<Dashboard />} />
<Route
	path='/readEstudiantes'
	element={
		<VerEstudiantes
			estudiantes={estudiantes}
			setPutIDEs={setPutIDEs}
		/>
	}
/>
<Route
	path='/createEstudiante'
	element={<RegistrarEstudiantes />}
/>
<Route path='/createDocente' element={<RegistrarDocentes />} />
<Route path='/createAsesor' element={<RegistrarAsesores />} />
<Route
	path='/createCita'
	element={<RegistrarCitas cronograma={cronograma} />}
/>
<Route
	path='/editEstudiante'
	element={
		<EditarEstudiantes
			putIDEs={putIDEs}
			setPutIDEs={setPutIDEs}
		/>
	}
/>
<Route path='/createEquipo' element={<CrearEquipos />} />
<Route path='/readEquipos' element={<VerEquipos />} />
<Route path='/readDocentes' element={<VerDocentes />} />
<Route path='/readAsesores' element={<VerAsesores />} />
<Route
	path='/calendar'
	element={<CalendarComponent cronograma={cronograma} />}
/>
</Routes> */
