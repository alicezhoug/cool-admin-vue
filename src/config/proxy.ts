export const proxy = {
	'/dev/': {
		target: 'http://127.0.0.1:8001',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, '')
	},

<<<<<<< HEAD
	"/devws/": {
		target: "ws://127.0.0.1:9090",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/devws/, "")
	},
	"/prod/": {
		target: "https://ym.yuelike.com",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, "")
	},
	"/prodws/": {
		target: "wss://socket.yuelike.com",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prodws/, "")
=======
	'/prod/': {
		target: 'https://show.cool-admin.com',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, '/api')
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
	}
};
