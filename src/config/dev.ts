import { getUrlParam, storage } from '/@/cool/utils';
import { proxy } from './proxy';

export default {
	// 根地址
<<<<<<< HEAD
	host: proxy["/dev/"].target,
	// ws
	ws: proxy["/devws/"].target,
=======
	host: proxy['/dev/'].target,

>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
	// 请求地址
	get baseUrl() {
		let proxy = getUrlParam('proxy');

		if (proxy) {
			storage.set('proxy', proxy);
		} else {
			proxy = storage.get('proxy') || 'dev';
		}
		return `/${proxy}`;

	}
};
