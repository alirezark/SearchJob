import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';
import axios from 'axios';
import Credentials from 'next-auth/providers/credentials';
import OtpService from '@/services/otp-login-service';

const providers: Provider[] = [
  Credentials({
    name: 'Credentials',
    credentials: {
      phone: { label: 'Phone', type: 'text', placeholder: 'phone' },
      token: { label: 'Code', type: 'text' },
    },
    authorize: async (credentials) => {
      try {
        // const result = await OtpService.validateOtp(credentials.verifyCode, credentials.phone);
        // console.error(credentials, credentials);
        // const user = {
        //   ...result.data,
        // };

        return { ...credentials };
      } catch (e) {
        const errorMessage = e.response.data.message;
        // Redirecting to the login page with error message          in the URL
        throw new Error(errorMessage + '&phone=' + credentials.phone);
      }
    },
  }),
];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.token;
    }

    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  // callbacks,
  // pages: {
  //   error: '/login', // Changing the error redirect page to our custom login page
  // },
  session: {
    jwt: true,
  },
  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
  },
  secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
};

// @ts-ignore
export default (req, res) => NextAuth(req, res, options);
