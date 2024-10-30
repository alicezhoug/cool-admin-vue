<template>
	<cl-dialog v-model="visible" :title="title">
		<cl-crud ref="Crud">
			<cl-row>
				<!-- 刷新按钮 -->
				<cl-refresh-btn />

				<cl-flex1 />
				<!-- 关键字搜索 -->
				<cl-search-key placeholder="搜索关键字" />
			</cl-row>

			<cl-row>
				<!-- 数据表格 -->
				<cl-table ref="Table" />
			</cl-row>

			<cl-row>
				<cl-flex1 />
				<!-- 分页控件 -->
				<cl-pagination />
			</cl-row>

			<!-- 新增、编辑
			<cl-upsert ref="Upsert" />
			-->
		</cl-crud>
	</cl-dialog>
</template>
<script lang="ts" name="phoenix-sell" setup>
import { useCrud, useTable,useUpsert } from "@cool-vue/crud";
import { nextTick, ref } from "vue";
import { useCool } from "/@/cool";
import { reactive } from "vue";

const { service } = useCool();

// 是否可见
const visible = ref(false);

// 标题
const title = ref("");

// 所属渠道ID
const girlId=ref("");



const options=reactive({
	yesAndNo:[
		{
			label:"是",
			value:true,
			type: "success"
		},
		{
			label:"否",
			value:false,
			type:"danger"
		}
	]
});

// cl-upsert
/*
const Upsert = useUpsert({
	items: [
		{
			label: "价格(元)",
			prop: "price",
			span: 12,
			component: { name: "el-input-number"},
			required: true
		},
		{
			label: "时间(分钟)",
			prop: "workTime",
			span: 12,
			component: { name: "el-input-number"},
			required: true
		},
		{
			label: "次数",
			prop: "quantity",
			span: 12,
			component: { name: "el-input-number"},
			required: true
		},
		{
			label: "服务项目",
			prop: "serviceItems",
			component: { name: "el-input", props: { type: "textarea", rows: 2  } },
			required: true
		}

	],
	async onSubmit(data, { done, close, next }) {
		// 设定所属渠道ID
		data.girlId=girlId.value;
		next({
			...data,
			status: false,
		});
	}
});
*/

// cl-table
const Table = useTable({
	autoHeight: false,
	columns: [
		{ label: "参与用户", prop: "userId", minWidth: 140 },
		{ label: "付款金额", prop: "amount", minWidth: 140 },
		{
			label: "审核到帐",
			prop: "auditArrive",
			minWidth: 100,
			dict:options.yesAndNo
		},

		{ label: "猜测幸运号", prop: "guessLuckyNum", minWidth: 140 },
		{
			label: "是否中奖",
			prop: "luckyUser",
			minWidth: 100,
			dict:options.yesAndNo
		},

	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.ecp.participant
	}

);

// 打开
function open(data: Eps.EcpParticipantEntity) {
	visible.value = true;
	// title.value = `设定服务价格（${data.name}）`;
	title.value = `活动参与者`;
	girlId.value=`${data.id}`;

	nextTick(() => {
		Crud.value?.refresh({ ecpId: data.id, page: 1 });
	});
}

// 关闭
function close() {
	visible.value = false;
}

defineExpose({
	open,
	close
});
</script>
