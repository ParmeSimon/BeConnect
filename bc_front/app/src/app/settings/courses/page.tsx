'use client'
import { Box, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useFetcher } from '@/hooks/useFetcher';
import { useState } from 'react';
import theme from '@/theme';
const CoursesPage = () => {
    const { apiFetch } = useFetcher();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            const courses = await apiFetch('/api/courses');
            const data = await courses.json();
            setCourses(data);
        }
        fetchCourses();
    }, []);
    
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '80vh'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, backgroundColor: theme.palette.background.white, borderRadius: '15px', justifyContent: 'center', alignItems: 'center', width: '40%', padding: '50px', marginInline: 'auto', marginTop: '30px'}}>
        
            </Box>
        </Box>
    )
}

export default CoursesPage;