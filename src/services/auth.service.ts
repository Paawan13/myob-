import axios from 'axios';

export interface AuthParams {
  isLogin: boolean;
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  company?: string;
}

export const authenticateUser = async ({ isLogin, email, password, name, confirmPassword, company }: AuthParams) => {
  const url = isLogin
    ? `${process.env.NEXT_PUBLIC__API_LOGIN}/login/`
    : `${process.env.NEXT_PUBLIC__API_REGISTER}/signup/`;

  const payload = new URLSearchParams();
  payload.append('email', email);
  payload.append('password', password);

  if (!isLogin) {
    payload.append('name', name || '');
    payload.append('confirm_password', confirmPassword || '');
    payload.append('company', company || '');
  }

  const response = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  return response.data;
};
