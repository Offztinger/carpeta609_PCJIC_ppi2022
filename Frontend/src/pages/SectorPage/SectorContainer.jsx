import React, { useContext, useEffect } from 'react';
import { SectorContext } from '../../context/SectorContext/SectorContext'; // Asegúrate de importar el contexto correcto
import SectorTable from './components/SectorTable'; // Asegúrate de tener este componente creado

const SectorContainer = () => {
    const { getSectors, deleteSector, setSelectedId } = useContext(SectorContext);

    useEffect(() => {
        getSectors('sector');
    }, []);

    const deleteSectorItem = async idToDelete => {
        idToDelete && (await deleteSector('sector', idToDelete));
    };

    const updateId = id => {
        setSelectedId(id);
    };

    return (
        <main>
            <SectorTable deleteFunction={deleteSectorItem} updateId={updateId} />
        </main>
    );
};

export default SectorContainer;