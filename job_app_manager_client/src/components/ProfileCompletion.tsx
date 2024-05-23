import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ProfileCompletion(props: CircularProgressProps & { value: number }) {
  const normalizedValue = props.value * 100;
  
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} value={normalizedValue} />
      <Box
        sx={{
          top: 3,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="white">
          {`${Math.round(normalizedValue)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProfileCompletion;
