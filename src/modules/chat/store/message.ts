<<<<<<< HEAD
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { service } from "/@/cool";


export const useMessageStore = defineStore("chat-message", () => {
=======
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { service } from '/@/cool';

export const useMessageStore = defineStore('chat-message', () => {
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
	// 加载状态
	const loading = ref(false);

	// 列表
	const list = ref<any[]>([]);

	// 分页
	const pagination = ref({
		page: 1,
		total: 0,
		size: 20
	});


	// 获取列表
	async function get(params?: any) {




		if(!params || !params?.uid){
			return;
		}
		if(!params?.page){
			params.page=1;
		}
		// 清空
		if (params?.page == 1) {
			list.value = [];
		}

		loading.value = true;


		// 发送请求
<<<<<<< HEAD
		await service.imchat.detail.pageExtend(params).then((res) => {
			/*list.value = res.list.map((e) => {
=======
		await service.chat.message.page(params).then(res => {
			list.value = res.list.map(e => {
>>>>>>> 8ed1e16cfd9f69d277b4c1e3cb95e74f1b2f84cc
				e.content = JSON.parse(e.content);
				return e;
			});*/
			if(params.page==1){
				list.value=res.list;
			}else{

				res.list.reverse().map((e)=>{
					list.value.unshift(e);
				});
			}


			pagination.value = res.pagination;
		});

		loading.value = false;
	}

	return {
		loading,
		list,
		pagination,
		get
	};
});
