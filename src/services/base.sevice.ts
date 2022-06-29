import api from '@/api/api';
import { useQuery } from 'react-query';

export const loadCountActiveJobAndCompany = async () => api.getCountActiveJobAndCompany();

export const useLoadCountActiveJobAndCompany = (options) =>
  useQuery('countJobCompany', () => api.getCountActiveJobAndCompany(), options);
