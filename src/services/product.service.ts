import { GetProductDto } from '@/dtos/product.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Product } from '@/interfaces/product.interface';
import categoryModel from '@/models/category.model';
import productModel from '@/models/product.model';
import cloudinaryUpload, { ForderName } from '@/utils/uploadImage';
import fs from 'fs';
import mongoose from 'mongoose';
class ProductService {
  public product = productModel;
  public category = categoryModel;
  public async getProduct(productData: GetProductDto): Promise<Product[]> {
    const { page, perpage } = productData;
    const allProduct = await this.product
      .find({})
      .skip(perpage * page - perpage)
      .limit(10);
    return allProduct;
  }
  public async getProductDetail(id: string): Promise<Product> {
    const getProduct = await this.product.findById(id);
    if (!getProduct) throw new HttpException(400, 'Wrong id product');
    return getProduct;
  }
  public async createProduct(productData: any, posters: any): Promise<Product> {
    const urlPosters = [];
    for (const file of posters) {
      const { path } = file;
      const data = await cloudinaryUpload.upload(path, ForderName.POSTERS);
      urlPosters.push({ public_id: data.public_id, url: data.url });
      fs.unlinkSync(path);
    }
    const createProduct = await this.product.create({
      _id: new mongoose.Types.ObjectId(),
      ...productData,
      posters: urlPosters,
    });
    return createProduct;
  }
  public async deleteProduct(id: string): Promise<Product> {
    const deleteProduct: Product = await this.product.findByIdAndUpdate(id, { isDeleted: true });
    if (!deleteProduct) throw new HttpException(400, 'Xoá sản phẩm không thành công!');
    return deleteProduct;
  }
  public async unDeleteProduct(id: string): Promise<Product> {
    const deleteProduct: Product = await this.product.findByIdAndUpdate(id, { isDeleted: false });
    if (!deleteProduct) throw new HttpException(400, 'Hoàn tác sản phẩm không thành công!');
    return deleteProduct;
  }
}

export default ProductService;
