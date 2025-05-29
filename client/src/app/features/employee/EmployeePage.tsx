import { useEffect, useState } from 'react';
import type { Employee } from '../../models/Employee';
import EmployeeTable from './EmployeeTable';

const EmployeePage = () => {
  const [employees, setEmployees] = useState<Employee[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees')
      .then((res) => res.json())
      .then((employees) => setEmployees(employees))
      .catch((err) => console.log(err));
  }, []);
  if (employees == null) return <>Not Found</>;

  return <EmployeeTable employees={employees} />;
};
export default EmployeePage;
