import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import fib from "virtual:fib";

alert(`结果: ${fib(10)}`);
alert(fib);
createApp(App).mount("#app");
