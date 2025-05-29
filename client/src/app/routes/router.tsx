import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import EmployeePage from '../features/employee/EmployeePage';
import App from '../App';
import EmployeeDetailPage from '../features/employee/EmployeeDetailPage';
import LoginPage from '../features/login/LoginPage';
import RegisterPage from '../features/register/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/employees', element: <EmployeePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/employees/:id', element: <EmployeeDetailPage /> },
    ],
  },
]);
