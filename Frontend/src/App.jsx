import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VerEstudiantes from './components/VerEstudiantes/VerEstudiantes';
import RegistrarEstudiantes from './components/RegistrarEstudiantes/RegistrarEstudiantes';
import EditarEstudiantes from './components/EditarEstudiantes/EditarEstudiantes';
import CrearEquipos from './components/CrearEquipos/CrearEquipos';
import VerEquipos from './components/VerEquipos/VerEquipos';
import correo from './icons/envelope.png';
import calendario from './icons/calendar-page.png';
import RegistrarDocentes from './components/CrearDocentes/RegistrarDocentes';
import RegistrarAsesores from './components/CrearAsesores/RegistrarAsesores';
import VerDocentes from './components/VerDocentes/VerDocentes';
import VerAsesores from './components/VerAsesores/VerAsesores';
import RegistrarCitas from './components/CrearCitas/RegistrarCitas';
import CalendarComponent from './components/CalendarComponent/calendarComponet';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
	function zero() {
		if (day < 10) {
			day = '0' + day;
		}
		if (month < 10) {
			month = '0' + month;
		}
	}

	const todayDate = new Date();
	const year = todayDate.getFullYear();
	let month = todayDate.getMonth() + 1;
	let day = todayDate.getDate();
	zero();
	const today = `${year}-${month}-${day}`;
	const notificationPopup = document.getElementById('notification-popup');
	const closeBtn = document.getElementById('close-btn');
	const [estudiantes, setEstudiantes] = useState([]);
	const [putIDEs, setPutIDEs] = useState();
	const [cronograma, setCronograma] = useState([]);

	const cronogramaActual = cronograma.filter(
		actividad => actividad.fecha === today,
	);

	const fetchApi = async () => {
		const response = await fetch('http://localhost:8080/estudiante', {
			method: 'GET',
		});
		const responseJSON = await response.json();
		setEstudiantes(responseJSON);
		const response2 = await fetch('http://localhost:8080/cronograma', {
			method: 'GET',
		});
		const responseJSON2 = await response2.json();
		setCronograma(responseJSON2);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	let popUpOpen = false;
	const openPopUp = () => {
		const popUp = document.getElementById('notification-popup');
		popUpOpen
			? (popUp.style.display = 'none')
			: (popUp.style.display = 'block');
		popUpOpen = !popUpOpen;
	};

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	// const [isLogged, setIsLogged] = useState(false);

	return (
		<Router>
			<main>
				<div className='header'>
					<div className='logos-header'>
						{/* {isLogged ? ( */}
							<button id='notification-btn' onClick={openPopUp}>
								<img src={correo} className='correo-logo' />
							</button>
						{/* ) : null} */}
						<div id='notification-popup'>
							<div className='popup-content'>
								<div className='popup-header'>
									<h3>Notificaciones</h3>
									<button id='close-btn'>
										<i className='fa fa-times' aria-hidden='true'></i>
									</button>
								</div>
								<ul className='notifications-list'>
									{cronogramaActual.map((actividades, index) => {
										return (
											<li className='d-flex justify-content-start' key={index}>
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
				<div className='d-flex' style={{ height: '90vh' }}>
					{/* {!isLogged && (
					<section
						className='w-100 justify-content-center'
						style={{ display: 'flex' }}
					>
						<Login
							setIsLogged={setIsLogged}
							isLogged={isLogged}
							user={user}
							setUser={setUser}
						/>
					</section>
				)} */}
					{/* {isLogged && ( */}
					<section style={{ display: 'flex', overflow: 'hidden' }}>
						<Sidebar user={user} />
						<div
							className='contenedorPrincipal d-flex flex-column align-items-center justify-content-center'
							style={{ height: '90vh' }}
						>
							<Routes>
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
							</Routes>
						</div>
					</section>
					{/* )} */}
				</div>
			</main>
		</Router>
	);
};

export default App;
