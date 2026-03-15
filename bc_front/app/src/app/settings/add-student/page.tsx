'use client'
import theme from "@/theme";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useFetcher } from "@/hooks/useFetcher";
import { Course } from "@/interfaces/Course";
import { User } from "@/interfaces/User";
import { Student } from "@/interfaces/Student";

const AddStudentPage = () => {

    const { apiFetch, isReady } = useFetcher();
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState('0');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [user, setUser] = useState<User>({
        email: '',
        fullName: '',
        password: '',
        failedAttemps: 0,
    });

    const [student, setStudent] = useState<Student>({
        nbSponsorship: 0,
        course: 0,
    });
    useEffect(() => {
        if (!isReady) return;
        const fetchCourses = async () => {
            const res = await apiFetch('/api/courses', 'GET');
            const data = await res.json();
            setCourses(data['member'] ?? []);
        };
        fetchCourses();
    }, [isReady]);


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res1 = await apiFetch('/api/users', 'POST', user);
        const data1 = await res1.json();
        console.log(data1);
        const res2 = await apiFetch('/api/students', 'POST', student);
        const data2 = await res2.json();
        console.log(data2);
    }
    const handleChangeCursus = (event: SelectChangeEvent) => {
        student.course = parseInt(event.target.value);
    }

    const handleChange = (name: string, value: string) => {
        setUser(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        setUser(prev => ({ ...prev, fullName: `${firstName}${lastName}`.trim() }));
    }, [firstName, lastName]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: theme.palette.background.white,
                borderRadius: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                padding: '30px',
                marginInline: 'auto',
            }}
            component="form"
            onSubmit={onSubmit}
        >
            <Typography>Ajouter un étudiant</Typography>
            <TextField label="Nom" variant="outlined" onChange={(e) => setLastName(e.target.value)} />
            <TextField label="Prénom" variant="outlined" onChange={(e) => setFirstName(e.target.value)} />
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedCourse}
                onChange={(event: SelectChangeEvent<string>) => handleChangeCursus(event)}
                label="cursus"
            >
                <MenuItem value="0">sélectionner un cursus</MenuItem>
                {courses.map((course: Course) => (
                    <MenuItem key={course.id} value={course.id}>{course.libelle}</MenuItem>
                ))}
            </Select>
            <TextField label="Adresse email" variant="outlined" onChange={(e) => handleChange('email', e.target.value)} />
            <Button type="submit" variant="contained">Créer</Button>
        </Box>
    )
}

export default AddStudentPage;