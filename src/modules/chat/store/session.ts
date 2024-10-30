<<<<<<< HEAD
import { defineStore } from "pinia";
import { ref } from "vue";
import { service } from "/@/cool";
import { ElMessage } from "element-plus";
=======
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { service } from '/@/cool';
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc

export const useSessionStore = defineStore('chat-session', () => {
	// 加载状态
	const loading = ref(false);

	// 列表
	const list = ref<any[]>([]);

	// 选中
	const value = ref<any>();

	// 未读消息数
	const notReadCount=ref<any>();

	// 读取会话标识
	async function readSessionFlag(){
		if(value.value){
			const toUserId=value.value.toUserId
			await service.imchat.session.confirmReadFlag({uid:toUserId}).then((res)=>{
				value.value.notReadCount=0;
			});
		}
	}
	//查询未读消息数
	async function loadNotReadCount(){
		await service.imchat.session.notReadCount().then((res)=>{
			notReadCount.value=res;
		});
	}
	// 获取列表
	async function get(params?: any) {
		loading.value = true;
		// 发送请求
<<<<<<< HEAD
		await service.imchat.session.pageExtend(params).then((res) => {
=======
		await service.chat.session.page(params).then(res => {
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
			// 默认加载第一个会话的消息
			if (!value.value && res.list) {
				set(res.list[0]);
			}
			// 设置列表
			list.value = res.list;

		});
		loading.value = false;

	}

	// 设置值
	function set(data: any) {
		// 设置值
		value.value = data;
		readSessionFlag();
	}

	return {
		loading,
		list,
		value,
		notReadCount,
		loadNotReadCount,
		get,
		set
	};
});
