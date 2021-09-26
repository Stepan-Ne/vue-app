import { createApp, Plugin } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI/components';
import focus from "@/components/directives/VFocus";

//  console.log(components)
const app = createApp(App)

components.forEach(c => {
    app.component(c.name, c)
});
app.directive(focus.name, focus);
app.use(router);
app.mount('#app');
// createApp(App).use(store).use(router).mount('#app')
app.config.performance = true;