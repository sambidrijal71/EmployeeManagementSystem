import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
} from '@mui/material';
import type { Employee } from '../../models/Employee';
import { DeleteOutline, UpdateOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setOpenDeleteModal, setOpenEditModal } from '../../layout/uiSlice';
import ModalComponent from '../../components/ModalComponent';
import { useState } from 'react';
import {
  useDeleteEmployeeMutation,
  useEditEmployeeMutation,
} from './employeeApi';
import EmployeeForm from '../../components/EmployeeForm';
import type { FieldValues, UseFormSetError } from 'react-hook-form';

interface Props {
  employees: Employee[];
}

const EmployeeTable = ({ employees }: Props) => {
  const dispatch = useAppDispatch();
  const [employeeId, setEmployeeId] = useState<number>(0);
  const { openEditModal, openDeleteModal } = useAppSelector(
    (state) => state.uiSlice
  );
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [editEmployee, { isLoading }] = useEditEmployeeMutation();
  const [, setIsFormDirty] = useState(false);

  const handleYesAction = (id: number) => {
    deleteEmployee(id);
    dispatch(setOpenDeleteModal(false));
  };

  const onSubmit = async (
    data: FieldValues,
    setError: UseFormSetError<Employee>
  ) => {
    try {
      await editEmployee({ id: employeeId, data }).unwrap();
      dispatch(setOpenEditModal(false));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const newError = error.message.split(', ');
      newError.forEach((error: string) => {
        if (error.includes('First')) setError('firstName', { message: error });
        if (error.includes('Last')) setError('lastName', { message: error });
        if (error.includes('Email')) setError('email', { message: error });
        if (error.includes('Date'))
          setError('dateOfJoining', { message: error });
      });
    }
  };
  return (
    <>
      {openEditModal ? (
        <Container component='main' maxWidth='sm'>
          <EmployeeForm
            message={'Edit Employee'}
            employeeId={employeeId}
            onSubmit={onSubmit}
            isLoading={isLoading}
            onDirtyChange={setIsFormDirty}
          />
        </Container>
      ) : (
        <TableContainer>
          <Paper elevation={6}>
            <Table sx={{ minWidth: 550 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align='center'>First Name</TableCell>
                  <TableCell align='center'>Last Name</TableCell>
                  <TableCell align='center'>Email</TableCell>
                  <TableCell align='center'>Date of Joining</TableCell>
                  <TableCell align='center'>View Employee Detail</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      textDecoration: 'none',
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {employee.id}
                    </TableCell>
                    <TableCell align='center'>{employee.firstName}</TableCell>
                    <TableCell align='center'>{employee.lastName}</TableCell>
                    <TableCell align='center'>{employee.email}</TableCell>
                    <TableCell align='center'>
                      {employee.dateOfJoining.slice(0, 10)}
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='outlined'
                        color='success'
                        component={NavLink}
                        to={`/employees/${employee.id}`}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='outlined'
                        sx={{ marginRight: '16px' }}
                        onClick={() => {
                          dispatch(setOpenEditModal(true));
                          setEmployeeId(employee.id);
                        }}
                      >
                        <UpdateOutlined />
                      </Button>

                      <Button
                        variant='outlined'
                        color='error'
                        onClick={() => {
                          dispatch(setOpenDeleteModal(true));
                          setEmployeeId(employee.id);
                        }}
                      >
                        <DeleteOutline />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {openDeleteModal && (
              <ModalComponent
                handleYesAction={() => handleYesAction(employeeId)}
              />
            )}
          </Paper>
        </TableContainer>
      )}
    </>
  );
};
export default EmployeeTable;
