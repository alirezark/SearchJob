import axios, { Method } from 'axios';
import queryString, { StringifyOptions } from 'query-string';

const SERVER_ADDRESS = process.env.REACT_APP_API_ADDRESS || 'http://localhost:3030/';

const API = `${SERVER_ADDRESS}`;
const TIMEOUT_DELAY = 1000000;

export let token: string | null = '123456';

export const setToken = (_token: string) => {
  token = _token;
  if (!!token) {
    localStorage.setItem('token', token);
  }
};

export const loginWithToken = async (): Promise<any> => {
  const refresh_token = localStorage.getItem('refresh_token');
  const token_type = localStorage.getItem('token_type');
  if (refresh_token) {
    const res = await baseRequest(`api/v1/${token_type || 'employee'}/auth/login_with_token`, {
      method: 'post',
      needAuthenticated: false,
      otherOptions: { headers: { authorization: refresh_token } },
    });
    setToken(res.data.token);
    return res.data;
  } else {
    return Promise.reject(false);
  }
};

export interface Request {
  data?: any;
  method: Method;
  needAuthenticated: boolean;
  params?: object;
  otherOptions?: object;
  isFormData?: boolean;
  cancelCB?: any;
}

export const baseRequest = async (
  path: string,
  { data, method, needAuthenticated, params, otherOptions, isFormData, cancelCB }: Request
): Promise<any> => {
  let timeout = null;
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  cancelCB && cancelCB(source);

  timeout = setTimeout(() => {
    source.cancel();
  }, TIMEOUT_DELAY);

  const qsOptions: StringifyOptions = { skipNull: true };

  const url = params ? `${API}${path}?` + queryString.stringify(params, qsOptions) : `${API}${path}`;

  if (needAuthenticated && !token) {
    return Promise.reject({ isTimeout: false, error: 401 });
  }

  let formData: FormData | null = null;
  if (isFormData) {
    formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData!.append(key, data[key]);
      }
    });
  }

  const headers = needAuthenticated
    ? {
        'content-type': 'application/json',
        authorization: token,
      }
    : { 'content-type': 'application/json' };
  try {
    const response = await axios({
      url,
      method: method === 'get' && data ? 'POST' : method,
      headers: method === 'get' && data ? { ...headers, 'X-HTTP-Method-Override': method.toUpperCase() } : headers,
      cancelToken: source.token,
      data: isFormData ? formData : data,
      ...otherOptions,
    });

    if (response.status >= 200 && response.status < 300) {
      if (timeout) {
        clearTimeout(timeout);
      }
      return response.data;
    } else {
      if (timeout) {
        clearTimeout(timeout);
      }
      return Promise.reject({ isTimeout: false, error: 101 });
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      return Promise.reject({ isCanceled: true });
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    if (
      error.response.status === 401 &&
      path !== '/auth/loginWithToken' &&
      path.indexOf('/auth/login') === -1 &&
      path.indexOf('/auth/update_password') === -1 &&
      path.indexOf('/auth/change-password') === -1
    ) {
      await loginWithToken();
      return baseRequest(path, { data, method, needAuthenticated, params, otherOptions, isFormData, cancelCB });
    }
    return Promise.reject({
      isTimeout: axios.isCancel(error),
      response: error.response.data,
      status: error.response.status,
    });
  }
};
