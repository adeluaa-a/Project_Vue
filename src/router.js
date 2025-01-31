import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import MovieDetail from './views/MovieDetail.vue';

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/movie/:id', name: 'MovieDetail', component: MovieDetail, props: true },
    // Добавьте другие маршруты при необходимости
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
