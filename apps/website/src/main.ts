import { configureApis } from '@gold/apis';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import App from './App.vue';
import { apiConfig } from './config/api';
import './styles.css';

configureApis(apiConfig);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    },
  },
});

const app = createApp(App);

app.use(VueQueryPlugin, { queryClient });
app.mount('#root');
