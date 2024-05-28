const usePaginatorHandler = () => {
	const handleSectionClick = (index, setCurrentSection) => {
		setCurrentSection(index);
	};

	const chunkArray = (array, size) => {
		const result = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	};

	return { handleSectionClick, chunkArray };
};

export default usePaginatorHandler;
