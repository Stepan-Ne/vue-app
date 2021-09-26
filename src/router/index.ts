import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from "@/components/pages/Main.vue";
// import Posts from "@/components/pages/Posts.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Main
  },
  {
    path: '/posts',
    name: 'Posts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Posts.vue')
  },
  {
    path: '/posts/:id',
    component: () => import('@/components/UI/Post.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
