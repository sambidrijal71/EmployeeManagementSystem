import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from '../../api/baseApi';
import { toast } from 'react-toastify';
import { Employee } from '../../models/Employee';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => 'employees',
      providesTags: ['Employee'],
    }),
    getEmployeeDetail: builder.query<Employee, number>({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: 'Employee', id }],
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          employeeApi.util.updateQueryData(
            'getEmployees',
            undefined,
            (draft) => {
              return draft.filter((emp: Employee) => emp.id != id);
            }
          )
        );

        try {
          await queryFulfilled;
          toast.success('Employee removed successfully.');
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    addEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_newEmployee, { dispatch, queryFulfilled }) => {
        try {
          const { data: createdEmployee } = await queryFulfilled;
          dispatch(
            employeeApi.util.updateQueryData(
              'getEmployees',
              undefined,
              (draft) => {
                draft.push(createdEmployee);
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
      invalidatesTags: ['Employee'],
    }),

    editEmployee: builder.mutation<
      Employee,
      { id: number; data: Partial<Employee> }
    >({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          employeeApi.util.updateQueryData(
            'getEmployees',
            undefined,
            (draft) => {
              const index = draft.findIndex((emp) => emp.id === id);
              if (index !== -1) draft[index] = { ...draft[index], ...data };
            }
          )
        );
        try {
          await queryFulfilled;
          toast.success('Employee updated successfully');
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
      invalidatesTags: ['Employee'],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeDetailQuery,
  useDeleteEmployeeMutation,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
} = employeeApi;
