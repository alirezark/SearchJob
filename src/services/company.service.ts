import api from '@/api/api';
import { useQuery } from 'react-query';

export const loadCompany = async (jobId, page, size) => api.company.get({ uniqueCode: jobId, page: page, size: size });

export const useLoadCompany = (jobId, page, size, options?) =>
  useQuery(['job', jobId], (data) => api.company.get({ uniqueCode: jobId, page: page, size: size }), options);
