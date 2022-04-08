import productController from '@/controllers/product.controller';
import { CreateProductDto, GetProductDetailDto } from '@/dtos/product.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import isAdminMiddleware from '@/middlewares/isAdmin.middleware';
import uploadFile from '@/middlewares/upload.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
class ProductRoute implements Routes {
  public path = '/product';
  public router = Router();
  public productController = new productController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/get-product`, this.productController.getProduct);
    this.router.get(`${this.path}/get-product-detail`, validationMiddleware(GetProductDetailDto, 'query'), this.productController.getProductDetail);

    this.router.post(
      `${this.path}/create-product`,
      validationMiddleware(CreateProductDto, 'body'),
      uploadFile.array('posters', 12),
      authMiddleware,
      isAdminMiddleware,
      this.productController.createProduct,
    );
    this.router.delete(`${this.path}/delete-product`, authMiddleware, isAdminMiddleware, this.productController.deleteProduct);
    this.router.get(`${this.path}/un-delete-product`, authMiddleware, isAdminMiddleware, this.productController.deleteProduct);
  }
}

export default ProductRoute;
