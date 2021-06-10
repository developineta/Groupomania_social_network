import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import App from "../App.vue";
import Signup from "../views/Signup.vue";
/*import OnePost from "../views/OnePost.vue"
import AllPosts from "../views/AllPosts.vue"
import NewPost from "../views/NewPost.vue"
import UserProfile from "../views/UserProfile.vue"*/

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
  /*{
    path: '/post/:id',
    name: 'OnePost',
    component: OnePost
  },
  {
    path: '/post',
    name: 'AllPosts',
    component: AllPosts
  },
  {
    path: '/newpost',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfile
  },*/
]

const router = new VueRouter({
  mode, routes
})

export default router;