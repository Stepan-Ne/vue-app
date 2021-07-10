import { createApp, Plugin  } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 import components from '@/components/UI/components';

 console.log(components)
const app = createApp(App)

components.forEach(c => {
    app.component(c.name, c)
})
app.mount('#app');
// createApp(App).use(store).use(router).mount('#app')
app.config.performance = true;