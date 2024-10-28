import { createApp } from 'vue';
import App from './App.vue';
import { i18n, quasar } from './plugins';
import 'virtual:uno.css';
import './style/index.scss';

const app = createApp(App);
app.use(i18n);
app.use(quasar);
app.mount('#app');
