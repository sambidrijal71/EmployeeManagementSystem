import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from '@reduxjs/toolkit/query';

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
});

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await customBaseQuery(args, api, extraOptions);
  if (result.error) {
    const { status } = result.error;
  }
  return result;
};
