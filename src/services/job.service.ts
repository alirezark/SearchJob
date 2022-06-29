import { provinces } from '@/constants/provinces';
import { jobBoards } from '@/constants/jobBoards';
import { useQuery } from 'react-query';
import api from '@/api/api';

export const toIRHJob = (job) => ({
  ...job,
  strLocation: provinces.find((p) => p.id === job.jobState)?.label,
  strJobBoard: jobBoards.find((o) => o.value === job.jobBoard)?.label,
});

export const loadJob = async (jobId) => api.job.get({ uniqueCode: jobId });

export const useLoadJob = (jobId, options) =>
  useQuery(['job', jobId], (data) => api.job.get({ uniqueCode: jobId }), options);
