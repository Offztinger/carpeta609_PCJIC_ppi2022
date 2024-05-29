import React, { useState, useEffect } from 'react';
import { CoursesContext } from './CoursesContext';
import useAxiosHandler from '../../hooks/axiosHandler';
import * as XLSX from 'xlsx';

const CoursesProvider = ({ children }) => {
    const { POSTRequest, GETRequest, PUTRequest, DELETERequest } = useAxiosHandler();
    const [courses, setCourses] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [formulario, setFormulario] = useState({
        courseName: '',
        courseDescription: '',
        idProfessor: '',
        courseLevel: 0,
    });
    const [formError, setFormError] = useState(true);

    useEffect(() => {
        console.log('selectedId', selectedId);
    }, [selectedId]);

    const postCourse = async (formulario) => {
        if (formulario) {
            await POSTRequest(formulario, `http://127.0.0.1:4000/course`);
            getCourses(courses);
        }
    };

    const getCourses = courses => {
        GETRequest(`http://127.0.0.1:4000/course`, setCourses);
    };

    const putCourse = async (courses, formulario) => {
        if (formulario) {
            await PUTRequest(formulario, `http://127.0.0.1:4000/course`, id);
            getCourses(courses);
        }
    };

    const deleteCourse = async (courses, id) => {
        if (id) {
            await DELETERequest(`http://127.0.0.1:4000/course`, id);
            getCourses(courses);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value,
        });
    };

    const handleRequestFunction = async course => {
        if (
            formulario.courseName !== '' &&
            formulario.courseDescription !== '' &&
            formulario.idProfessor !== '' &&
            formulario.courseLevel !== 0
        ) {
            setFormError(false);
            if (selectedId) {
                await putCourse(course, formulario);
            } else if (!selectedId) {
                await postCourse(course, formulario);
            }
        } else {
            alert('Valide los datos en el formulario');
        }
    };

    const exportToExcel = course => {
        const wb = XLSX.utils.book_new();
        let row = [
            [
                { v: 'ID', t: 's', s: {} },
                { v: 'Nombre del Curso', t: 's', s: {} },
                { v: 'Descripción del Curso', t: 's', s: {} },
                { v: 'ID del Profesor', t: 's', s: {} },
                { v: 'Nivel del Curso', t: 's', s: {} },
            ],
        ];
        courses.forEach(course => {
            row = [
                ...row,
                [
                    { v: course.id, t: 's', s: {} },
                    { v: course.courseName, t: 's', s: {} },
                    { v: course.courseDescription, t: 's', s: {} },
                    { v: course.idProfessor, t: 's', s: {} },
                    { v: course.courseLevel, t: 's', s: {} },
                ],
            ];
        });
        const ws = XLSX.utils.aoa_to_sheet(row);
        XLSX.utils.book_append_sheet(wb, ws, 'cursos');
        XLSX.writeFile(wb, 'lista' + 'Cursos' + '.xlsx');
    };

    return (
        <CoursesContext.Provider
            value={{
                postCourse,
                getCourses,
                putCourse,
                deleteCourse,
                courses,
                selectedId,
                setSelectedId,
                formulario,
                handleChange,
                handleRequestFunction,
                exportToExcel,
                setFormulario,
            }}
        >
            {children}
        </CoursesContext.Provider>
    );
};

export default CoursesProvider;