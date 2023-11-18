// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from "@/Views/Login"
import Register from "@/Views/Register";
import Note from "@/Views/Note"

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
      },
      {
        path: '/note/:room',
        name: 'note',
        component: Note,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
