import { Button, Grid2 as Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
function QuizSessionEnded() {
    const { courseId } = useParams();
    return (
        <Grid container flexDirection={'column'} size={12} flex={1} alignItems={'center'} justifyContent={'center'} spacing={3}>
            <Typography variant="h1" fontWeight={700} color="error">
                409
            </Typography>
            <Typography variant="h3">
                Quiz Session ended or not started!
            </Typography>
            <Typography variant="h2">
                ⌛
            </Typography>

            <Button size={'large'} variant={'contained'} sx={{ marginTop: 20 }}>
                <Link component={RouterLink} replace to={`/courses/${courseId}`} underline="none" color="white">
                    Return to course
                </Link>
            </Button>

        </Grid>
    )
}

export default QuizSessionEnded