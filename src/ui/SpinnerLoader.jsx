import { CircularProgress, Grid2 as Grid } from '@mui/material';
function SpinnerLoader({ height = "100dvh" }) {
    return (
        <Grid container alignItems={'center'} justifyContent={'center'} sx={{ height: height }}>
            <CircularProgress size={64} />
        </Grid >
    )
}

export default SpinnerLoader