import { Close, PersonAddAlt1 } from '@mui/icons-material';
import {
  Paper,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
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
import FormInput from './FormInput';
import {
  dateOfJoiningRules,
  emailAddressRules,
  firstNameRules,
  lastNameRules,
} from '../features/errors/FormInputValidationErrors';

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
    handleSubmit,
    setError,
    control,
    reset,
    formState: { isValid, isDirty },
  } = useForm<Employee>({
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
              <FormInput<Employee>
                name='firstName'
                label='First Name'
                control={control}
                rules={firstNameRules}
                textFieldProps={{ slotProps: { inputLabel: { shrink: true } } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormInput<Employee>
                name='lastName'
                label='Last Name'
                rules={lastNameRules}
                control={control}
                textFieldProps={{ slotProps: { inputLabel: { shrink: true } } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormInput<Employee>
                name='email'
                label='Email Address'
                control={control}
                rules={emailAddressRules}
                textFieldProps={{ slotProps: { inputLabel: { shrink: true } } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormInput<Employee>
                name='dateOfJoining'
                label='Date of Joining'
                rules={dateOfJoiningRules}
                control={control}
                textFieldProps={{
                  slotProps: { inputLabel: { shrink: true } },
                  type: 'date',
                }}
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
