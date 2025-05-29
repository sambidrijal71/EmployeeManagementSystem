import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import type { Employee } from '../../models/Employee';

interface Props {
  employees: Employee[];
}
const EmployeeTable = ({ employees }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align='center'>First Name</TableCell>
            <TableCell align='center'>Last Name</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Date of Joining</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {employee.id}
              </TableCell>
              <TableCell align='center'>{employee.firstName}</TableCell>
              <TableCell align='center'>{employee.lastName}</TableCell>
              <TableCell align='center'>{employee.email}</TableCell>
              <TableCell align='center'>{employee.dateOfJoining}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default EmployeeTable;
