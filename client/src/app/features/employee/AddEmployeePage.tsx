import { Container } from '@mui/material';
import { useAddEmployeeMutation } from './employeeApi';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../../components/EmployeeForm';
import type { FieldValues } from 'react-hook-form';

const AddEmployeePage = () => {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    await addEmployee(data).unwrap();
    navigate('/employees');
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
