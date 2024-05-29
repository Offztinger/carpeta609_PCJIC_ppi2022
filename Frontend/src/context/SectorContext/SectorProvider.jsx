import React, { useState, useEffect } from 'react';
import { SectorContext } from './SectorContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const SectorProvider = ({ children }) => {
    const { POSTRequest, GETRequest, PUTRequest, DELETERequest } = useAxiosHandler();
    const [sectors, setSectors] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [formulario, setFormulario] = useState({
        sectorName: '',
        sectorObjective: '',
    });
    const [formError, setFormError] = useState(true);

    useEffect(() => {
        console.log('selectedId', selectedId);
    }, [selectedId]);

    const postSector = async (moduleName, formulario) => {
        if (formulario) {
            await POSTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
            getSectors(moduleName);
        }
    };

    const getSectors = moduleName => {
        GETRequest(`http://127.0.0.1:4000/${moduleName}`, setSectors);
    };

    const putSector = async (moduleName, formulario) => {
        if (formulario) {
            await PUTRequest(formulario, `http://127.0.0.1:4000/${moduleName}`);
            getSectors(moduleName);
        }
    };

    const deleteSector = async (moduleName, id) => {
        if (id) {
            await DELETERequest(`http://127.0.0.1:4000/${moduleName}`, id);
            getSectors(moduleName);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value,
        });
    };

    const handleRequestFunction = async moduleName => {
        if (formulario.sectorName !== '' && formulario.sectorObjective !== '') {
            setFormError(false);
            if (selectedId) {
                await putSector(moduleName, formulario);
            } else {
                await postSector(moduleName, formulario);
            }
        } else {
            alert('Valide los datos en el formulario');
        }
    };

    return (
        <SectorContext.Provider
            value={{
                postSector,
                getSectors,
                putSector,
                deleteSector,
                sectors,
                selectedId,
                setSelectedId,
                formulario,
                handleChange,
                handleRequestFunction,
                setFormulario,
            }}
        >
            {children}
        </SectorContext.Provider>
    );
};

export default SectorProvider;