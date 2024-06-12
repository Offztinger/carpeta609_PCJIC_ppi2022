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
import CoursesPage from './pages/CoursesPage/CoursesPage';
import TeamPage from './pages/TeamPage/TeamPage';
import LogbookPage from './pages/LogbookPage/LogbookPage';
import SectorPage from './pages/SectorPage/SectorPage';
import SectorCoursePage from './pages/SectorCoursePage/SectorCoursePage';
import SectorScorePage from './pages/SectorScorePage/SectorScorePage';
import TeamForm from './pages/TeamPage/components/TeamForm';
import CourseUserPage from './pages/CourseUserPage/CourseUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	const { schedule, getSchedule } = useContext(ScheduleContext);
	const { user } = useSelector(state => state.auth);

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
								<div className='w-full flex justify-between logos-header'>
									<a href='mailto:offztinger@gmail.com' target='_blank'>
										<FontAwesomeIcon
											style={{ cursor: 'pointer' }}
											className='w-[60px] h-[60px]'
											icon={faCircleQuestion}
										/>
									</a>
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
												{schedule.map((actividades, index) => {
													return (
														<li
															className='d-flex justify-content-start'
															key={index}
														>
															<a href='#'>
																<strong>Actividad: </strong>
																{'Asesoria'} <strong>Hora: </strong>
																{actividades.scheduleHour}
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
										<Route path='/course' element={<CoursesPage />} />
										<Route path='/teams' element={<TeamPage />} />
										<Route path='/teams/:id' element={<TeamPage />} />
										<Route path='/teamform' element={<TeamForm />} />
										<Route path='/logbook/:id' element={<LogbookPage />} />
										<Route path='/sector' element={<SectorPage />} />
										<Route
											path='/sectorCourse/:id'
											element={<SectorCoursePage />}
										/>
										<Route
											path='/sectorScore/:id'
											element={<SectorScorePage />}
										/>
										<Route path='/courseUser' element={<CourseUserPage />} />
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
