import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/profile',
        name: 'profile',
        meta: {
            title: 'Профиль',
            auth: true
        },
        component: () => import(/* webpackChunkName: 'profile' */ '../views/Profile')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Логин',
            noMenu: true
        },
        component: () => import(/* webpackChunkName: 'login' */ '../views/Login')
    },
    {
        path: '/registration',
        name: 'registration',
        meta: {
            title: 'Регистрация',
            noMenu: true
        },
        component: () => import(/* webpackChunkName: 'registration' */ '../views/Registration')
    },
    {
        path: '/profile/add-consumption',
        name: 'add-consumption',
        meta: {
            title: 'Добавить расход',
            auth: true
        },
        component: () => import(/* webpackChunkName: 'add-consumption' */ '../views/AddConsumption')
    },
    {
        path: '/income',
        name: 'income',
        meta: {
            title: 'Доходы',
            auth: true
        }
    },
    {
        path: '/consumptions',
        name: 'consumptions',
        meta: {
            title: 'Расходы',
            auth: true
        },
        component: () => import(/* webpackChunkName: 'consumption' */ '../views/Consumptions')
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const currentUser = store.getters.isAuthenticated;
    const requireAuth = to.matched.some(record => record.meta.auth);

    if (requireAuth && !currentUser) {
        next('/login?login=no');
    } else {
        next();
    }
});

export default router
