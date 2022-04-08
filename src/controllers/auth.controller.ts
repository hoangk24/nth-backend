import { UI_URL } from '@/config';
import sendMail, { MessageSendMail } from '@/utils/sendMail';
import { LoginUserDto, RegisterUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: RegisterUserDto = req.body;
      const { createUser, token } = await this.authService.signup(userData);
      const message: MessageSendMail = {
        subject: 'Xác minh Email NTH Team',
        text: 'NTA team thân gửi bạn link xác minh!',
        title: 'Nhấn vào đây để xác minh tài khoản của bạn',
        link: `${UI_URL}/verified-emal?token=$${token.token}`,
      };
      await sendMail({ email: createUser.email, message }).then(() => {
        res.status(201).json({ data: createUser, message: 'Vui lòng check email để kích hoạt tài khoản!' });
      });
    } catch (error) {
      next(error);
    }
  };

  public async verifiedEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const token: any = req.query.token;
      const user: User = await this.authService.verifiedEmail(token);
      res.status(200).json({
        data: user,
        message: 'Xác nhận tài khoản thành công!',
      });
    } catch (error) {
      next(error);
    }
  }

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, findUser, token } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({
        data: {
          user: findUser,
          token,
        },
        message: 'Đăng nhập thành công!',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'Đăng xuất thành công!' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
