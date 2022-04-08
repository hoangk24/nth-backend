import { HttpException } from '@/exceptions/HttpException';
import { Category, IImage } from '@/interfaces/product.interface';
import categoryModel from '@/models/category.model';
import cloudinaryUpload, { ForderName } from '@/utils/uploadImage';
import fs from 'fs';
import mongoose from 'mongoose';
class CategoryService {
  public category = categoryModel;

  public async getCategory(): Promise<Category[]> {
    const category: Category[] = await this.category.find({});
    return category;
  }
  public async createCategory(categoryData: any, logo: any): Promise<Category> {
    const data = await cloudinaryUpload.upload(logo.path, ForderName.LOGO);
    const logoUploaded: IImage = { public_id: data.public_id, url: data.url };
    fs.unlinkSync(logo.path);

    const createCategory = await this.category.create({
      _id: new mongoose.Types.ObjectId(),
      ...categoryData,
      logos: logoUploaded,
    });
    return createCategory;
  }
}

export default CategoryService;
