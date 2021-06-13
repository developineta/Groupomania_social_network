import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import App from "../App.vue";
import Signup from "../views/Signup.vue";
import OnePost from "../views/OnePost.vue";
import NewPost from "../views/NewPost.vue";
import UserProfile from "../views/UserProfile.vue";
import OneUserPosts from "../views/OneUserPosts.vue";

Vue.use(VueRouter)

const mode = 'history';
const routes = [
    /*{
    path: '/',
    name: 'App',
    component: App
    },*/
  {
    path: '/user/login',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/post/:id',
    name: 'OnePost',
    component: OnePost
  },
  {
    path: 'post/',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/post/oneuser',
    name: 'OneUserPosts',
    component: OneUserPosts
  }
]

const router = new VueRouter({
  mode, routes
})

export default router;