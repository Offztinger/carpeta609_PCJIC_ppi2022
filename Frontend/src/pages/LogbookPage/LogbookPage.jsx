import React, { useEffect } from 'react';
import LogbookProvider from '../../context/LogbookContext/LogbookProvider';
import LogbookContainer from './LogbookContainer';

const LogbookPage = () => {
	return (
		<LogbookProvider>
			<LogbookContainer />
		</LogbookProvider>
	);
};

export default LogbookPage;
