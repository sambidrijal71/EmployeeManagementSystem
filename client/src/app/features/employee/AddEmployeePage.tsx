import { Container } from '@mui/material';
import { useAddEmployeeMutation } from './employeeApi';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../../components/EmployeeForm';
import type { FieldValues, UseFormSetError } from 'react-hook-form';
import { Employee } from '../../models/Employee';
import { toast } from 'react-toastify';

const AddEmployeePage = () => {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const navigate = useNavigate();

  const onSubmit = async (
    data: FieldValues,
    setError: UseFormSetError<Employee>
  ) => {
    try {
      await addEmployee(data).unwrap();
      navigate('/employees');
      toast.success('Employee added successfully.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const newError = error.message.split(',');
      newError.forEach((error: string) => {
        if (error.includes('Date'))
          setError('dateOfJoining', { message: error });
        if (error.includes('First')) setError('firstName', { message: error });
        if (error.includes('Last')) setError('lastName', { message: error });
        if (error.includes('Email')) setError('email', { message: error });
      });
      toast.error(error.data.title);
    }
  };
  return (
    <Container component='main' maxWidth='sm'>
      <EmployeeForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        message={'Add New Employee'}
      />
    </Container>
  );
};
export default AddEmployeePage;
