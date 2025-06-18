import EmployeeTable from './EmployeeTable';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useGetEmployeesQuery } from './employeeApi';
import NotFoundPage from '../errors/NotFoundPage';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';

type EmployeeFormValues = {
  searchEmployee: string;
};

const EmployeePage = () => {
  const navigate = useNavigate();
  const { data: employees, isLoading } = useGetEmployeesQuery();
  const { control } = useForm<EmployeeFormValues>({
    mode: 'onChange',
  });

  if (isLoading) return <LoadingComponent message={'Loading Employees.....'} />;
  if (employees == null) return <NotFoundPage />;

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Button
        size='medium'
        onClick={() => navigate('/employees/add-employee')}
        variant='outlined'
        sx={{
          mb: 4,
        }}
      >
        Add New Employee
      </Button>
      <Grid container spacing={2}>
        <Grid size={2.5}>
          <Paper elevation={4} sx={{ padding: 2 }}>
            <FormLabel id='searchEmployee'>Search Employee</FormLabel>
            <FormInput<EmployeeFormValues>
              name='searchEmployee'
              label=''
              control={control}
              textFieldProps={{
                slotProps: { inputLabel: { shrink: true } },
                variant: 'outlined',
              }}
            />
          </Paper>
          <Paper elevation={2} sx={{ padding: 2, mt: 2 }}>
            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label'>
                Ascending
              </FormLabel>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='female'
                name='radio-buttons-group'
              >
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='First Name'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Last Name'
                />
                <FormControlLabel
                  value='other'
                  control={<Radio />}
                  label='Date of Joining'
                />
                <FormLabel id='demo-radio-buttons-group-label'>
                  Descending
                </FormLabel>
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='First Name'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Last Name'
                />
                <FormControlLabel
                  value='other'
                  control={<Radio />}
                  label='Date of Joining'
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
        <Grid size={9}>
          <EmployeeTable employees={employees} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default EmployeePage;
