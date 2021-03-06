import categoryService from '@/services/catgory.service';
import { NextFunction, Request, Response } from 'express';

class CateogryController {
  public categoryService = new categoryService();
  public getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCategory: any = await this.categoryService.getCategory();
      res.status(200).json({ data: findAllCategory, message: 'Get category successfully' });
    } catch (error) {
      next(error);
    }
  };
  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryData: any = req.body;
      const file = req.file;
      const createCategory = await this.categoryService.createCategory(categoryData, file);
      res.status(200).json({ data: createCategory, message: 'Create product successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default CateogryController;
