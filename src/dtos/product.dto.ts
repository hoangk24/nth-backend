import { ISizes } from '@/interfaces/product.interface';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class GetProductDto {
  @IsNumber()
  perpage: number;

  @IsNumber()
  page: number;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsArray()
  size: ISizes[];

  @IsNumber()
  discount: number;

  @IsString()
  category: string;

  @IsString()
  note: string;
}

export class GetProductDetailDto {
  @IsString()
  id: string;
}
