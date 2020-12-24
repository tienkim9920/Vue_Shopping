import { createWebHistory, createRouter } from "vue-router";
import Home from '../Home/Home.vue'
import Shop from '../Shop/Shop.vue'
import Detail from '../Detail/Detail.vue'
import Cart from '../Cart/Cart.vue'
import SignIn from '../Authentication/SignIn.vue'
import SignUp from '../Authentication/SignUp.vue'

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