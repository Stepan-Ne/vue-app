import app from "@/main";

const requiredComponents = require.context(
  // Смотрим только в текущей папке
  ".",
  // Не смотрим в дочерних папках
  false,
  // Выбираем только файлы с префиксом _base-
  /_base-[\w-]+\.vue$/
);
export default requiredComponents;
// /**
//  * Дальше для каждого найденного файла нам нужно конвертировать название в PascalCalse:
//  */

// requiredComponents.keys().forEach((name: any) => {
//   const componentConfig = requiredComponents(name);
//   const componentName = name
//     // Убираем "./_" из начала имени файла
//     .replace(/^\.\/_/, "")
//     // Убираем расширение файла
//     .replace(/\.\w+$/, "")
//     // Разбиваем на части
//     .split("-")
//     // Делаем заглавные буквы
//     .map((kebab: any) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
//     // Объединяем всё
//     .join("");
//   /**
//    * И теперь остаётся только зарегистрировать это всё глобально:
//    */
//   app.component(componentName, componentConfig.default || componentConfig);
// });
