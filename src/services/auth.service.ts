import cartTempModel from '@/models/cart-temp.model';
import emailModel from '@/models/email';
import tokenModel from '@/models/token.models';
import { SECRET_KEY } from '@config';
import { LoginUserDto, RegisterUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, Email, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import mongoose from 'mongoose';

class AuthService {
  public users = userModel;
  public tokens = tokenModel;
  public emails = emailModel;
  public cartTemp = cartTempModel;
  public async signup(userData: RegisterUserDto): Promise<{ createUser: User; token: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Not found userdata');
    const findUser = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ _id: new mongoose.Types.ObjectId(), ...userData, password: hashedPassword });
    const token: TokenData = this.createToken(createUserData);
    await this.tokens.create({ _id: new mongoose.Types.ObjectId(), idUser: createUserData._id, token: token.token });
    await this.emails.create({ _id: new mongoose.Types.ObjectId(), email: createUserData.email });
    await this.cartTemp.create({ _id: new mongoose.Types.ObjectId(), idUser: createUserData._id, products: [] });
    return { createUser: createUserData, token };
  }

  public async verifiedEmail(token: string): Promise<User> {
    const isUserHaveToken = await this.tokens.findOne({ token });
    if (!isUserHaveToken) throw new HttpException(400, 'Your token is wrong!');
    const findUser: User = await this.users.findById({ _id: isUserHaveToken.idUser });
    await this.emails.findOneAndUpdate({ email: findUser.email }, { verified: true });
    return findUser;
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; findUser: User; token: any }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const { password, email } = userData;
    const findUser = await this.users.findOne({ email });
    if (!findUser) throw new HttpException(409, `You're email ${email} not found`);
    const isPasswordMatching: boolean = await compare(password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    const isVerified: Email = await this.emails.findOne({ email: findUser.email });
    if (!isVerified.verified) throw new HttpException(400, 'Email của bạn chưa được xác thực!');
    const token = this.createToken(findUser);
    const cookie = this.createCookie(token);
    return { cookie, findUser, token };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
