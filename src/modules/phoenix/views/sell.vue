<template>
	<cl-dialog v-model="visible" :title="title">
		<cl-crud ref="Crud">
			<cl-row>
				<!-- 刷新按钮 -->
				<cl-refresh-btn />
				<!-- 新增按钮 -->
				<cl-add-btn />
				<!-- 删除按钮 -->
				<cl-multi-delete-btn />

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

			<!-- 新增、编辑 -->
			<cl-upsert ref="Upsert" />
		</cl-crud>
	</cl-dialog>
</template>
<script lang="ts" name="phoenix-sell" setup>
import { useCrud, useTable,useUpsert } from "@cool-vue/crud";
import { nextTick, ref } from "vue";
import { useCool } from "/@/cool";

const { service } = useCool();

// 是否可见
const visible = ref(false);

// 标题
const title = ref("");

// 所属渠道ID
const girlId=ref("");


// cl-upsert
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


// cl-table
const Table = useTable({
	autoHeight: false,
	columns: [
		{ type: "selection" },
		{ label: "价格(元)", prop: "price", minWidth: 100 },
		{ label: "时间（分钟)", prop: "workTime", minWidth: 140 },
		{ label: "次数", prop: "quantity", minWidth: 100 },
		{ label: "服务项目", prop: "serviceItems", minWidth: 140,showOverflowTooltip: true},
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.phoenix.sell
	}

);

// 打开
function open(data: Eps.PhoenixSellEntity) {
	visible.value = true;
	// title.value = `设定服务价格（${data.name}）`;
	title.value = `设定服务价格`;
	girlId.value=`${data.id}`;

	nextTick(() => {
		Crud.value?.refresh({ girlId: data.id, page: 1 });
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
