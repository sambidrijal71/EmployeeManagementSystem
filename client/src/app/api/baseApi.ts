import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { router } from '../routes/router';

type ErrorResponse = { title: string } | { errors: string[] };

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
    const errorData = result.error.data as ErrorResponse;
    console.log(result.error);
    switch (status) {
      case 400: {
        if ('errors' in errorData) {
          throw Object.values(errorData.errors).flat().join(', ');
        } else if (typeof errorData === 'object' && 'title' in errorData) {
          toast.error(errorData.title);
        }
        break;
      }
      case 401: {
        if (typeof errorData === 'object' && 'title' in errorData) {
          toast.error(errorData.title);
        }
        break;
      }
      case 404: {
        if (typeof errorData === 'object' && 'title' in errorData) {
          router.navigate('/not-found', { state: { error: errorData } });
          toast.error(errorData.title);
        }
        break;
      }
      case 500: {
        if (typeof errorData === 'object' && 'title' in errorData) {
          toast.error(errorData.title);
          router.navigate('/server-error', { state: { error: errorData } });
        }
        break;
      }
      default: {
        break;
      }
    }
  }
  return result;
};
