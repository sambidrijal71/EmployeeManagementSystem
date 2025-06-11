import EmployeeTable from './EmployeeTable';
import { Button } from '@mui/material';
import { useGetEmployeesQuery } from './employeeApi';
import NotFoundPage from '../errors/NotFoundPage';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';

const EmployeePage = () => {
  const navigate = useNavigate();
  const { data: employees, isLoading } = useGetEmployeesQuery();
  if (isLoading) return <LoadingComponent message={'Loading Employees.....'} />;
  if (employees == null) return <NotFoundPage />;

  return (
    <>
      <Button
        onClick={() => navigate('/employees/add-employee')}
        variant='outlined'
        sx={{
          mb: 4,
          float: 'right',
        }}
      >
        Add New Employee
      </Button>
      <EmployeeTable employees={employees} />
    </>
  );
};
export default EmployeePage;
