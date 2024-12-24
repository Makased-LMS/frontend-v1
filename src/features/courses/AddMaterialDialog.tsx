import { Add, AttachFile, Link } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import VisuallyHiddenInput from '../../ui/VisuallyHiddenInput';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatchCourse } from './useDispatchCourse';


function AddMaterialDialog({ payload, open, onClose }) {
    const { register, handleSubmit, watch, formState: { errors: formErrors, isLoading } } = useForm();
    const { courseDispatch, isLoading: dispatchingCourse, isError } = useDispatchCourse();
    console.log(payload);

    const [type, setMaterialType] = useState(0)

    const handleAddMaterial = async (data) => {
        if (!data)
            return;
        const materialType = type === 1 ? 'File' : 'Link'

        await courseDispatch({
            action: 'addSectionPart', payload: {
                sectionId: payload.sectionId,
                data: {
                    title: data.title,
                    materialType,
                    link: data.link,
                    file: data.file ? data.file[0] : ''
                }
            }
        })
        if (!isError)
            onClose();
    }
    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddMaterial)} fullWidth maxWidth={'sm'} open={open} onClose={() => onClose()}>
            <Typography component={DialogTitle} variant='h5' color='primary.main' fontWeight={600} textAlign={'center'}>
                Add Material
            </Typography>
            <Grid component={DialogContent} container spacing={2} height={300} marginY={3}>
                <Grid container flexDirection={'column'} size={3} paddingRight={2} borderRight={2} borderColor={'primary.main'} paddingTop={2}>
                    <Button
                        variant={type === 0 ? 'outlined' : 'text'}
                        startIcon={<Link />}
                        onClick={() => setMaterialType(0)}>
                        Link
                    </Button>
                    <Button
                        variant={type === 1 ? 'outlined' : 'text'}
                        startIcon={<AttachFile />}
                        onClick={() => setMaterialType(1)}>
                        File
                    </Button>
                </Grid>
                <Grid container flexDirection={'column'} spacing={2} size={9} paddingTop={2}>
                    <TextField label="Material title" disabled={isLoading}
                        error={!!formErrors.title}
                        helperText={formErrors.title?.message}
                        {...register('title', { required: "Material Title is required", })}
                    />

                    {type === 0 && <TextField label="Link" disabled={isLoading}
                        fullWidth
                        error={!!formErrors.link}
                        helperText={formErrors.link?.message}
                        {...register('link', { required: "Link is required", })}
                    />
                    }

                    {type === 1 && <Grid container spacing={1} alignItems={'center'}>
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<AttachFile />}
                        >
                            Upload file
                            <VisuallyHiddenInput
                                type="file"
                                {...register('file', { required: "File is required", })}
                            />
                        </Button>
                        <Typography fontSize={14}>
                            {watch('file') ? watch('file')[0]?.name : formErrors.file ? formErrors.file?.message : ''}
                        </Typography>
                    </Grid>
                    }
                </Grid>
            </Grid>
            <DialogActions>
                <Button color='error' variant='outlined' disabled={isLoading || dispatchingCourse} onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined' loading={dispatchingCourse} disabled={isLoading || dispatchingCourse} loadingPosition='end' endIcon={<Add />} >
                    Add material
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default AddMaterialDialog; 
