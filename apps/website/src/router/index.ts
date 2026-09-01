import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import RealmPage from '../pages/RealmPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/realm', name: 'realm', component: RealmPage },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
