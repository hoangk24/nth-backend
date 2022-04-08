import { CreateCartTempDto } from '@/dtos/cart.dto';
import CartService from '@/services/cart.service';
import { NextFunction, Request, Response } from 'express';

class CartController {
  public cartService = new CartService();
  public createCartTemp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      const cartTemp: CreateCartTempDto = req.body;
      const createCartTemp = await this.cartService.addCartTemp(cartTemp);
      res.status(200).json({ data: createCartTemp, message: 'Add cart item successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getCartTemp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getCartTemp = await this.cartService.getCartTemp();
      res.status(200).json({ data: getCartTemp, message: 'Get cart successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getCartTempByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const IdUser = req?.query?.idUser;
      const getCartTemp = await this.cartService.getCartTempByID(IdUser as any);
      res.status(200).json({ data: getCartTemp, message: 'Get cart successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default CartController;
