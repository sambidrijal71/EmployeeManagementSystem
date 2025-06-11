import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import EmployeePage from '../features/employee/EmployeePage';
import App from '../App';
import EmployeeDetailPage from '../features/employee/EmployeeDetailPage';
import LoginPage from '../features/login/LoginPage';
import RegisterPage from '../features/register/RegisterPage';
import NotFoundPage from '../features/errors/NotFoundPage';
import AddEmployeePage from '../features/employee/AddEmployeePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/employees', element: <EmployeePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/employees/add-employee', element: <AddEmployeePage /> },
      { path: '/employees/:id', element: <EmployeeDetailPage /> },
      { path: '/not-found', element: <NotFoundPage /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
]);
