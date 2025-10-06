// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // <--- 1. Import your router configuration
import "./assets/main.css";
const app = createApp(App);
app.use(router); // <--- 2. Register Vue Router with the app
app.mount("#app");
