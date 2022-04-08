import AuthController from '@controllers/auth.controller';
import { LoginUserDto, RegisterUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(RegisterUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
    this.router.get(`${this.path}/verified-email`, this.authController.verifiedEmail.bind(this.authController));
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
