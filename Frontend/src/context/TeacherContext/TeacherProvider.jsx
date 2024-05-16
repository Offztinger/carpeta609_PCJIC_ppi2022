/* eslint-disable react/prop-types */

import { useState } from 'react';
import { UserContext } from './UserContext';

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		id: 10,
		name: 'Juan',
	});
	return (
		<UserContext.Provider value={{ user, setUser, message: 'hola' }}>
			{children}
		</UserContext.Provider>
	);
};
export default UserProvider;
