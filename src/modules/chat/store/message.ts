import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { service } from "/@/cool";


export const useMessageStore = defineStore("chat-message", () => {
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
		await service.imchat.detail.pageExtend(params).then((res) => {
			/*list.value = res.list.map((e) => {
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
