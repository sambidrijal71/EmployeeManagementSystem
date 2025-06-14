import { Close, PersonAddAlt1 } from '@mui/icons-material';
import {
  Paper,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { useForm, UseFormSetError, type FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setOpenEditModal } from '../layout/uiSlice';
import { useEffect } from 'react';
import { useGetEmployeeDetailQuery } from '../features/employee/employeeApi';
import { Employee } from '../models/Employee';

interface Props {
  message: string;
  onSubmit: (
    data: FieldValues,
    setError: UseFormSetError<Employee>
  ) => Promise<void>;
  isLoading: boolean;
  employeeId?: number;
  onDirtyChange?: (dirty: boolean) => void;
}

const EmployeeForm = ({
  onSubmit,
  isLoading,
  message,
  employeeId,
  onDirtyChange,
}: Props) => {
  const { data: employee } = useGetEmployeeDetailQuery(employeeId!, {
    skip: !employeeId,
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<Employee>({
    defaultValues: {
      firstName: 'Sambid Prasad',
      lastName: 'Hello Boys',
      email: 'aasdasdas@b.com',
      dateOfJoining: '2025-05-14',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (employee) {
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        dateOfJoining: employee.dateOfJoining?.slice(0, 10),
      });
    }
  }, [employee, reset]);

  useEffect(() => {
    if (onDirtyChange) onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    navigate('/employees');
    dispatch(setOpenEditModal(false));
  };

  return (
    <Paper elevation={10}>
      <CssBaseline />
      <IconButton
        sx={{
          float: 'right',
        }}
        onClick={() => handleCloseModal()}
      >
        <Close />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 8,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
          <PersonAddAlt1 />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {message}
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit((data) => onSubmit(data, setError))}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('firstName', {
                  required: 'First Name is required',
                  maxLength: {
                    value: 30,
                    message: 'First Name cannot be more than 30 characters',
                  },
                  pattern: {
                    value: /^[A-Z][A-Za-z0-9_-]/,
                    message: 'First letter should be capital',
                  },
                })}
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                error={!!errors.firstName}
                helperText={
                  typeof errors.firstName?.message === 'string'
                    ? errors.firstName?.message
                    : ''
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('lastName', {
                  required: 'Last Name is required',
                  maxLength: {
                    value: 30,
                    message: 'Last Name cannot be more than 30 characters',
                  },
                  pattern: {
                    value: /^[A-Z][A-Za-z0-9_-]/,
                    message: 'First letter should be capital',
                  },
                })}
                fullWidth
                id='lastName'
                label='Last Name'
                autoComplete='family-name'
                error={!!errors.lastName}
                helperText={
                  typeof errors.lastName?.message === 'string'
                    ? errors.lastName.message
                    : ''
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
                    message: 'Invalid email format',
                  },
                })}
                fullWidth
                id='email'
                label='Email Address'
                autoComplete='email'
                error={!!errors.email}
                helperText={
                  typeof errors.email?.message === 'string'
                    ? errors.email?.message
                    : ''
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('dateOfJoining', {
                  required: 'Date of Joining is required',
                  pattern: {
                    value:
                      /^(19\d{2}|2\d{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                    message: 'Date should be in YYYY/MM/DD',
                  },
                })}
                label='Date of Joining'
                id='dateOfJoining'
                placeholder='YYYY/MM/DD'
                type='date'
                error={!!errors.dateOfJoining}
                helperText={
                  typeof errors.dateOfJoining?.message === 'string'
                    ? errors.dateOfJoining?.message
                    : ''
                }
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid || !isDirty}
            loading={isLoading}
          >
            {employeeId ? 'Update Employee' : 'Add Employee'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
export default EmployeeForm;
