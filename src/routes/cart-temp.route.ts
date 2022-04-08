import CartController from '@/controllers/cart.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class CartTempRoute implements Routes {
  public path = '/cart-temp';
  public router = Router();
  public cartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add-cart-temp`, this.cartController.createCartTemp);
    this.router.get(`${this.path}/get-cart-temp`, this.cartController.getCartTemp);
    this.router.get(`${this.path}/get-cart-temp-by-id`, this.cartController.getCartTempByID);
  }
}

export default CartTempRoute;
