import { CurrentUser } from '../types/current-user';
import { LoginOrRegisterRequest } from '../types/login-or-register-request';

export class AuthService {
  async loginAsync(data: LoginOrRegisterRequest): Promise<CurrentUser> {
    if (data.phone === '+71111111111' && data.password === 'admin') {
      return {
        id: 1,
        phone: '+71111111111',
        username: 'UserName',
        token: '1024',
      };
    }

    throw new Error('Неверный логин или пароль');
  }

  async registerAsync(data: LoginOrRegisterRequest): Promise<CurrentUser> {
    if (data.phone !== '+71111111111') {
      throw new Error('Произошла ошибка во время регистрации');
    }

    return {
      id: 1,
      phone: '+71111111111',
      username: 'UserName',
      token: '1024',
    };
  }

  async checkSmsCodeAsync(phone: string, smsCode: string): Promise<boolean> {
    if (smsCode !== '55555') {
      throw new Error('Некорректный СМС код');
    }

    return true;
  }

  async resetPasswordAsync(
    phone: string,
    password: string
  ): Promise<CurrentUser> {
    if (password !== 'admin') {
      throw new Error('Произошла ошибка во время смены пароля');
    }

    return {
      id: 1,
      phone: '+71111111111',
      username: 'UserName',
      token: '1024',
    };
  }
}
