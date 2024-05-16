const roleHandler = id => {
	switch (id) {
		case '3284495c-136e-4215-b8cc-30e6d9ca52b0':
			return 'Estudiante';
		case '1164b212-c28e-4f5c-a886-36795031cbf3':
			return 'Docente';
		case '248d3d75-8e44-4bc6-a0ca-e02bfaa2c0e4':
			return 'Asesor';
		case 'c27a2360-6bd6-4939-b03c-98e09d25fece':
			return 'Coordinador';
	}
};

export default roleHandler;
