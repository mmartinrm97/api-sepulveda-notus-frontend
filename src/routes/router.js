import { createRouter, createWebHistory } from "vue-router";

//layouts
import Admin from '../layouts/Admin.vue'
import Auth from '../layouts/Auth.vue'

//views for admin layout
import Dashboard from "../views/admin/Dashboard.vue";
import Settings from "../views/admin/Settings.vue";
import Tables from "../views/admin/Tables.vue";
import Maps from "../views/admin/Maps.vue";
import Users from '../views/admin/Users.vue'
import Almacen from '../views/admin/Almacen.vue'
import CatalogoBien from '../views/admin/CatalogoBien.vue'
import GrupoBien from '../views/admin/GrupoBien.vue'
import ClaseBien from '../views/admin/ClaseBien.vue'
import Bien from '../views/admin/Bien.vue'

//views for auth layouts
import Login from "../views/auth/Login.vue";

const routes = [
    { path: "/", name: 'Inicio', redirect: '/auth/login' },

    {
        path: "/admin",
        redirect: "/admin/dashboard",
        component: Admin,
        meta:{ title: 'Admin'},
        children: [
            {
                path: "/admin/dashboard",
                component: Dashboard,
                name: 'dashboard',
                meta:{ title: 'Dashboard'},
            },
            {
                path: "/admin/usuarios",
                component: Users,
                name: 'users',
                meta: {title: 'Usuarios'}
            },
            {
                path: "/admin/almacenes",
                component: Almacen,
                name: 'almacenes',
                meta:{ title: 'Admin'},
            },
            {
                path: "/admin/catalogos-bienes",
                component: CatalogoBien,
                name: 'catalogosDeBienes',
                meta:{ title: 'Catalogos de Bienes'},
            },
            {
                path: "/admin/clases-bienes",
                component: ClaseBien,
                name: 'clasesDeBienes',
                meta:{ title: 'Clases de Bienes'},
            },
            {
                path: "/admin/grupos-bienes",
                component: GrupoBien,
                name: 'gruposdeBienes',
                meta:{ title: 'Grupos de Bienes'},
            },
            {
                path: "/admin/bienes",
                component: Bien,
                name: 'bienes',
                meta: {title: 'Bienes'}
            },
            {
                path: "/admin/settings",
                component: Settings,
                name: 'settings'
            },
            {
                path: "/admin/tables",
                component: Tables,
                name: 'tables'
            },
            {
                path: "/admin/maps",
                component: Maps,
                name: 'maps'
            },
        ],
    },{
        path: "/auth",
        redirect:"/auth/login",
        component: Auth,
        children: [
            {
                path: "/auth/login",
                component: Login,
                name: 'login'
            }
        ],
    }

];

const router = createRouter({
    routes,
    history: createWebHistory(),
    
});

export default router;
