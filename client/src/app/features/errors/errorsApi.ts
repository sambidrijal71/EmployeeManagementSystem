import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from '../../api/baseApi';

export const errorsApi = createApi({
  reducerPath: 'errorsApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    get400BadRequest: builder.query<void, void>({
      query: () => 'errors/bad-request',
    }),
    get404NotFound: builder.query<void, void>({
      query: () => 'errors/not-found',
    }),
    get401UnAuthorized: builder.query<void, void>({
      query: () => 'errors/unauthorized',
    }),
    get400Validation: builder.query<void, void>({
      query: () => 'errors/validation',
    }),
    get500InternalServer: builder.query<void, void>({
      query: () => 'errors/server-error',
    }),
  }),
});

export const {
  useLazyGet400BadRequestQuery,
  useLazyGet400ValidationQuery,
  useLazyGet401UnAuthorizedQuery,
  useLazyGet404NotFoundQuery,
  useLazyGet500InternalServerQuery,
} = errorsApi;
