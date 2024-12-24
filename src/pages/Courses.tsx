import { Button, Divider, Grid2 as Grid, Paper, Typography } from "@mui/material";
import SquaredCourseCard from "../ui/SquaredCourseCard";
import { useDialogs } from "@toolpad/core";
import AddCourseDialog from "../features/courses/AddCourseDialog";
import { useCourses } from "../features/courses/useCourses";

function Courses() {
  const dialogs = useDialogs()
  const { courses, isError, isLoading: fetchingCourses } = useCourses();

  const openCoursesDialog = () => {
    dialogs.open(AddCourseDialog);
  }

  return (
    <Grid component={Paper} container flexDirection={'column'} padding={2} spacing={3}>
      <Grid container justifyContent={'space-between'}>
        <Typography variant="h4" color="primary.main">
          Courses
        </Typography>
        <Button variant="contained" onClick={openCoursesDialog}>Add Course</Button>
      </Grid>

      <Divider />
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {courses?.map((course) => (
          <SquaredCourseCard
            key={course.id}
            courseId={course.id}
            courseName={course.name}
            progress={course.progress}
            createdBy={{
              id: course.createdBy,
              name: course.createdByName
            }}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Courses;
