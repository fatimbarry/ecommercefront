import { createRouter, createWebHistory } from 'vue-router';
import WishList from '../components/WishList.vue';
import HomeComponent  from '../components/HomeComponent.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import CheckoutComponent from '../components/CheckoutComponent.vue';



const routes = [
    {
        name: ' WishList ',
        path: '/wishlist',
        component: WishList
    },

    {
        name: 'HomeComponent ',
        path: '/',
        component: HomeComponent
    },

    {
        path: '/ShoppingCart',
        name: 'ShoppingCart',
        component: ShoppingCart
      },

    {
        name: 'CheckoutComponent',
        path: '/CheckoutComponent',
        component: CheckoutComponent
    },

    // {
    //     name: 'SignupForm',
    //     path: '/SignUp',
    //     component: SignupForm
    // },

    // {
    //     name: 'UsersList',
    //     path: '/users_list',
    //     component: UsersList
    // },

    // {
    //     path: '/Answer/:id',
    //     name: 'ShowAnswer',
    //     component: ShowAnswer
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes

})

export default router;


