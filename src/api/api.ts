import { baseRequest } from '@/services/baseRequest';

const api = {
  getCountActiveJobAndCompany: async () =>
    baseRequest('/getCountActiveJobAndCompany', { needAuthenticated: false, method: 'GET' }),
  profile: {
    get: async () => baseRequest('/getPerson', { needAuthenticated: true, method: 'GET' }),
    update: async (data) => baseRequest('/updatePerson', { needAuthenticated: true, data, method: 'POST' }),
  },
  notification: {
    count: async () => baseRequest('/getCountNotSeen', { needAuthenticated: true, method: 'GET' }),
    list: async () => baseRequest('/getNotifications', { needAuthenticated: true, method: 'GET' }),
    see: async (id) =>
      baseRequest('/setSeenNotification', { needAuthenticated: true, data: { id: id }, method: 'POST' }),
  },
  job: {
    get: async (data) => baseRequest('/singleJobDetail', { data, needAuthenticated: false, method: 'POST' }),
  },
  company: {
    get: async (data) => baseRequest('/getJobByCompany', { data, needAuthenticated: false, method: 'POST' }),
  }
};

export default api;
