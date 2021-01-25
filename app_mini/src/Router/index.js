import { createWebHistory, createRouter } from "vue-router";
import Home from '../Home/Home.vue'
import Shop from '../Shop/Shop.vue'
import Detail from '../Detail/Detail.vue'
import Cart from '../Cart/Cart.vue'
import SignIn from '../Authentication/SignIn.vue'
import SignUp from '../Authentication/SignUp.vue'
import Order from '../Order/Order.vue'
import History from '../History/History.vue'
import Success from '../Order/Success.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/cart/order",
    name: "Order",
    component: Order
  },
  {
    path: "/cart/order/success",
    name: "Success",
    component: Success
  },
  {
    path: "/history",
    name: "History",
    component: History
  },


  //Redirect
  {
    path: '/signin',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;