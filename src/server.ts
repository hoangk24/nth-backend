import App from '@/app';
import CartTempRoute from '@/routes/cart-temp.route';
import CategoryRoute from '@/routes/category.route';
import ProductRoute from '@/routes/product.route';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new ProductRoute(), new CategoryRoute(), new CartTempRoute()]);

app.listen();
