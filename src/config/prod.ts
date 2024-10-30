import { proxy } from './proxy';

export default {
	// 根地址
<<<<<<< HEAD
	host: proxy["/prod/"].target,
	// ws
	ws: proxy["/prodws/"].target,
	// 请求地址
	baseUrl: proxy["/prod/"].target,
=======
	host: proxy['/prod/'].target,

	// 请求地址
	baseUrl: '/api'
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
};
