export const proxy = {
	"/dev/": {
		target: "http://127.0.0.1:8001",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, "")
	},

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
	}
};
