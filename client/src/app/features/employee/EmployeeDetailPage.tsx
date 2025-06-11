import { useParams } from 'react-router-dom';
import { useGetEmployeeDetailQuery } from './employeeApi';
import NotFoundPage from '../errors/NotFoundPage';
import {
  Divider,
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LoadingComponent from '../../components/LoadingComponent';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const { data: employee, isLoading } = useGetEmployeeDetailQuery(
    parseInt(id!)
  );

  if (isLoading)
    return <LoadingComponent message={'Loading employee Detail'} />;
  if (employee == null) return <NotFoundPage />;
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <img src='' alt={employee.firstName} />
      </Grid>

      <Grid size={6}>
        <Typography variant='h2'>
          {employee.firstName} {employee.lastName}
        </Typography>
        <Divider />
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>{employee.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{employee.dateOfJoining}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default EmployeeDetailPage;
