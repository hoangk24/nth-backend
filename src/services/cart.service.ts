import { CreateCartTempDto } from '@/dtos/cart.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ICartItem, ICartTemp } from '@/interfaces/cart.interface';
import cartTempModel from '@/models/cart-temp.model';
import cartModel from '@/models/cart.model';
import productModel from '@/models/product.model';
import { cloneDeep, find } from 'lodash';
class CartService {
  public cartModel = cartModel;
  public cartTempModel = cartTempModel;
  public productModel = productModel;
  public async addCartTemp(cartTemp: CreateCartTempDto): Promise<any> {
    const { idUser, products } = cartTemp;
    const findCart: ICartTemp = await this.cartTempModel.findOne({ idUser: idUser });
    if (!findCart) throw new HttpException(400, 'Not found idUser in CartTemp');
    const totalCost = await this.calcCost([...products, ...findCart.products]);
    const totalQuantity = await this.calcQuantity([...products, ...findCart.products]);
    if (!totalCost) throw new HttpException(400, 'Failed to calc cart');
    const updateCart: ICartTemp = await this.cartTempModel.findByIdAndUpdate(findCart._id, {
      products: [...products, ...findCart.products],
      totalCost,
      totalQuantity,
    });
    if (!updateCart) throw new HttpException(400, 'Cant update cart temp');
    const findUpdateCart: ICartTemp = await this.cartTempModel.findOne({ idUser: idUser });

    return findUpdateCart;
  }
  public async getCartTemp(): Promise<ICartTemp[]> {
    const getCart = await this.cartTempModel.find({});
    return getCart;
  }
  public async getCartTempByID(id: string): Promise<ICartTemp> {
    const getCart = await this.cartTempModel.findOne({ idUser: id });
    return getCart;
  }
  public async calcQuantity(products: ICartItem[]) {
    let totalQuantity = 0;
    for (const prod of products) {
      totalQuantity += prod.quantity;
    }
    return totalQuantity;
  }
  public async calcCost(products: ICartItem[]) {
    let totalCost = 0;
    for (const prod of products) {
      const productPrice = await this.productModel.findById(prod.idProduct).select('price');
      totalCost += productPrice.price * prod.quantity;
    }
    return totalCost;
  }
}

export default CartService;
