import { SubCategory } from '@/interfaces/product.interface';
import { IsArray, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
  @IsString()
  key: string;
  @IsArray()
  subCategory: SubCategory[];
}
