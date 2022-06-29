import axios from 'axios';
import jwt_decode from 'jwt-decode';
import urls from '@/api/urls';

class OtpAuthService {
  validateOtp(otp, phone) {
    return axios
      .post(urls.validate_otp_url, {
        otp,
        phone,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage?.removeItem('user');
  }

  getOtp(phone) {
    return axios.post(urls.get_otp_Url, {
      phone,
    });
  }

  getCurrentUser() {
    if (!!localStorage && localStorage?.getItem('user')) {
      return jwt_decode(JSON.parse(localStorage.getItem('user')).token);
    }
  }
}

export default new OtpAuthService();
