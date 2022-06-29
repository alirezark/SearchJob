import axios from 'axios';
import authHeader from './auth-header';
import { useMutation, useQuery } from 'react-query';
import api from '@/api/api';

export const useProfile = (options) => useQuery('profile', (data) => api.profile.get(), options);

export const useUpdateProfile = (options) => useMutation((data: any) => api.profile.update(data), options);
