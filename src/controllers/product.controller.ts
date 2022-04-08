import { CreateProductDto } from '@/dtos/product.dto';
import { Product } from '@/interfaces/product.interface';
import productService from '@/services/product.service';
import { NextFunction, Request, Response } from 'express';

class ProductController {
  public productService = new productService();
  public getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: any = req.query;

      const findAllProduct: Product[] = await this.productService.getProduct(productData);
      res.status(200).json({ data: findAllProduct, message: 'Get product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getProductDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: any = req.query.id;
      const findProduct: Product = await this.productService.getProductDetail(productId);
      res.status(200).json({ data: findProduct, message: 'Get product detail successfully' });
    } catch (error) {
      next(error);
    }
  };
  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: any = req.body;
      const files = req.files;
      const createProduct: Product = await this.productService.createProduct(productData, files);
      res.status(200).json({ data: createProduct, message: 'Create product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      const deleteProduct = await this.productService.deleteProduct(id as any);
      res.status(200).json({ data: deleteProduct, message: 'Delete product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public unDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      const deleteProduct = await this.productService.unDeleteProduct(id as any);
      res.status(200).json({ data: deleteProduct, message: 'update status product successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
