import { CartStatus, ICartItem } from '@/interfaces/cart.interface';
import { IsArray, IsEmail, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCartTempDto {
  @IsString()
  idUser: string;
  @IsArray()
  products: ICartItem[];
}
