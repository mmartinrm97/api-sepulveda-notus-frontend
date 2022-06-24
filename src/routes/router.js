import { createRouter, createWebHistory } from "vue-router";

//views
import Home from "../views/Home.vue";
import Users from '../views/Users.vue'
import Bienes from '../views/Bienes.vue'

//layouts
import Admin from '../layouts/Admin.vue'

//views for admin layout
import Dashboard from "../views/admin/Dashboard.vue";
import Settings from "../views/admin/Settings.vue";
import Tables from "../views/admin/Tables.vue";
import Maps from "../views/admin/Maps.vue";

const routes = [
    { path: "/", component: Home, name: 'Inicio' },
    { path: '/usuarios', component: Users, name: 'Usuarios' },
    { path: '/bienes', component: Bienes, name: 'Bienes' },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard' },

    {
        path: "/admin",
        redirect: "/admin/dashboard",
        component: Admin,
        children: [
            {
                path: "/admin/dashboard",
                component: Dashboard,
            },
            {
                path: "/admin/settings",
                component: Settings,
            },
            {
                path: "/admin/tables",
                component: Tables,
            },
            {
                path: "/admin/maps",
                component: Maps,
            },
        ],
    },

];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
