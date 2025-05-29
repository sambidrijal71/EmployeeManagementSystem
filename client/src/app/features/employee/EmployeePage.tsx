import { useEffect, useState } from 'react';
import type { Employee } from '../../models/Employee';
import EmployeeTable from './EmployeeTable';
import { Button } from '@mui/material';

const EmployeePage = () => {
  const [employees, setEmployees] = useState<Employee[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees')
      .then((res) => res.json())
      .then((employees) => setEmployees(employees))
      .catch((err) => console.log(err));
  }, []);
  if (employees == null) return <>Not Found</>;

  return (
    <>
      <Button
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
