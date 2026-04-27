'use client , Typography'
import { Box, Typography, Modal, TextField } from "@mui/material";
import { Student } from "../interfaces/Student.interface";
function EditProfil({ open, onClose, student }: { open: boolean, onClose: () => void, student: Student}) {
    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{gap: 2, width: '50%', height: '50%', backgroundColor: 'white', borderRadius: 2, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">Modifier le profil</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <TextField id="outlined-basic" label="Prénom" variant="outlined" />
                    <TextField id="outlined-basic" label="Nom" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Ville" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <TextField id="outlined-basic" label="Site web" variant="outlined"/>
                    <TextField id="outlined-basic" label="Linkedin" variant="outlined"/>
                </Box>

            </Box>
        </Modal>
    )
}
export default EditProfil;