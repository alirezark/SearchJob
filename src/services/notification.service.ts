import { useMutation, useQuery } from 'react-query';
import api from '@/api/api';

export const useLoadNotificationCount = (options?: any) =>
  useQuery('notificationCount', () => api.notification.count(), options);

export const useLoadNotification = (options) => useQuery('notifications', (data) => api.notification.list(), options);

export const useSeeNotification = (options) => useMutation((id) => api.notification.see(id), options);
