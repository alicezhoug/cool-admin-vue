import { createApp } from 'vue';
import App from './App.vue';
import { bootstrap } from './cool';

const app = createApp(App);

// 启动
bootstrap(app)
	.then(() => {
		app.mount('#app');
	})
<<<<<<< HEAD
	.catch((err) => {
		console.error("YUEME-ADMIN 启动失败", err);
=======
	.catch(err => {
		console.error('COOL-ADMIN 启动失败', err);
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
	});
