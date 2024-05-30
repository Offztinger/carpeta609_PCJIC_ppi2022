import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../../redux/slices/auth.slice';

export default function Sidebar() {
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const onClickUser = () => {
		setOpen(!open);
	};

	return (
		<div
			className='d-flex flex-column flex-shrink-0 p-3 text-white'
			style={{ width: '280px', backgroundColor: '#013a06' }}
		>
			<a
				href='/'
				className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'
			>
				<img
					src='https://www.politecnicojic.edu.co/images/logo/logo.png'
					width={'100%'}
				/>
			</a>
			<hr />
			<ul className='sidebar-content h-[85%]'>
				<li className='nav-item'>
					<NavLink
						to='/student'
						className='nav-link text-white'
						activeClassName='active'
					>
						Estudiantes
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='/professor'
						className='nav-link text-white'
						activeClassName='active'
					>
						Profesores
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='/teams'
						className='nav-link text-white'
						activeClassName='active'
					>
						Equipos
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='/course'
						className='nav-link text-white'
						activeClassName='active'
					>
						Cursos
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='/courseUser'
						className='nav-link text-white'
						activeClassName='active'
					>
						Relaciones Curso-Usuario
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='/sector'
						className='nav-link text-white'
						activeClassName='active'
					>
						Cuadrantes
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='/schedule'
						className='nav-link text-white'
						activeClassName='active'
					>
						Asesorias
					</NavLink>
				</li>
				
			</ul>
			<hr />
			<div className='flex justify-around items-center h-[10%] p-2'>
				<div className='flex items-center bg-[#808080] rounded-3xl h-[45px] w-[45px]'>
					<FontAwesomeIcon className='w-full h-[30px]' icon={faUser} />
				</div>
				<div className='relative'>
					<div className='logoutbutton'>
						<button
							onClick={() => {
								dispatch(logout());
							}}
							className={`w-auto rounded-xl p-3 bg-[#196844] ${open ? 'block' : 'hidden'}`}
						>
							Cerrar sesión
						</button>
					</div>
					<button onClick={onClickUser}>
						<FontAwesomeIcon icon={faChevronDown} />
					</button>
				</div>
				<div className='flex flex-col'>
					<p className='text-base font-bold'>{user.email.split('@')[0]}</p>
					<p className='text-sm italic'>{user.permissions[0].role}</p>
				</div>
			</div>
		</div>
	);
}
