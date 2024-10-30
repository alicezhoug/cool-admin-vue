<template>
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
</template>

<script lang="ts" name="pay-mode" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "名称",
			prop: "name",

			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{ label: "序顺", prop: "ind", hook: "number", component: { name: "el-input-number" } },
		{ label: "数字货币", prop: "digital", span:8, flex: false, component: { name: "cl-switch" } },
		{ label: "是否手动", prop: "manual",span:8, flex: false, component: { name: "cl-switch" } },
		{ label: "是否停用", prop: "stop",span:8, flex: false, component: { name: "cl-switch" } },

	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "名称", prop: "name", minWidth: 140 },
		{ label: "序顺", prop: "ind", minWidth: 140,span:12 },
		{ label: "数字货币", prop: "digital", minWidth: 100,  component: { name: "cl-switch" } },
		{ label: "是否停用", prop: "stop", minWidth: 100, component: { name: "cl-switch" } },
		{ label: "是否手动", prop: "manual", minWidth: 100, component: { name: "cl-switch" } },

		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.pay.mode
	},
	(app) => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
