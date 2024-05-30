import React, { useState } from 'react';
import { CourseUserContext } from './CourseUserContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const CourseUserProvider = ({ children }) => {
    const { GETRequest, POSTRequest, PUTRequest, DELETERequest } = useAxiosHandler();
    const [userCourses, setUserCourses] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [formulario, setFormulario] = useState({
        idUser: '',
        idCourse: '',
        active: true
    });
    const [formError, setFormError] = useState(false);
    const url = 'http://127.0.0.1:4000/course';

    const getUserCourse = async () => {
        await GETRequest(url, setUserCourses);
    };

    const postUserCourse = async formData => {
        if (formData) {
            await POSTRequest(formData, url);
            getUserCourses();
        }
    };

    const putUserCourse = async formData => {
        if (formData) {
            await PUTRequest(formData, `${url}/${formData.id}`);
            getUserCourses();
        }
    };

    const deleteUserCourse = async id => {
        if (id) {
            await DELETERequest(url, id);
            getUserCourses();
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value,
        });
    };

    return (
        <CourseUserContext.Provider
            value={{
                postUserCourse,
                getUserCourse,
                putUserCourse,
                deleteUserCourse,
                userCourses,
                selectedId,
                setSelectedId,
                formulario,
                handleChange,
                setFormulario,
            }}
        >
            {children}
        </CourseUserContext.Provider>
    );
};

export default CourseUserProvider;