import { proxy } from "./proxy";

export default {
	// 根地址
	host: proxy["/prod/"].target,
	// ws
	ws: proxy["/prodws/"].target,
	// 请求地址
	baseUrl: proxy["/prod/"].target,
};
