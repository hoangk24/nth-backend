import categoryController from '@/controllers/category.controller';
import { CreateCategoryDto } from '@/dtos/category.dto';
import { CreateProductDto } from '@/dtos/product.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import isAdminMiddleware from '@/middlewares/isAdmin.middleware';
import uploadFile from '@/middlewares/upload.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
class CategoryRoute implements Routes {
  public path = '/category';
  public router = Router();
  public categoryController = new categoryController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/get-category`, this.categoryController.getCategory);
    this.router.post(
      `${this.path}/create-category`,
      // authMiddleware,
      // isAdminMiddleware,
      validationMiddleware(CreateCategoryDto, 'body'),
      uploadFile.single('logo'),
      this.categoryController.createCategory,
    );
  }
}

export default CategoryRoute;
