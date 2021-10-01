import { createApp, Plugin } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI/components";
import requiredComponents from "@/components/UI/_globals";
import focus from "@/components/directives/VFocus";

const app = createApp(App);

components.forEach((c) => {
  app.component(c.name, c);
});

/**
 * Дальше для каждого найденного файла нам нужно конвертировать название в PascalCalse:
 */

requiredComponents.keys().forEach((name: any) => {
  const componentConfig = requiredComponents(name);
  const componentName = name
    // Убираем "./_" из начала имени файла
    .replace(/^\.\/_/, "")
    // Убираем расширение файла
    .replace(/\.\w+$/, "")
    // Разбиваем на части
    .split("-")
    // Делаем заглавные буквы
    .map((kebab: any) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // Объединяем всё
    .join("");
  /**
   * И теперь остаётся только зарегистрировать это всё глобально:
   */
  app.component(componentName, componentConfig.default || componentConfig);
});
app.directive(focus.name, focus);
app.use(router);
app.mount("#app");
// createApp(App).use(store).use(router).mount('#app')
app.config.performance = true;

export default app;
