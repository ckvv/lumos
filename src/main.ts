import { Notify, Quasar } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';
import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css';
import './style/index.scss';

const app = createApp(App);
app.use(Quasar, {
  plugins: {
    Notify,
  },
  lang: quasarLang,
});

app.mount('#app');
