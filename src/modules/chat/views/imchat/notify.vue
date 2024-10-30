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

<script lang="ts" name="imchat-notify" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ label: "标识", prop: "key", component: { name: "el-input", props: { clearable: true } } },
		{
			label: "内容",
			prop: "content",
			component: { name: "el-input", props: { type: "textarea", rows: 4 } }
		},
		{ label: "是否停用", prop: "stop", flex: false, component: { name: "cl-switch" } }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "标识", prop: "key", minWidth: 140 },
		{ label: "内容", prop: "content", showOverflowTooltip: true, minWidth: 200 },
		{ label: "是否停用", prop: "stop", minWidth: 100, component: { name: "cl-switch" } },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.imchat.notify
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
