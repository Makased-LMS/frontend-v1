import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatchCourse } from './useDispatchCourse';
import LoadingButton from '@mui/lab/LoadingButton';

function AddSectionDialog({ payload, open, onClose }) {
    const { register, handleSubmit, watch, formState: { isLoading, errors: formErrors } } = useForm();

    const { courseDispatch, isLoading: dispatchingCourse, isError } = useDispatchCourse();

    const handleAddSection = async ({ sectionName }) => {
        if (!sectionName)
            return;
        await courseDispatch({ action: 'addSection', payload: { courseId: payload.courseId, data: { title: sectionName } } })

        if (!isError)
            onClose();
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddSection)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                Add new course section
            </DialogTitle>
            <DialogContent>
                <TextField label="Section name" margin='dense' fullWidth
                    disabled={isLoading || dispatchingCourse}
                    error={!!formErrors.sectionName}
                    helperText={formErrors.sectionName?.message}
                    {...register('sectionName', { required: "Section Name is required", })}
                />
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading || dispatchingCourse} onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined' loading={dispatchingCourse} loadingPosition='end' disabled={isLoading || dispatchingCourse} endIcon={<Add />} >
                    Add
                </LoadingButton>
            </DialogActions>
        </Dialog >
    );
}

export default AddSectionDialog