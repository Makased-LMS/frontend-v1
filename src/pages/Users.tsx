import { Box, Button, Grid2 as Grid, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { roleNames } from '../Enums/roles';
import { levelNames } from '../Enums/educationLevels';
import { useUsers } from '../features/users/useUsers';
import SpinnerLoader from '../ui/SpinnerLoader';
import { useNavigate } from 'react-router-dom';
import { useDialogs } from '@toolpad/core';
import ActionsMenu from '../ui/ActionsMenu';
import { useDispatchUsers } from '../features/users/useDispatchUsers';
import { Add } from '@mui/icons-material';


function Users() {
    const { users, isLoading: fetchingUsers } = useUsers();
    const { usersDispatch, isLoading: dispatchingUser } = useDispatchUsers()
    const navigate = useNavigate()
    const dialogs = useDialogs();

    const handleEdit = (id) => {
        navigate(`${id}`)
    }

    const handleDelete = async (id) => {
        const confirmed = await dialogs.confirm('Are you sure to delete this User?', {
            title: 'Delete User ❌',
            okText: 'Yes',
            cancelText: 'No',
        })

        if (confirmed)
            usersDispatch({ action: 'delete', payload: { id } })
    }

    const columns = [
        {
            field: 'workId',
            headerName: 'Work ID',
            width: 120,
            editable: true,
        },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 120,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 120,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: true,
        },
        {
            field: 'educationalLevel',
            valueGetter: (value) => {
                return levelNames[value]
            },
            headerName: 'Educational level',
            width: 150,
            editable: true,
        },
        {
            field: 'role',
            valueGetter: (value) => {
                return roleNames[value]
            },
            headerName: 'Role',
            width: 100,
            editable: true,
        },
        {
            field: 'department',
            valueGetter: (value) => {
                return value.name
            },
            headerName: 'Department',
            width: 150,
            editable: true,
        },
        {
            field: 'major',
            valueGetter: (value) => {
                return value.name
            },
            headerName: 'Major',
            width: 130,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <ActionsMenu key={id}
                        items={[
                            { title: 'Edit', onClick: () => handleEdit(id) },
                            { title: 'Delete', onClick: () => handleDelete(id) }
                        ]}
                    />
                ];
            },
        }

    ];

    if (fetchingUsers || dispatchingUser)
        return <SpinnerLoader />

    return (
        <Grid component={Paper} container flexDirection={'column'} height={'100%'} spacing={2} sx={{
            padding: 2,
            width: {
                xs: '100dvw',
                sm: '90dvw',
                md: '75dvw',
                lg: '81dvw',
                xl: '84dvw'
            }
        }}
        >
            <Grid container justifyContent={'space-between'} padding={1} sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center'
            }}>
                <Typography variant='h4' color='primary'>
                    Users
                </Typography>
                <Button
                    // onClick={openAddUserDialod} 
                    variant='contained' endIcon={<Add />}>Add user</Button>
            </Grid>
            <DataGrid
                rows={users.items}
                columns={columns}
                rowCount={users.metadata.totalPages}
                loading={fetchingUsers || dispatchingUser}
                editMode="row"
                pageSizeOptions={[10]}
                // checkboxSelection
                disableRowSelectionOnClick
                onRowClick={async (data) => {
                    const confirmed = await dialogs.confirm('Do you want to show full user details?', {
                        okText: 'Yes',
                        cancelText: 'No',
                    })

                    if (confirmed)
                        navigate(`${data.id}`)
                }}
                sx={{
                    width: '100%'
                }}
            />
        </Grid>
    )
}

export default Users