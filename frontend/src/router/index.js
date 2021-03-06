import Vue from "vue";
import VueRouter from "vue-router";
import AllPosts from "../views/AllPosts.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import OnePost from "../views/OnePost.vue";
import NewPost from "../views/NewPost.vue";
import UserProfile from "../views/UserProfile.vue";
import PasswordUpdate from "../views/PasswordUpdate.vue";
import OneUserPosts from "../views/OneUserPosts.vue";

Vue.use(VueRouter)

const router = new VueRouter({
  mode : 'history',
  routes : [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter : (to, from, next) =>{
        const token = localStorage.getItem('userToken')
        if(!token){
          next('/user/login')
        }
        next()
      }
    },
    {
      path: '/post',
      name: 'AllPosts',
      component: AllPosts,
      beforeEnter : (to, from, next) =>{
        const token = localStorage.getItem('userToken')
        if(!token){
          next('/user/login')
        }
        next()
      }
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/post/:id',
      name: 'OnePost',
      component: OnePost,
      beforeEnter : (to, from, next) =>{
        const token = localStorage.getItem('userToken')
        if(!token){
          next('/user/login')
        }
        next()
      }
    },
    {
      path: '/post',
      name: 'NewPost',
      component: NewPost,
      beforeEnter : (to, from, next) =>{
        const token = localStorage.getItem('userToken')
        if(!token){
          next('/user/login')
        }
        next()
      }
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      component: UserProfile,
      beforeEnter : (to, from, next) =>{
        const token = localStorage.getItem('userToken')
        if(!token){
          next('/user/login')
        }
        next();
      }
    },
    {
      path: '/user/:id/update_password',
      name: 'PasswordUpdate',
      component: PasswordUpdate,
      beforeEnter : (to, from, next) =>{
        const token = localStorage.getItem('userToken')
        if(!token){
          next('/user/login')
        }
        next();
      }
    },
    {
      path: '/user/:id/post',
      name: 'OneUserPosts',
      component: OneUserPosts,
      beforeEnter : (to, from, next) =>{
        const token = localStorage.getItem('userToken')
        if(!token){
          next('/user/login')
        }
        next()
      }
    }
  ]
})

export default router