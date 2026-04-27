'use client'
import theme from "@/theme";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useFetcher } from "@/hooks/useFetcher";
import { Course } from "@/interfaces/Course.interface";
import { User } from "@/interfaces/User.interface";
import { createStudentEmail } from "@/utils/email";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";

const AddStudentPage = () => {
    const { data: session } = useSession();
    const { apiFetch, isReady } = useFetcher();
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState('0');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User>({
        email: '',
        roles: ['ROLE_STUDENT'],
        fullName: '',
        password: '',
        failedAttemps: 0,
        confirmationToken: '',
        administrator: undefined,
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

    const resetFields = () => {
        setFirstName('');
        setLastName('');
        setSelectedCourse('0');
        setUser({
            fullName: '',
            password: '',
            failedAttemps: 0,
            confirmationToken: '',
            email: '',
            roles: ['ROLE_STUDENT']
        } as User);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const token = crypto.randomUUID();
        const userPayload = { ...user, confirmationToken: token, password: token, administrator: `/api/administrators/${session!.user.administrateur?.id}`};

        const resUser = await apiFetch('/api/users', 'POST', userPayload);
        const dataUser = await resUser.json();
        if (resUser.status !== 201) {
            enqueueSnackbar('L\'adresse email est déjà utilisée', { variant: 'error' })
            return;
        }

        const studentPayload = {
            user: dataUser['@id'],
            course: [`/api/courses/${selectedCourse}`],
            nbSponsorship: 0,
            administrator: `/api/administrators/${user.id}`,
        };
        await apiFetch('/api/students', 'POST', studentPayload);

        const activationLink = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/activate-account?token=${token}&type=create_account`;
        await createStudentEmail(
            [dataUser['email']],
            dataUser['fullName'],
            'create_account',
            dataUser['roles'][0],
            activationLink,
            apiFetch
        )
        resetFields()
        enqueueSnackbar('Étudiant créé avec succès', { variant: 'success' })
        setIsLoading(false);
    }

    const handleChangeCursus = (event: SelectChangeEvent<string>) => {
        setSelectedCourse(event.target.value);
    }

    const handleChange = (name: string, value: string) => {
        setUser(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        setUser(prev => ({ ...prev, fullName: `${firstName} ${lastName}`.trim() }));
    }, [firstName, lastName]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '80vh'}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    backgroundColor: theme.palette.background.white,
                    borderRadius: '15px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40%',
                    padding: '50px',
                    marginInline: 'auto',
                    marginTop: '30px',
                }}
                component="form"
                onSubmit={onSubmit}
            >
                <Typography variant="h5">Ajouter un étudiant</Typography>
                <TextField label="Nom" variant="outlined" onChange={(e) => setLastName(e.target.value)} sx={{width: '70%'}} value={lastName} />
                <TextField label="Prénom" variant="outlined" onChange={(e) => setFirstName(e.target.value)} sx={{width: '70%'}} value={firstName} />
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="course"
                    value={selectedCourse}
                    onChange={handleChangeCursus}
                    label="cursus"
                    sx={{width: '70%'}}
                >
                    <MenuItem value="0">sélectionner un cursus</MenuItem>
                    {courses.map((course: Course) => (
                        <MenuItem key={course.id} value={course.id} >{course.libelle}</MenuItem>
                    ))}
                </Select>
                <TextField type="email" label="Adresse email" variant="outlined" onChange={(e) => handleChange('email', e.target.value)} sx={{width: '70%'}} value={user.email} />
                <Button type="submit" variant="contained" sx={{width: '70%', color: theme.palette.background.white, backgroundColor: theme.palette.background.purple }} disabled={isLoading}>Créer</Button>
            </Box>
        </Box>
       
    )
}

export default AddStudentPage;