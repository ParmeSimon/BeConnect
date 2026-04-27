import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black', opacity: 0.2 }}>
      <CircularProgress aria-label="Loading…" />
    </Box>
  );
};
export default Loader;