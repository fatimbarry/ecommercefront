import { createRouter, createWebHistory } from 'vue-router';
import  ProductComponent  from '../components/ ProductComponent';



const routes = [
    {
        name: ' ProductComponent ',
        path: '/',
        component: ProductComponent
    }

    // {
    //     name: 'QuestionList',
    //     path: '/question_List',
    //     component: QuestionList
    // },

    // {
    //     path: '/login',
    //     name: 'LoginForm',
    //     component: LoginForm
    //   },

    // {
    //     name: 'AddQuestion',
    //     path: '/add_Question',
    //     component: AddQuestion
    // },

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


